var express = require('express');
var socket = require('socket.io');
var EPub = require("epub");

// App setup
var app = express();

// Prepare Server

var server = app.listen(8000, function(){
    console.log('Server listening to requests on port 8000');
})

// Static Files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection: ', socket.id);

    socket.on('load-book', function(data) {

        var EPub = require("epub");

        var epub = new EPub("epub/"+"pg25525.epub", "/imagewebroot/", "/articlewebroot/");
        epub.on("error", function(err){
            console.log("ERROR\n-----");
            throw err;
        });

        epub.on("end", function(err){
            console.log("METADATA:\n");
            console.log(epub.metadata);

            console.log("\nSPINE:\n");
            console.log(epub.flow);

            console.log("\nTOC:\n");
            console.log(epub.toc);

            // get first chapter
            epub.getChapter(epub.spine.contents[data.chapter].id, function(err, data){
                if(err){
                    console.log(err);
                    return;
                }
                io.sockets.emit('load-book',data);
            });

            /*
            epub.getImage(image_id, function(err, data, mimeType){
                console.log(err || data);
                console.log(mimeType)
            });
            */

        });

        epub.parse();

    })

})
