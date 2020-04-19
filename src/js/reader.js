
// Load the opf
var book = ePub("./epub/charles-dickens_oliver-twist.epub");
var rendition = book.renderTo("viewer", {
  width: "100%",
  height: 600,
  spread: "always"
});

rendition.display();

rendition.on("relocated", function(location){
  console.log(location);

  var next = book.package.metadata.direction === "rtl" ?  document.getElementById("prev") : document.getElementById("next");
  var prev = book.package.metadata.direction === "rtl" ?  document.getElementById("next") : document.getElementById("prev");

  if (location.atEnd) {
    next.style.visibility = "hidden";
  } else {
    next.style.visibility = "visible";
  }

  if (location.atStart) {
    prev.style.visibility = "hidden";
  } else {
    prev.style.visibility = "visible";
  }

});

rendition.on("layout", function(layout) {
  let viewer = document.getElementById("viewer");

  if (layout.spread) {
    viewer.classList.remove('single');
  } else {
    viewer.classList.add('single');
  }
});

window.addEventListener("unload", function () {
  console.log("unloading");
  this.book.destroy();
});

const getCfiFromHref = async (href) => {
    const id = href.split('#')[1];
    const item = book.spine.get(href);
    await item.load(book.load.bind(book));
    const el = id ? item.document.getElementById(id) : item.document.body;
    return item.cfiFromElement(el);
}

var chapNames = [];
var chapCFI = [];

book.loaded.navigation.then(function(toc, navPath){
  var $select = document.getElementById("toc"),
    docfrag = document.createDocumentFragment();

  toc.forEach(function(chapter) {
    var option = document.createElement("option");
    option.textContent = chapter.label;
    option.setAttribute("ref", chapter.href);

    chapNames.push(chapter.label);

    getCfiFromHref(chapter.href)
      .then(function(value){
        chapCFI.push(value);
      })

    docfrag.appendChild(option);
  });

  $select.appendChild(docfrag);

  $select.onchange = function(){
    var index = $select.selectedIndex,
            url = $select.options[index].getAttribute("ref");
    rendition.display(url);
    return false;
  };

});
/*
if (chapNames.length == chapCFI.length){
  var timeline = document.getElementById("timeline");
  var i;
  for (i=0; i < chapNames.length; i++){
    timeline.innerHTML += "<div id=&quotchap"+i+"&quotclass=&quotmarker&quot data-toggle=&quottooltip&quot title=&quot"+chapNames[i]+"&quot style="left: 0%;"></div>"
  }

}
*/
console.log(chapNames);
console.log((chapCFI));

book.ready.then(function() {

  var next = document.getElementById("next");

  next.addEventListener("click", function(e){
    book.package.metadata.direction === "rtl" ? rendition.prev() : rendition.next();
    e.preventDefault();
  }, false);

  var prev = document.getElementById("prev");
  prev.addEventListener("click", function(e){
    book.package.metadata.direction === "rtl" ? rendition.next() : rendition.prev();
    e.preventDefault();
  }, false);

  var keyListener = function(e){

    // Left Key
    if ((e.keyCode || e.which) == 37) {
      book.package.metadata.direction === "rtl" ? rendition.next() : rendition.prev();
    }

    // Right Key
    if ((e.keyCode || e.which) == 39) {
      book.package.metadata.direction === "rtl" ? rendition.prev() : rendition.next();
    }

  };

  rendition.on("keyup", keyListener);
  document.addEventListener("keyup", keyListener, false);


})

  book.locations.generate(1000);
  console.log(book.locations.percentageFromCfi("epubcfi(/6/6[chapter-1.xhtml]!/"));

//Highlight selected text
rendition.on("selected", function(cfiRange, contents){
    //console.log("highlight clicked", e.target);
    console.log(cfiRange);
    console.log("start cfi: ", rendition.location.start.cfi);
    console.log("end cfi: ", rendition.location.end.cfi);
    rendition.annotations.highlight(cfiRange,{}, (e) => {
    })
    contents.window.getSelection().removeAllRanges();
});

//JQuery
$(function(){

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  $(".circle").mouseenter(function() {
    $(this).addClass("hover");
  });

  $(".circle").mouseleave(function() {
    $(this).removeClass("hover");
  });

});
