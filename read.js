function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("test.json", function(text){
    var data = JSON.parse(text);
    //var ul = document.getElementById("bookInfo");
    //var title = document.createElement("li");
    //var author = document.createElement("li");
    //var thumb = document.createElement("li");
   
    var default_image = document.getElementById('thumb');

    for(i = 0; i < data.books.length; i++) {

        
     //   title.appendChild(document.createTextNode(data.books[i].title));
       // li.appendChild(document.createElement("br"));
       // author.appendChild(document.createTextNode(data.books[i].author));
       // thumb.appendChild(document.createTextNode(data.books[i].title));
        //li.setAttribute("class", "list-group-item" );
        //ul.appendChild(li);

        //document.getElementById("bookTitle").innerHTML = data.books[i].title;
    }
    
    console.log(data);
});
