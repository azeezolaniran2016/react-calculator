import http from 'http';
import fs from 'fs';
import url from 'url';
import path from 'path';

/**
 * Function to be used as a callback to our http.createServer method
 * It handles incoming requests and sends the response
 */
function requestHandler(request, response) {
  // resolve the path to the requested resource and assign it to a variable
  let requestedResource = path.join(
    __dirname, // current directory where server.js is found
    '../public', // step out of this directory into the public directory
    url.parse(request.url).pathname // path to resource requested by client
  );

  // use the exists method of the fs module to check if the requestedResource 
  // exists.
  fs.exists(requestedResource, function(exists) {
    // check if file does't exist and return a 404 status (File not found)
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    // Check if the reqested resource is a directory. If it is, just set our
    // index.html page as the requested resource.
    if (fs.statSync(requestedResource).isDirectory()) {
      requestedResource += '/index.html';
    }
    
    // Finally, we read the requested file (asynchronously) and send it's 
    // content to the client
    fs.readFile(
      requestedResource, // path to requested resource
      "binary", // read the requested resource as a binary file
      function(err, file) { // call back function to handle end of file reading

      // If an error occured while reading the file, send the error message 
      // with a status code of 500 (Internal server error)
      if (err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      // Helper object to map requested content types (extension) to response 
      // mime types
      const contentTypesByExtension = {
        '.html': "text/html",
        '.css':  "text/css",
        '.js':   "text/javascript"
      };

      // Helper object to hold our headers
      const headers = {};
      // get the content type using the requested resource file extension
      const contentType = contentTypesByExtension[
        path.extname(requestedResource)
      ];

      // if the requested resource maps to any of our content type extension, 
      // then set the Content-Type field for our response headers.
      if (contentType) {
        headers["Content-Type"] = contentType;
      }

      response.writeHead(200, headers); // write response header (if any)
      response.write(file, "binary"); // write content of read file (binary format)
      response.end(); // send response and close request
    });

  });
}

// create an instance of our httpServer and passing in our request handler callback
const server = http.createServer(requestHandler);
// declare our port noumber
const portNumber = 3030;
// setup our server to start listening on the port we specified
server.listen(portNumber, function () {
  // log to our console, so we know our server is up and running.
  console.log(`Server listening on port ${portNumber}`);
});
