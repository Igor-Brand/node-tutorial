const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter{};

// iniciando o objeto
const myEmitter = new MyEmitter();

//adicionando um listener para o log event
myEmitter.on('log',(msg)=>logEvents(msg));

setTimeout(()=>{
    //Emit event
    myEmitter.emit('log','Log event emitted!');

}, 2000);
