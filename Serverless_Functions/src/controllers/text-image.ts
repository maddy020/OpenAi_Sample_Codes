import { Context } from "hono";

export async function textImage(c: Context) {
  try {
    const data = await c.req.json();
    const text = data.text;
    const width = 920;
    const height = 920;
    const seed = 42; // Each seed generates a new image variation
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(
      text
    )}?width=${width}&height=${height}&seed=${seed}`;
    return c.text(imageUrl);
  } catch (error) {
    console.log(error);
  }
}
