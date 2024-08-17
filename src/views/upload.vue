<template>
  <div class="note">
    <h1>Our model supports PNG, JPG, and JPEG file formats</h1>
    <p>
      Note: The quality of the picture may affect the prediction of the painting
    </p>
  </div>
  <div class="container">
    <div class="dropzone" @dragover.prevent @drop="handleDrop">
      <span>Drag or Drop Files</span>
      <span>OR</span>
      <label for="dropzoneFile" @click="resetLabelAndImage">Select File</label>
      <input
        type="file"
        id="dropzoneFile"
        ref="fileInput"
        @change="handleFileChange"
      />
    </div>
    <div class="imageContainer">
      <img v-if="uploadedImage" :src="displayedImage" class="uploaded-image" />
    </div>
  </div>
  <div class="button_container">
    <button @click="makePrediction" :delay="delay" class="upload_button">
      Classify
    </button>
    <button @click="resetLabelAndImage" class="upload_button">
      Upload New Image
    </button>
  </div>

  <div v-if="errorMessage" class="error-message">
    {{ errorMessage }}
  </div>

  <div class="parent">
    <div class="results_container">
      <div class="results_title">
        <h1>Results</h1>
      </div>

      <div class="result_part">
        <img :src="spinner" v-if="isLoading" class="spinner" />
        <h1 v-if="prediction.percentage !== null" class="percentage">
          {{ prediction.percentage }}%
        </h1>
        <h1 class="label">{{ prediction.label }}</h1>
      </div>
    </div>
  </div>
  <div class="upload_user">
    <h1>↓ Help our model improve by uploading your painting ↓</h1>
    <p>
      We may request your permission to use your painting for the purpose of
      training our AI model.
    </p>
  </div>
  <div class="click_me">
    <a href="#popup1"
      ><button @click="handle_img_data" class="upload_button">
        Click me
      </button></a
    >
  </div>

  <div class="upload_overlay" id="popup1">
    <div class="popup">
      <div v-if="imgerror" class="error-message">
        {{ imgerror }}
      </div>
      <div v-if="checkImg">
        <h1>Upload here</h1>
        <div class="upload_image">
          <div class="popup_imageContainer">
            <img
              v-if="uploadedImage"
              :src="displayedImage"
              class="pop_uploaded-image"
            />
          </div>
        </div>
        <div class="dropdown">
          <label for="imageType" class="label_img">Select Image Type:</label>
          <select v-model="imageType" id="imageType" class="select_values">
            <option value="ai">AI Generated</option>
            <option value="human">Human Made</option>
          </select>
          <button @click="uploadImage" class="send_GCS" type="submit">
            Upload Image
          </button>
          <div v-if="upload_success" class="upload_success">
            {{ upload_success }}
          </div>
        </div>
        <!-- New Button for Upload -->
      </div>
      <div class="modal_button">
        <a href="#"
          ><button class="upload_button" @click="handlereset">Close</button></a
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import spinner from "@/assets/ripple.gif";
import * as tf from "@tensorflow/tfjs";

