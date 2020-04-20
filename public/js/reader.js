var book=ePub("./epub/charles-dickens_oliver-twist.epub"),rendition=book.renderTo("viewer",{width:"100%",height:600,spread:"always"}),displayed=rendition.display(),title=document.getElementById("title"),next=document.getElementById("next");next.addEventListener("click",(function(e){rendition.next(),e.preventDefault()}),!1);var prev=document.getElementById("prev");prev.addEventListener("click",(function(e){rendition.prev(),e.preventDefault()}),!1);var keyListener=function(e){37==(e.keyCode||e.which)&&rendition.prev(),39==(e.keyCode||e.which)&&rendition.next()};rendition.on("keyup",keyListener),document.addEventListener("keyup",keyListener,!1),book.ready.then((function(){var e=book.key()+"-locations",t=localStorage.getItem(e);return t?book.locations.load(t):book.locations.generate(1600)})).then((function(e){displayed.then((function(){var e=rendition.currentLocation(),t=book.locations.percentageFromCfi(e.start.cfi);console.log(t)}))})),window.addEventListener("unload",(function(){console.log("unloading"),this.book.destroy()}));const getCfiFromHref=async e=>{const t=e.split("#")[1],n=book.spine.get(e);await n.load(book.load.bind(book));const o=t?n.document.getElementById(t):n.document.body;return n.cfiFromElement(o)};var chapNames=[],chapCFI=[];book.loaded.navigation.then((function(e,t){var n=document.getElementById("toc"),o=document.createDocumentFragment();return e.forEach((function(e){var t=document.createElement("option");t.textContent=e.label,t.setAttribute("ref",e.href),chapNames.push(e.label),getCfiFromHref(e.href).then((function(e){chapCFI.push(e)})),o.appendChild(t)})),n.appendChild(o),n.onchange=function(){var e=n.selectedIndex,t=n.options[e].getAttribute("ref");return rendition.display(t),!1},book.locations.generate(1600)})),console.log(chapNames),console.log(chapCFI),console.log(book.locations.percentageFromCfi("epubcfi(/6/6[chapter-1.xhtml]!/")),$((function(){$((function(){$('[data-toggle="tooltip"]').tooltip()})),$(".circle").mouseenter((function(){$(this).addClass("hover")})),$(".circle").mouseleave((function(){$(this).removeClass("hover")}))}));