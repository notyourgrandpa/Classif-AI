const { Storage } = require("@google-cloud/storage"); // Correct import

const storage = new Storage();

async function checkGCSConnection() {
  try {
    // Attempt to list buckets (replace 'YOUR_PROJECT_ID' with your actual project ID)
    const [buckets] = await storage.getBuckets({
      project: "enhanced-medium-399012",
    });
    console.log(
      "Connected to GCS. Buckets:",
      buckets.map((bucket) => bucket.name)
    );
  } catch (error) {
    console.error("Error connecting to GCS:", error.message);
  }
}

async function uploadFile(fileData, destinationFolder) {
  const bucketName = "classifai_bucket"; // Replace with your actual bucket name

  // Create a new bucket instance
  const bucket = storage.bucket(bucketName);

  // Generate a unique filename (you may want to use a more sophisticated method)
  const fileName = `${destinationFolder}/${Date.now()}_${Math.floor(
    Math.random() * 1000
  )}.jpg`;

  // Create a write stream to the specified file path
  const fileStream = bucket.file(fileName).createWriteStream();

  return new Promise((resolve, reject) => {
    // Handle stream events and resolve/reject as needed
    fileStream
      .on("error", (error) => {
        reject(error);
      })
      .on("finish", () => {
        resolve();
      });

    // Write the file data to the stream
    fileStream.end(fileData);
  });
}

module.exports = {
  checkGCSConnection,
  uploadFile,
};
