import { Context } from "hono";

// Define the API key and the API endpoint URL.
const XI_API_KEY = "sk_dc62693c9d1fb2e7276bad2a75685da1d918424f46336905";
const apiUrl = "https://api.elevenlabs.io/v1/text-to-speech";

// Define the headers for the API request.
const headers = {
  "xi-api-key": XI_API_KEY,
  "Content-Type": "application/json",
};

export async function textToSpeech(c: Context) {
  // Extract the text parameter from the query string
  const text = c.req.query("text");
  if (!text) {
    return c.text("Text parameter is required", 400);
  }

  try {
    // Prepare the request payload
    const payload = JSON.stringify({ text });

    // Send a POST request to the API endpoint to convert text to speech
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the audio data as a Blob
    const audioBlob = await response.blob();
    const audioArrayBuffer = await audioBlob.arrayBuffer();
    // Return the audio data as the response
    return c.body(audioArrayBuffer, 200, { "Content-Type": "audio/mpeg" });
  } catch (error) {
    error instanceof Error && console.error(error);
    return c.text(`Error converting text to speech: ${error}`, 500);
  }
}