export default {
  components: {
    spinner,
  },
  data() {
    return {
      uploadedImage: null,
      desiredWidth: 224, // Replace with the actual desired width
      desiredHeight: 224, // Replace with the actual desired height
      delay: 2000,
      spinner: spinner,
      isLoading: false,
      errorMessage: null,
      checkImg: false,
      imgerror: null,
      imageBase64: null,
      upload_success: null,

      selectedFile: null,
      previewImage: null,
      imageType: "ai", // Default to AI

      prediction: {
        label: null,
        percentage: null,
      },
    };
  },
  mounted() {
    this.loadModel();
  },
  computed: {
    showResults() {
      // Adjust this based on how you determine whether to show the results
      return this.$store.getters.getPredictionLabel !== null;
    },
    predictionLabel() {
      return this.$store.getters.getPredictionLabel;
    },
    displayedImage() {
      return this.$store.state.uploadedImage;
    },
    predictionPercentage() {
      return this.$store.state.predictionPercentage;
    },

    predictionLabel() {
      return this.prediction.label;
    },
    predictionPercentage() {
      return this.prediction.percentage;
    },
  },
  methods: {
    handlereset() {
      this.upload_success = null;
    },
    handle_img_data() {
      if (this.uploadedImage) {
        // Display an error message
        this.checkImg = true;
        return;
      } else {
        this.showimgerror("please ensure that you had an uploaded image");
        return;
      }
    },
    handleImageError() {
      console.error("Error loading image:", this.displayedImage);
    },
    handleFileChange(event) {
      this.errorMessage = null;
      const fileInput = event.target;
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        console.log("Selected file:", file); // Add this line to log the selected file
        this.handleImage(file);
        this.selectedFile = file; // Update this line to set the selectedFile property
      }
    },
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        this.handleImage(file);
      }
    },
    handleImage(file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = async (e) => {
          if (typeof e.target.result === "string") {
            // Assuming you have an action named "setUploadedImage" in your Vuex store
            this.$store.dispatch("setUploadedImage", e.target.result);

            // Update the local data property as well
            this.uploadedImage = e.target.result;
          } else {
            console.error("Failed to read the image file.");
          }
        };

        reader.readAsDataURL(file);
      } else {
        console.error("Please upload a valid image file.");
      }
    },

    async loadModel() {
      // Load the TensorFlow.js model
      this.model = await tf.loadLayersModel("/tfjs_model/model.json");
      console.log("Model loaded successfully");

      // Now you can use this.model for predictions or other tasks
    },
    mapPredictionToLabel(predictionValue) {
      let percentage = Math.round(predictionValue * 100);

      // Example: If predictionValue is greater than 0.5, classify as "ai", otherwise as "human"
      let label = predictionValue > 0.5 ? "AI Generated" : "Human made";

      // Adjust the percentage if the label is "Human made"
      if (label === "Human made") {
        label = "Human made";
        percentage = 100 - percentage;
      }

      return { label, percentage };
    },

    calculatePredictionPercentage() {
      // Replace this with your actual logic for calculating the percentage
      // For example, if you have a confidence score in the range [0, 1], you can convert it to percentage
      return Math.round(predictionValue * 100);
    },

    async makePrediction() {
      if (!this.uploadedImage) {
        // Display an error message
        this.showErrorMessage(
          "Please upload an image before making a prediction."
        );
        return;
      }

      this.isLoading = true;

      // Load the image asynchronously
      const imageElement = await this.loadImageAsync(this.uploadedImage);

      // Convert the image to a tensor
      const inputTensor = tf.browser.fromPixels(imageElement);
      // Resize the image to match the input size expected by your model
      const resizedTensor = tf.image.resizeBilinear(inputTensor, [
        this.desiredWidth,
        this.desiredHeight,
      ]);
      // Normalize the pixel values to be in the range [0, 1]
      const normalizedTensor = resizedTensor.div(255.0);

      // Expand dimensions to create a batch of size 1 (if your model expects a batch)
      const batchedTensor = normalizedTensor.expandDims(0);

      // Make the prediction using the loaded model
      const prediction = this.model.predict(batchedTensor);

      // Assuming a single output neuron, get the prediction value
      const predictionValue = prediction.dataSync()[0];

      // Map the numeric prediction to a label
      const newPrediction = this.mapPredictionToLabel(predictionValue);

      this.$store.commit("setIsLoadingPrediction", true);

      setTimeout(async () => {
        this.$store.commit("setIsLoadingPrediction", false);

        // Update the Vuex store with the prediction label and percentage
        await this.$store.dispatch(
          "updatePredictionLabel",
          newPrediction.label
        );
        await this.$store.dispatch(
          "updatePredictionPercentage",
          newPrediction.percentage
        );

        // Assuming you have a Vuex mutation to set the entire prediction object
        this.$store.commit("setPrediction", newPrediction);
        this.prediction = newPrediction; // Set the entire prediction object
        console.log("Prediction:", newPrediction);

        this.isLoading = false;
      }, 5000);

      this.$store.commit("setIsLoadingPrediction", false);
    },

    // Async function to load an image and resolve with the image element
    loadImageAsync(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    },

    resetLabelAndImage() {
      console.log("Before reset action");
      this.$store.dispatch("resetPrediction"); // Ensure this line is being executed
      console.log("After reset action");
      // Reset the prediction label
      // this.$store.dispatch("updatePredictionLabel", null);

      // Clear the uploaded image
      this.$store.dispatch("clearUploadedImage");

      // Additional logic for resetting other data properties if needed
      // Clear the uploaded image in the local component data
      this.uploadedImage = null;
      this.$refs.fileInput.value = "";
      this.isLoading = false;
      this.errorMessage = null;
      this.checkImg = false;
      this.imgerror = null;
    },
    show_upload_success(message) {
      this.upload_success = message;
    },
    showErrorMessage(message) {
      // Set the error message in the data property
      this.errorMessage = message;
    },
    showimgerror(message) {
      this.imgerror = message;
    },
    onFileChange(event) {
      // Handle file selection and preview
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.previewImage = URL.createObjectURL(file);
      }
    },
    uploadImage() {
      if (!this.selectedFile || !this.imageType) {
        console.error("Please select a file and image type before uploading.");
        return;
      }

      const formData = new FormData();
      formData.append("image", this.selectedFile);
      formData.append("imageType", this.imageType);

      // Adjust the URL based on your backend setup
      const uploadUrl = "http://localhost:3000/upload"; // Replace with your actual backend URL

      // Use axios to make the request
      axios
        .post(uploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Handle success
          console.log("Upload successful", response.data);
          this.show_upload_success("Uploaded Successfully");
          return;
        })
        .catch((error) => {
          // Handle error
          console.error("Upload failed", error);
        });
    },
  },
};
</script>

<style scoped>
html,
body {
  height: -webkit-fill-available;
  overflow-y: scroll;
}

