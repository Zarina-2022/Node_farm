# Node_farm

1. How create an API?

2. I positioned the JS file as a server and enabled it to respond to incoming requests.

3. Nodemon - npm install -g nodemon => is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. 

4. We needed the following modules of Node.js:
    - const fs = require('fs')
    - const http = require('http')
        * It allows creating a server in Node.js:
          http.createServer((req,res)=>{
             res()
          })

        * We need to specify the address at which we will listen to incoming requests:
           server.listen(4000, '127.0.0.1', ()=>{})

    - const url = require('url')
        * It is used to split my URL into pieces and get the piece I want.
           const {pathname, query} = url.parse(req.url)

5. Routing => It detects which endpoint the request coming to the API reaches and sends a response accordingly.
              For this, we need to know which path the client sent the request to and which http method it used.

6. The API I wrote in this example returns the html response, not the json response.

7. Gif of the project:
   
  ![](/Users/zarinasekerdag/Desktop/Backend/vsc/create_api/node_farm.mov)

Enjoy coding 🩷 
