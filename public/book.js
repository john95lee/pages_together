// Make Connection to websocket on server-side
var socket = io.connect('http://localhost:8000');

// Query DOM
var message = document.getElementById('message'),
    username = document.getElementById('username'),
    btn_submit = document.getElementById('submit'),
    reader_text = document.getElementById('reader-text'),
    feedback = document.getElementById('feedback');

var bookname = "EdgarAllanPoe.epub";

//Event Listeners
btn_submit.addEventListener('click', function(){
    socket.emit('load-book',{
        book: message.value,
        chapter: username.value
    })
})

socket.on('load-book',function(data){
    reader_text.innerHTML = data;
})

var book = ePub("./epub/pg25525.epub");
var rendition = book.renderTo(reader_text,{
    width: 600,
    height: 400
});
var displayed = rendition.display();
