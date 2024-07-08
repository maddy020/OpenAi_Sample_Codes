import { Context } from "hono";

export async function textSpeechhtml(c: Context) {
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
    <h1>Text to Speech</h1>
    <textarea rows="15" cols="100" placeholder="Write your catchy words here...." id="inputEle"></textarea>
    <button id="generateBtn">Generate</button>
    <audio src="" id="audio"></audio>
  </div>

  <script>
    const inputElement = document.getElementById("inputEle");
    const submitBtn = document.getElementById("generateBtn");

    const submitForm = async () => {
    const options = {
  method: 'POST',
  headers: {
    'xi-api-key': 'sk_dc62693c9d1fb2e7276bad2a75685da1d918424f46336905',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"voice_settings":{"stability":1,"similarity_boost":1,"style":1,"use_speaker_boost":true},"text":inputElement.value})
};

fetch('https://api.elevenlabs.io/v1/text-to-speech/Xb7hH8MSUJpSbSDYk0k2', options)
  .then(response => response.blob())
  .then(response => {
     const audioBlob =  response;
        const audioUrl = URL.createObjectURL(audioBlob);

        const audioElement = document.getElementById('audio');
        audioElement.src = audioUrl;
        audioElement.play();
  })
  .catch(err => console.error(err));
  };
  
    submitBtn.addEventListener("click", submitForm);
  </script>
</body>
</html>

        `
  );
}
