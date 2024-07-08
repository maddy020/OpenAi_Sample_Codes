import { Context } from "hono";

export interface Env {
  AI: Ai;
}

export async function imageClassificationhtml(c: Context) {
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
    table, th, td {
     border:1px solid black;
    }
    th,td{
       padding:10px
    }  
  </style>
</head>
<body>
  <div id="content">
    <h1>Image Classification</h1>
    <form method="POST" id="form-query">
    <input type="file" id="inputElement" accept="image/*"/>
<table id="data-table">
    <thead>
        <tr>
            <th>Label</th>
            <th>Score</th>
        </tr>
    </thead>
    <tbody>
        <!-- Data will be inserted here -->
    </tbody>
</table>
    <button id="generateBtn" type="submit">Start Processing</button>
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

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/image-classification/imageClassification", {
          method: "POST",
          body: formData,
          formData,
          headers:{
            contentType: 'multipart/form-data'
          }
        });

        const answer = await res.text();
        const tableBody = document.querySelector("#data-table tbody");

       const data = JSON.parse(answer);

        data.forEach(item => {
            const row = document.createElement("tr");

            const labelCell = document.createElement("td");
            labelCell.textContent = item.label;
            row.appendChild(labelCell);

            const scoreCell = document.createElement("td");
            scoreCell.textContent = item.score.toFixed(10); 
            row.appendChild(scoreCell);

            tableBody.appendChild(row);
        });
      });
    </script>
</body>
</html>

        `
  );
}
