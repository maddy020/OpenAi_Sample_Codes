import { Context } from "hono";

export async function speechToText(c: Context) {
  try {
    const formData = await c.req.parseBody();
    const file = formData.file as File;
    const fileBuffer = await file.arrayBuffer();
    const input = {
      audio: [...new Uint8Array(fileBuffer)],
    };
    const response = await c.env.AI.run("@cf/openai/whisper", input);
    return c.json({ input: { audio: [] }, response });
  } catch (error) {
    console.log(error);
  }
}
