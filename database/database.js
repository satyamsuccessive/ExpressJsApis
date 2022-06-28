const mongoose = require('mongoose');
const {createServer} = require('http')
const AppServer = require("../server")
const port  = 3002

AppServer.set("port",port);
const server = createServer(AppServer); //SERVER CREATION

const connection  = mongoose.connect("mongodb://admin:123@localhost:27017/posts?authSource=admin"
,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

connection.then(con=>{
    console.log("DB connected successfully")
    return server.listen(port)
}).then(
    res=>console.log(`Server is listening on port ${port}`)
).catch(err=>console.log(`Something went wrong ${err}`))

server.on("error",onError)
server.on("Listening",onListening)


function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}

function onError(error) {
    console.log(error)
    if (error.syscall !== 'listen') { throw error; }
    const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}





