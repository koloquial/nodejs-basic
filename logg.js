const EventEmitter = require('events');

class Logg extends EventEmitter{
    //log message to console method 
    doLogg(message){
        console.log(message);

        //raise event
        this.emit('messLogg', { id: 2, url: 'http://' });
    }
}
module.exports = Logg;