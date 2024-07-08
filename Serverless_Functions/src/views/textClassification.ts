import { Context } from "hono";

export async function textClassificationhtml(c: Context) {
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
      
    h2#result{
        font-size: 2rem;
        margin-top: 1rem;
    }
  </style>
</head>
<body>
  <div id="content">
    <h1>Text Classification</h1>
    <h2 id="result"></h2>
    <textarea rows="15" cols="100" placeholder="Write your catchy words here...." id="inputEle"></textarea>
    <button id="generateBtn">Generate</button>
    <audio src="" id="audio"></audio>
  </div>

  <script>
    const inputElement = document.getElementById("inputEle");
    const submitBtn = document.getElementById("generateBtn");
    const result = document.getElementById("result");
    const submitForm = async() => {
     const response=await fetch('/text-classification/classify', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ text: inputElement.value })
     })
     const data=await response.json()
     if(data[0].score > data [1].score){
       result.innerHTML = "The statement is " +  data[0].label;
     }
       else{
         result.innerHTML = "The statement is " + data[1].label
       }
     }
    submitBtn.addEventListener("click", submitForm);
  </script>
</body>
</html>

        `
  );
}
