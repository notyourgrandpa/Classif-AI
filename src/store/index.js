import { createStore } from "vuex";
import { ref } from "vue";

export const state = () => ({
  uploadedImage: ref(null),
  predictionLabel: null,
});

export const mutations = {
  setUploadedImage(state, imageData) {
    state.uploadedImage = imageData;
    console.log("Uploaded Image URL:", state.uploadedImage.value);
  },
};

export default createStore({
  state: {
    predictionLabel: null,
    isLoadingPrediction: false,
    prediction: {
      label: null,
      percentage: null,
    },
  },
  mutations: {
    setPrediction(state, prediction) {
      state.prediction = prediction;
    },
    setIsLoadingPrediction(state, isLoading) {
      state.isLoadingPrediction = isLoading;
    },
    setPredictionLabel(state, label) {
      state.predictionLabel = label;
    },

    clearUploadedImage(state) {
      state.uploadedImage = null;
    },
    SET_UPLOADED_IMAGE(state, imageData) {
      state.uploadedImage = imageData;
    },
    SET_PREDICTION_PERCENTAGE(state, percentage) {
      state.predictionPercentage = percentage;
    },
    resetPrediction(state) {
      state.prediction.label = null;
      state.prediction.percentage = null;
    },

    setPredictionPercentage(state, percentage) {
      state.prediction.percentage = percentage;
    },
  },
  actions: {
    updatePredictionLabel({ commit }, label) {
      commit("setPredictionLabel", label);
    },

    updatePredictionPercentage({ commit }, payload) {
      commit("setPredictionPercentage", payload); // Assuming you have a mutation to set the percentage
    },

    clearUploadedImage({ commit }) {
      commit("clearUploadedImage");
    },
    setUploadedImage({ commit }, imageData) {
      commit("SET_UPLOADED_IMAGE", imageData);
    },

    resetPrediction({ commit }) {
      commit("resetPrediction");
    },
  },
  getters: {
    getPredictionLabel: (state) => state.predictionLabel,
    isLoadingPrediction: (state) => state.isLoadingPrediction,
  },
});
