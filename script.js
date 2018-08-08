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
	console.log(book.title);
  library.push(book);
  console.log(library);
  localStorage.setItem("library", JSON.stringify(library));
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
      elem.padding = "50px";
      document.getElementById("imagedings").appendChild(elem);
  }
 
}