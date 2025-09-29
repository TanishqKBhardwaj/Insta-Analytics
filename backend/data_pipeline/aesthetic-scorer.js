import axios from "axios";
import { Client } from "@gradio/client";

export async function analyzeImage(imageInput) {
  try {
    let imageData;

    if (typeof imageInput === "string") {
      // Fetch via Axios as ArrayBuffer
      const response = await axios.get(imageInput, { responseType: "arraybuffer" });
      imageData = Buffer.from(response.data); // Convert to Buffer for Gradio client
    } else {
      imageData = imageInput; // already File/Blob/Buffer
    }

    // Connect to Gradio Space
    const client = await Client.connect("TanishqBhardwaj/aesthetic-scorer-api");

    // Call predict API
    const result = await client.predict("/predict", { image: imageData });

    if (!result?.data || result.data.length === 0) {
      throw new Error("API returned an empty response.");
    }

    return result.data[0];
  } catch (error) {
    throw new Error(`Aesthetic Scorer API error: ${error.message}`);
  }
}
