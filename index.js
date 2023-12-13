//server protocols
const http = require('http');
//file handling
const fs = require('fs');
//define port to listen
const port = 3000;

//create server
const server = http.createServer(function(request, response){
    //request
    console.log('Request:', request);
    //write html
    response.writeHead(200, {'Content-Type': 'text/html'})
    //read index.html
    fs.readFile('index.html', function(error, data){
        if(error){
            //not found
            response.writeHead(404);
            response.write('Error: File Not Found.');
        }else{
            //file found and sent
            response.write(data);
        }
        //end communication
        response.end();
    })
})

//start server and listen to port
server.listen(port, function(error) {
    if(error){
        //log errors in regards to server starting
        console.log(error);
    }else{
        //server started successfully
        console.log(`Server is listening: ${port}`);
    }
})