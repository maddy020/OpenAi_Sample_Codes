import { Context } from "hono";

export async function textClassification(c: Context) {
  try {
    const data = await c.req.json();
    const text = data.text;
    const response = await c.env.AI.run(
      "@cf/huggingface/distilbert-sst-2-int8",
      {
        text: text,
      }
    );
    return Response.json(response);
  } catch (error) {
    console.log(error);
  }
}
