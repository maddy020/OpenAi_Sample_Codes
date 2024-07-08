import { Hono } from "hono";
import { streamTextGeneration } from "./controllers/text-generation";
import { textGenerationhtml } from "./views/textGeneration";
import { textSpeechhtml } from "./views/textSpeech";
import { homePagehtml } from "./views/homePage";
import { textToSpeech } from "./controllers/text-speech";
import { speechTexthtml } from "./views/speechText";
import { speechToText } from "./controllers/speech-text";
import { imageClassificationhtml } from "./views/imageClassification";
import { imageClassification } from "./controllers/imageClassification";
import { textClassificationhtml } from "./views/textClassification";
import { textClassification } from "./controllers/textClassification";
import { textImagehtml } from "./views/textImage";
import { textImage } from "./controllers/text-image";
type Bindings = {
  AI: "https://gateway.ai.cloudflare.com/v1/66fcdc2b4a67031c81a2d4ad77a4bac3/2340ehvdfn/";
};

const app = new Hono<{ Bindings: Bindings }>();

// -------------------------------------  htmlPages ---------------------------------------------
app.get("/", homePagehtml);

app.get("/text-generation", textGenerationhtml);
app.get("/speech-to-text", speechTexthtml);
app.get("/text-to-speech", textSpeechhtml);
app.get("/image-classification", imageClassificationhtml);
app.get("/text-classification", textClassificationhtml);
app.get("/text-to-image", textImagehtml);
// -------------------------------------  Controllers ---------------------------------------------

app.get("/text-generation/stream", streamTextGeneration);
app.post("/text-to-speech/textToSpeech", textToSpeech);
app.post("/speech-to-text/speechToText", speechToText);
app.post("/image-classification/imageClassification", imageClassification);
app.post("/text-classification/classify", textClassification);
app.post("/text-to-image/textImage", textImage);
export default app;
