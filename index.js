//server protocols
const http = require('http');
//file handling
const fs = require('fs');
//define port to listen
const port = 3000;

//load custom module
const log = require('./logger');

//path module
const path = require('path');
const pathObj = path.parse(__filename);
log(pathObj);

//operating system module
const os = require('os');
let totalMemory = os.totalmem();
let freeMemory = os.freemem();
log(`Total Memory: ${totalMemory} \nFree Memory: ${freeMemory}`);

//http module - create server
const server = http.createServer(function(request, response){
    //log request body using logger module
    log(request);
    //write html
    response.writeHead(200, {'Content-Type': 'text/html'})
    //read index.html
    fs.readFile('index.html', function(error, data){
        if(error){
            //file not not found
            response.writeHead(404);
            response.write('Error: File Not Found.');
        }else{
            //file found and sent
            response.write(data);
        }
        //end communication
        response.end();
    });
});

//start server and listen to port
server.listen(port, function(error) {
    if(error){
        //log errors in regards to server starting
        log(error);
    }else{
        //server started successfully
        log(`Server is listening: ${port}`);
    }
});