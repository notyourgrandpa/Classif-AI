const { Storage } = require("@google-cloud/storage");
const path = require("path");
const storage = new Storage({
  keyFilename: process.env.GCLOUD_KEYFILE,
});

exports.handler = async function (event, context) {
  try {
    const keyfileContent = process.env.GCLOUD_KEYFILE;
    console.log("GCLOUD_KEYFILE:", process.env.GCLOUD_KEYFILE);
    console.log("GCLOUD_KEYFILE Content:", keyfileContent);

    const requestBody = JSON.parse(event.body);
    const imageBase64 = requestBody.image;
    const imageType = requestBody.imageType;

    // Decode base64 image
    const imageBuffer = Buffer.from(imageBase64, "base64");

    // Determine the destination folder based on imageType
    const destinationFolder = imageType === "ai" ? "ai" : "human";

    // Define the destination path within the bucket with a unique filename
    const destinationPath = `${destinationFolder}/${Date.now()}_${Math.random()}.png`;

    // Upload the image to GCS
    const bucketName = "classifai_bucket"; // Replace with your actual GCS bucket name
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(destinationPath);

    // Save the image buffer to the GCS file with metadata
    await file.save(imageBuffer, {
      metadata: { contentType: "image/png" },
    });

    // Construct the public URL of the uploaded image
    const imageUrl = `https://storage.googleapis.com/${bucketName}/${destinationPath}`;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Image uploaded successfully",
        imageUrl: imageUrl,
      }),
    };
  } catch (error) {
    console.error("Upload failed", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Upload failed",
        error: error.message,
      }),
    };
  }
};
