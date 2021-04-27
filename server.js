const express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
var http = require('http');
require('./database/index');

/**
 * setar passport aqui no futuro
*/

/*
setar a importação de router aqui no futuro
*/

var indexRouter = require("./routes/index");
var homeRouter = require("./routes/home");
var equipesRouter = require("./routes/equipes");
/** 
 * Montando meu app
 * */
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * setar os router no app
 */
 app.use("/", indexRouter);
 app.use("/home", homeRouter);
 app.use("/equipes", equipesRouter);
/**
 * setar view engine aqui no futuro 
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**
 * Por fim, começar o setup do servidor HTTP
 */
var port = '80';
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

 function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('\x1b[35m%s\x1b[0m', 'Servidor rodando em http://localhost:3000/');
  }
  