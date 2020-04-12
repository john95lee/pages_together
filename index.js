var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();

// Prepare Server

var server = app.listen(4000, function(){
    console.log('Server listening to requests on port 4000');
})

// Static Files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection: ', socket.id);

})
