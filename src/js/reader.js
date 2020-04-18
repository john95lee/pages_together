
// Load the opf
var book = ePub("./epub/charles-dickens_oliver-twist.epub");
var rendition = book.renderTo("viewer", {
  width: "100%",
  height: 600,
  spread: "always"
});

rendition.display();

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

var title = document.getElementById("title");

rendition.on("rendered", function(section){
  var current = book.navigation && book.navigation.get(section.href);

  if (current) {
    var $select = document.getElementById("toc");
    var $selected = $select.querySelector("option[selected]");
    if ($selected) {
      $selected.removeAttribute("selected");
    }

    var $options = $select.querySelectorAll("option");
    for (var i = 0; i < $options.length; ++i) {
      let selected = $options[i].getAttribute("ref") === current.href;
      if (selected) {
        $options[i].setAttribute("selected", "");
      }
    }
  }

});

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

var chapList = [];

book.loaded.navigation.then(function(toc){
  var $select = document.getElementById("toc"),
          docfrag = document.createDocumentFragment();

  toc.forEach(function(chapter) {
    chapList.push(chapter);
      var option = document.createElement("option");
      option.textContent = chapter.label;
      option.setAttribute("ref", chapter.href);
      docfrag.appendChild(option);
  });

  $select.appendChild(docfrag);

  $select.onchange = function(){
          var index = $select.selectedIndex,
                  url = $select.options[index].getAttribute("ref");
          rendition.display(url);
          return false;
  };

  //Drawing chapter circles
  function makeCircles() {

    if (chapList.length < 2) then{
      $("#line").hide();
      $("#span").show().text(chapList[0].label);
    }else if (chapList.length >= 2){
      var first = chapList[0];
      var last = chapList[chapList.length - 1];

      var firstChapter = chapList.label;
      var

    }

  }

});

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

