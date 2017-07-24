#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('express-demo-e:server');
var http = require('http');

//https
var https = require('https');
var fs = require('fs');

/**
 * Get port from environment and store in Express.
 */

//var port = normalizePort(process.env.PORT || '3000');
//app.set('port', port);
var port = normalizePort(process.env.PORT || '3000' || '3443');
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);
var options = {
    ca: fs.readFileSync('./https/ca_bundle.crt'),
    key: fs.readFileSync('./https/private.key'),
    cert: fs.readFileSync('./https/certificate.crt')
};
var httpsServer = https.createServer(options, app);

/**
 * Listen on provided port, on all network interfaces.
 */
var httpPort = normalizePort(process.env.PORT || '3000');
server.listen(httpPort);
server.on('error', onError);
server.on('listening', onListening);

// https 服务端配nginx实现https,不走框架实现nginx
//https://www.namecheap.com/support/knowledgebase/article.aspx/795/69/how-to-install-ssl-certificates
//var httpsPort = normalizePort('3443');
//httpsServer.listen(httpsPort);
//httpsServer.on('error', onError);
//httpsServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

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
    debug('Listening on ' + bind);
}
