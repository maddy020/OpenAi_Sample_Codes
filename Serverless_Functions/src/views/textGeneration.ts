import { Context } from "hono";

export async function textGenerationhtml(c: Context) {
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
            & * { font-size: 16px }
          }
            h1{
            font-size:3rem
            }
    
          div#content {
            align-items: center;
            display: flex;
            flex-direction: column;
            
          }
    
          div#header { 
            align-items: center;
            gap: 20px;
            display: flex; 
            justify-content: center;
          }
    
          div#response {
            padding-top:1.5rem;
            width: 80%;
          }
    
          form#query-form { 
            bottom: 20px;
            position: fixed;
            display: flex;
            gap: 20px;
            margin: 0 auto;
            width: 90%;
          }
    
          form#query-form input { 
            flex: 1;
            padding: 5px;
          }
        </style>
      </head>
      <body>
        <div id="content">
          <div id="header">
            <h1>Text-Generation</h1>
          </div>
    
          <div id="response"></div>
    
          <form id="query-form">
            <input 
              autofocus
              name="query"
              placeholder="Ask the AI anything" 
              type="text" 
            >
            </input>
            <button type="submit">Ask</button>
          </form>
        </div>
    
         <script>
          const submitForm = async (formEvent) => {
            formEvent.preventDefault();
            const val=formEvent.target.query.value;
            const url="/text-generation/stream?query="+val;
            const source=new EventSource(url);
            source.onmessage = (event) => {
              if (event.data === "[DONE]") {
                source.close()
                formEvent.target.query.value = ""
                return
              }
              const data = JSON.parse(event.data)
              document.querySelector("div#response").innerHTML += data.response
            }
          }
    
          document.querySelector("form#query-form").addEventListener("submit", submitForm)
        </script>
      </body>
    </html>
        `
  );
}
