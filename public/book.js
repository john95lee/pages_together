// Make Connection to websocket on server-side
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
    username = document.getElementById('username'),
    btn_submit = document.getElementById('submit'),
    reader_text = document.getElementById('reader-text'),
    feedback = document.getElementById('feedback');

//Event Listeners
btn_submit.addEventListener('click', function(){
    console.log('button pressed');
})

// Emit events
