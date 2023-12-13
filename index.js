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

//file system
//synchronous
const files = fs.readdirSync('./');
log(files);

//asynchronous *preferred
fs.readdir('./', function(err, files) {
    if(err) log(err);
    else log(files);
})

//events module
//camel casing for class
const EventEmitter = require('events');
//instance object of new event emitter class
const emitter = new EventEmitter();
//emitter methods

//register a listener
emitter.on('messageLogged', (arg) => {
    log('Listener called', arg);
});
//raise an event (with event arguement)
emitter.emit('messageLogged', { id: 1, url: 'http://'});

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