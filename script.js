var book = {};
var library = [];
//localStorage.setItem("library", library);
var obj;
var isbn;

function httpGetAsync(url, callback) {

	var isbn = document.getElementById("exampleInput").value; 
    var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;  
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          //callback(xmlHttp.responseText);

          var obj = JSON.parse(this.responseText);
		  document.getElementById("bookInfo").classList.remove('invisible');
          document.getElementById("exampleInput").innerHTML = obj.items[0].volumeInfo.isbn;
          document.getElementById("bookTitle").innerHTML = obj.items[0].volumeInfo.title;
          document.getElementById("bookAuthor").innerHTML = obj.items[0].volumeInfo.authors;
          document.getElementById("bookISBN").innerHTML = obj.items[0].volumeInfo.industryIdentifiers[0].identifier;
          document.getElementById("bookTitle").innerHTML = "<img src='" + obj.items[0].volumeInfo.imageLinks.smallThumbnail + "'/>";
          console.log(obj);

          book = {
          	title: obj.items[0].volumeInfo.title,
          	author: obj.items[0].volumeInfo.authors,
          	isbn: obj.items[0].volumeInfo.industryIdentifiers[0].identifier,
            thumb: obj.items[0].volumeInfo.imageLinks.smallThumbnail
          };

          //localStorage.setItem(book.isbn, JSON.stringify(book));


        } 

    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
    document.getElementById("exampleInput").innerHTML = this.responseText;

}

function saveBook() {
	//localStorage.setItem(book.isbn, JSON.stringify(book));
  isbn = book.isbn;
  var lib = JSON.parse(localStorage.getItem('library'));
	console.log(book.title);
  localStorage.setItem("book", JSON.stringify(book));
  lib.push(book);
  console.log(lib);
  localStorage.setItem("library", JSON.stringify(lib));


  document.getElementById("success").classList.remove('invisible');

}

function getBook() {
	//localStorage.getItem(book.isbn, JSON.stringify(book));
	//document.getElementById("bookTitle").innerHTML = book.title;
  
}

function displayAll() {
  
  var lib = JSON.parse(localStorage.getItem('library'));
  //console.log(lib[1].title);


 

  for(i=0; i < lib.length; i++) {
     //document.getElementById("bookTitle").innerHTML += " " + lib[i].title;

      var elem = document.createElement("img");
      elem.src = lib[i].thumb;
      elem.width = 128;
      elem.height = 187;
      document.getElementById("imagedings").appendChild(elem);
  }
 
}


function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}


function exportLib() {


  //var blob = new Blob(["test text"], {type: "text/plain; charset: utf-8"});

  //console.log("Click");
  //var myFile = blobToFile(blob, "file.txt");
  //var url = URL.createObjectURL(myFile);
  //console.log(url);

  //var exporting =document.getElementById("export");




  //var lul = document.getElementById("download");
  //lul.href = url;
  //lul.click();

  //exporting.download = myFile;
  var lib = JSON.parse(localStorage.getItem('library'));
  var data = { lib, d: new Date() },
    fileName = "library.json";

saveData(data, fileName);

}



var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());


var lib = JSON.parse(localStorage.getItem('library'));
var counter = lib.length;
  console.log(counter);
  document.getElementById("allCounter").innerHTML = counter;