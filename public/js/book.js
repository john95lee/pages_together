var socket=io.connect("http://localhost:8000"),message=document.getElementById("message"),username=document.getElementById("username"),btn_submit=document.getElementById("submit"),reader_text=document.getElementById("reader-text"),feedback=document.getElementById("feedback"),bookname="EdgarAllanPoe.epub";btn_submit.addEventListener("click",function(){socket.emit("load-book",{book:message.value,chapter:username.value})}),socket.on("load-book",function(e){reader_text.innerHTML=e});