.upload_success {
  color: green;
  font-family: "offbit-bold";
}
.send_GCS {
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 3px;
  padding: 12px 24px;
  border: 0;
  color: white;
  background: #2176ff;
  line-height: 1.15;
  font-size: 16px;
  font-family: "offbit-bold";
}

.send_GCS:hover {
  transition: all 0.1s ease;
  box-shadow: 0 0 0 0 #fff, 0 0 0 3px #787878;
}

.label_img {
  font-family: "offbit-bold";
  width: 300px;
  text-align: center;
  justify-content: center;
  margin-top: 10px;
}

.select_values {
  font-family: "offbit-bold";
  width: 150px;
}
.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 50%;
  position: relative;
  transition: all 5s ease-in-out;
}

.popup h1 {
  font-family: "offbit-bold";
  text-align: center;
  color: #5d76ff;
}

.modal_button {
  display: flex;
  justify-content: center;
}

.modal_button a {
  margin-top: 10px;
}

.upload_overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
}
.upload_overlay:target {
  visibility: visible;
  opacity: 1;
}
.percentage {
  color: #2176ff;
}

.dropdown {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 10px;
}
.upload_user h1 {
  font-family: "dotbold-101";
  text-align: center;
  color: #5d76ff;
}
.upload_user p {
  font-family: "offbit-regular";
  text-align: center;
}
.click_me {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.note h1 {
  color: #2176ff;
}
.note p {
  color: #787878;
  font-size: 20px;
}

.error-message {
  color: red;
  align-content: center;
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  font-family: "offbit-bold";
  font-size: 20px;
}
.dropzone {
  color: white;
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  border: 2px dashed #787878;
  /* border-radius: 10px; */
  transition: 0.3s ease all;
  font-family: "offbit-regular";
  color: #787878;
}
label {
  padding: 8px 12px;
  color: white;
  background-color: #2176ff;
  transition: 0.3s ease all;
  cursor: pointer;
}
input {
  display: none;
}
.uploaded-image {
  /* Set a fixed width and height for the displayed image */
  width: 400px;
  height: 300px;
  object-fit: cover; /* Optional: Maintain aspect ratio and cover the container */
}
.container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 50px;
}

.imageContainer {
  border: 2px solid #787878;
  width: 400px;
  height: 300px;

  /* border-radius: 10px; */
}

.popup_imageContainer {
  border: 2px solid #787878;
  width: 400px;
  height: 300px;
}

.pop_uploaded-image {
  width: 400px;
  height: 300px;
  object-fit: cover;
}

.upload_image {
  display: flex;
  justify-content: center;
}

.upload_button {
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 3px;
  padding: 12px 24px;
  border: 0;
  color: white;
  background: #2176ff;
  line-height: 1.15;
  font-size: 16px;
  font-family: "offbit-bold";
}
.upload_button:hover {
  transition: all 0.1s ease;
  box-shadow: 0 0 0 0 #fff, 0 0 0 3px #787878;
}
.button_container {
  margin: 30px;
  display: flex;
  justify-content: center;
  gap: 50px;
}

.results_container {
  width: 350px;
  height: 250px;
  display: flex;
  flex-direction: column;
}
.results_title {
  background: #2176ff;
  color: white;
  text-align: center;
  /* border-radius: 10px 10px 0 0; */
  overflow: hidden;
  font-family: "dotbold-101", sans-serif;
}
.this_painting {
  background: #787878;
  text-align: center;
}
.result_part {
  background: white;
  text-align: center;
  color: #c02fe0;
  /* border-radius: 0 0 10px 10px; */
  flex: 1;
  overflow: hidden;
  font-family: "offbit-bold", sans-serif;
}

.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.reset_container {
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 30px;
}
.note {
  text-align: center;
  font-family: "offbit-bold";
  padding: 20px;
}

.spinner {
  width: 70px;
  height: 70px;
  margin-top: 40px;
}

.label {
  color: #787878;
}

@media (max-width: 600px) {
  .note {
    font-size: 10px;
    margin: 10px;
  }
  .note p {
    font-size: 15px;
    margin: 10px;
  }

  .container {
    padding: 10px;
    flex-direction: column;
    align-items: center;
    height: auto;
  }

  .imageContainer {
    margin: 0;

    width: 250px;
    height: 250px;
  }

  .dropzone {
    width: 250px;
    height: 250px;
  }
  .button_container {
    margin: 20px;
  }

  .results_container {
    width: 250px;
    height: 250px;
  }

  .results_title {
    font-size: 13px;
    height: 50px;
  }
  .uploaded-image {
    width: 250px;
    height: 250px;
  }
  .results_container {
    height: 250px;
  }
  .upload_user h1 {
    font-size: 20px;
  }

  .popup_imageContainer {
    width: 150px;
    height: 150px;
  }
  .pop_uploaded-image {
    width: 150px;
    height: 150px;
  }
  .label_img {
    width: 150px;
  }
}
</style>
