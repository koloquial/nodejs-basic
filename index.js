
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

//file system module
const fs = require('fs');
//synchronous
const files = fs.readdirSync('./');
log(files);

//asynchronous *preferred
fs.readdir('./', function(err, files) {
    if(err) log(err);
    else log(files);
})

//events module
// const EventEmitter = require('events');

//instance object of new event emitter class
// const emitter = new EventEmitter();

//register a listener
// emitter.on('messageLogged', (arg) => {
//     log('Listener called', arg);
// });

//raise an event (with event arguement)
// emitter.emit('messageLogged', { id: 1, url: 'http://' });

//class with emitter instance
const Logg = require('./logg.js');
//create instance
const logg = new Logg();

//register a listener
logg.on('messLogg', (arg) => {
    console.log('logg message', arg)
})
logg.doLogg('do log called.');

//server protocols
const http = require('http');
//define port to listen
const port = 3000;

//http module - create server
const server = http.createServer(function(request, response){
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

    //request endpoints
    if(request.url === '/test'){
        response.write(JSON.stringify([1, 2, 3]));
        response.end();
    }
});

//on method
server.on('connection', () => {
    log('new connection');
})

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