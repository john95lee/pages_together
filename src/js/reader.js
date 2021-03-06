// Load the opf
var book = ePub("./epub/charles-dickens_oliver-twist.epub");
var rendition = book.renderTo("viewer", {
  width: "100%",
  height: 600,
  spread: "always"
});
var displayed = rendition.display();

var title = document.getElementById("title");

//Next button
var next = document.getElementById("next");
next.addEventListener("click", function(e){
    rendition.next();
    e.preventDefault();
}, false);

//Prev button
var prev = document.getElementById("prev");
prev.addEventListener("click", function(e){
    rendition.prev();
    e.preventDefault();
}, false);

//Handling left/right arrow keys
var keyListener = function(e){
    // Left Key
    if ((e.keyCode || e.which) == 37) {
        rendition.prev();
    }

    // Right Key
    if ((e.keyCode || e.which) == 39) {
        rendition.next();
    }
};
rendition.on("keyup", keyListener);
document.addEventListener("keyup", keyListener, false);

book.ready.then(function(){
    // Load in stored locations from json or local storage
    var key = book.key()+'-locations';
    var stored = localStorage.getItem(key);
    if (stored) {
         return book.locations.load(stored);
    } else {
        // Or generate the locations on the fly
        // Can pass an option number of chars to break sections by
        // default is 150 chars
        return book.locations.generate(1600);
        console.log(book.locations.percentageFromCfi());
    }
})
.then(function(locations){
        /*controls.style.display = "block";
        slider.setAttribute("type", "range");
        slider.setAttribute("min", 0);
        slider.setAttribute("max", 100);
        // slider.setAttribute("max", book.locations.total+1);
        slider.setAttribute("step", 1);
        slider.setAttribute("value", 0);

        slider.addEventListener("change", slide, false);
        slider.addEventListener("mousedown", function(){
                mouseDown = true;
        }, false);
        slider.addEventListener("mouseup", function(){
                mouseDown = false;
        }, false);
        */
        // Wait for book to be rendered to get current page
        displayed.then(function(){
                // Get the current CFI
                var currentLocation = rendition.currentLocation();
                // Get the Percentage (or location) from that CFI
                var currentPage = book.locations.percentageFromCfi(currentLocation.start.cfi);
                console.log(currentPage);
                //slider.value = currentPage;
                //currentPage.value = currentPage;
        });

/*
        controls.appendChild(slider);

        currentPage.addEventListener("change", function(){
            var cfi = book.locations.cfiFromPercentage(currentPage.value/100);
            rendition.display(cfi);
        }, false);

        // Listen for location changed event, get percentage from CFI
        rendition.on('relocated', function(location){
                var percent = book.locations.percentageFromCfi(location.start.cfi);
                var percentage = Math.floor(percent * 100);
                if(!mouseDown) {
                        slider.value = percentage;
                }
                currentPage.value = percentage;
                console.log(location);
        });

        // Save out the generated locations to JSON
        localStorage.setItem(book.key()+'-locations', book.locations.save());
*/
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

  return book.locations.generate(1600);

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

console.log(book.locations.percentageFromCfi("epubcfi(/6/6[chapter-1.xhtml]!/"));

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
