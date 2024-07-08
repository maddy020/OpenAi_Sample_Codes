import { Context } from "hono";

export async function homePagehtml(c: Context) {
  return c.html(`
     
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
            & * { font-size: 16px }
          }
    
          div#content {
            align-items: center;
            display: flex;
            flex-direction: column;
          }
          ul#listDiv {
            list-style-type: none;
            padding-top: 3rem;
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
          li#listItem {
            padding: 10px;
            font-size: 2rem;
            border: 1px solid black;
            border-radius: 5px;
            cursor: pointer;
          }
            li#listItem:hover {
             background-color: #f1f1f1;
          }
          h1{
          
          font-size: 3rem;
          
          }
    
        </style>
      </head>
      <body>
          <div id="content">
            <h1>Choose Your Function Wisely .....</h1>
            <ul id="listDiv">
              <li id="listItem">Text-Generation</li>
              <li id="listItem">Text to Speech</li>
              <li id="listItem">Speech to Text</li>
              <li id="listItem">Text to Image</li>
              <li id="listItem">Text Classification</li>
              <li id="listItem">Image Classification</li>
            </ul>
          </div>    
        </div>
    
         <script>
          const listItems = document.querySelectorAll("li#listItem");
          listItems.forEach((item) => {
            item.addEventListener("click", () => {
              const text = item.innerText.toLowerCase().replace(/ /g, "-");
              window.location.href = "/"+text;
            });
          });
        </script>
      </body>
    </html>
        `);
}
