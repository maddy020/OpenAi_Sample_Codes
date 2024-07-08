import { Context } from "hono";

export async function streamTextGeneration(c: Context) {
  const query = c.req.query("query");
  const question = query || "What is the square root of 9?";
  //@ts-ignore
  const stream = await c.env.AI.run("@cf/meta/llama-2-7b-chat-int8", {
    messages: [{ role: "user", content: question }],
    stream: true,
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream",
    },
  });
}
