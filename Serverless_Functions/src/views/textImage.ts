import { Context } from "hono";

export interface Env {
  AI: Ai;
}

export async function textImagehtml(c: Context) {
  return c.html(
    `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Text-Generation</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
    @import url('https://unpkg.com/normalize.css');
    html {
      font-family: 'Roboto Mono', monospace;
      line-height: 1.5;
    }
    * {
      font-size: 16px;
    }
    h1 {
      font-size: 3rem;
    }
    div#content {
      align-items: center;
      display: flex;
      flex-direction: column;
    }
    input#inputElement {
      padding:0.5rem;
      font-size: 1.5rem;
      width:100%
    }
    form#form-query {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    button#generateBtn {
      font-size: 1.5rem;
      padding: 1rem 2rem;
      margin-top: 2rem;
      border-radius: 5px;
      border: 1px solid black;
      cursor: pointer;
    }
    button#generateBtn:hover {
      background-color: gray;
    }  
  </style>
</head>
<body>
  <div id="content">
    <h1>Text to Image</h1>
    <form method="POST" id="form-query">
    <input placeholder="Enter your prompt here" id="inputElement"></input>
    <img src="" id="outputElement"/>
    <button id="generateBtn" type="submit">Generate Image</button>
    </form>
  </div>

    <script>
      const form = document.getElementById("form-query");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const inputElement = document.getElementById("inputElement");
        const outputElement=document.getElementById("outputElement");
        const res = await fetch("/text-to-image/textImage", {
          method: "POST",
          body: JSON.stringify({ text: inputElement.value }),
          headers:{
            contentType: "application/json"
          }
        });

        const imageUrl = await res.text();
        outputElement.src=imageUrl;
        console.log(imageUrl);
      });
    </script>
</body>
</html>

        `
  );
}
