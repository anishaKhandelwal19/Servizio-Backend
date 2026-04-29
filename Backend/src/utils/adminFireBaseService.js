import admin from "firebase-admin";

function extractEncodedStringFromURL(url) {
  const parsedURL = new URL(url);
  const path = parsedURL.pathname; // Get the path part of the URL

  // Extract the encoded string from the path
  const encodedString = path.split("/o/")[1].split("?")[0];

  // Decode the extracted string
  const decodedString = decodeURIComponent(encodedString);

  return decodedString;
}

class FirebaseAdminService {
  static async deleteFilesFromStorageByUrls(urls) {
    const bucket = admin.storage().bucket();
    const deletePromises = [];

    for (const url of urls) {
      const file = bucket.file(extractEncodedStringFromURL(url));
      deletePromises.push(file.delete());
    }

    try {
      await Promise.all(deletePromises);
      console.log("Files deleted successfully.");
    } catch (error) {
      console.error("Error deleting files:", error);
      throw error;
    }
  }
  // Upload the file to the bucket and get url
  static async uploadFileToStorage(
    filePath,
    fileBuffer,
    metadata,
    contentType,
    fileName
  ) {
    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath + "/" + fileName);
    try {
      await file.save(fileBuffer, {
        public: true,
        contentType: contentType,
        metadata: {
          ...metadata,
        },
      });
      await file.makePublic();
      console.log("File uploaded successfully.");
      return file.publicUrl();
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }
}

export default FirebaseAdminService;
