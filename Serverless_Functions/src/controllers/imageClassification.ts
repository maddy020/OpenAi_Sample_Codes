import { Context } from "hono";

export async function imageClassification(c: Context) {
  try {
    const formData = await c.req.parseBody();
    const file = formData.file as File;
    const fileBuffer = await file.arrayBuffer();
    const input = {
      image: [...new Uint8Array(fileBuffer)],
    };
    const response = await c.env.AI.run("@cf/microsoft/resnet-50", input);
    return new Response(JSON.stringify(response));
  } catch (error) {
    console.log(error);
  }
}
