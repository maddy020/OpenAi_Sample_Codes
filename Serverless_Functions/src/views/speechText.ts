import { Context } from "hono";

export interface Env {
  AI: Ai;
}

export async function speechTexthtml(c: Context) {
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
    textarea#inputEle {
      font-size: 1.5rem;
      padding: 1rem;
      margin-top: 2rem;
      width: 80%;
      height: 20rem;
      border-radius: 5px;
      border: 1px solid black;
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
    <h1>Speech To Text</h1>
    <form method="POST" id="form-query">
    <input type="file" id="inputElement" accept="audio/*"/>
    <textarea rows="15" cols="100" placeholder="" id="outputElement"></textarea>
    <button id="generateBtn" type="submit">Generate Text</button>
    </form>
  </div>

    <script>
      const form = document.getElementById("form-query");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const inputElement = document.getElementById("inputElement");
        const file = inputElement.files[0];
       
        if (!file) {
          alert("Please select a file.");
          return;
        }
         const validAudioTypes = ['audio/mpeg', 'audio/wav'];
    if (!validAudioTypes.includes(file.type)) {
        alert('Please select a valid audio file (mp3 or wav).');
        return;
    }
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/speech-to-text/speechToText", {
          method: "POST",
          body: formData,
          formData,
          headers:{
            contentType: 'multipart/form-data'

          }
        });

        const answer = await res.text();
        const finalAnswer = JSON.parse(answer);
        console.log(finalAnswer);
        const outputElement = document.getElementById("outputElement");
        outputElement.value = finalAnswer.response.text;
      });
    </script>
</body>
</html>

        `
  );
}
