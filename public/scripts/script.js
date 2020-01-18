const hostUrl = "https://findyourbook-2020.herokuapp.com/";
// const hostUrl = "https://localhost:3000/";
async function registration() {
  try {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    let passwordconf = document.getElementById("passwordconf").value;
    let data = JSON.stringify({
      username: username,
      email: email,
      password: password,
      confirmpassword: passwordconf
    });
    let res = await fetch(hostUrl + "api/signup", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    });
    //const myJson = await res.json();
    const myJson = res.json();
    if (res.status == 200) {
      //console.log('Success:', JSON.stringify(myJson));
      console.log("the status is " + res.status);
      window.location =
        "https://findyourbook-2020.herokuapp.com/views/login.html";
    } else {
      console.log("the status is " + res.status);
      alert("Please Check for the Values Entered");
    }
  } catch (error) {
    console.log("inside register catch");
    console.error("Error:", error);
  }
}

async function login() {
  try {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let data = JSON.stringify({
      email: email,
      password: password
    });
    let res = await fetch(hostUrl + "api/login", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    });
    const myJson = res.json();
    if (res.status == 200) {
      //console.log('Success:', JSON.stringify(myJson));
      console.log("the status is " + res.status);
      window.location =
        "https://findyourbook-2020.herokuapp.com/views/interest.html";
    } else {
      console.log("the status is " + res.status);
      alert("Check you password");
    }
    //const myJson = res.json();
    //console.log(JSON.stringify(myJson));
  } catch (error) {
    console.error("Error:", error);
  }
}

console.log("Index.js Starts executing");
const apikey = "QEi7oEn3dOkmoLfxUdcBJg";
const url = "https://www.goodreads.com/search/index.xml?key=";
function find() {
  var xmlhttp = new XMLHttpRequest();
  var author = document.getElementById("author-name").value;
  var book = document.getElementById("book-name").value;
  console.log(author + "," + book);
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  var resp = xmlhttp.open(
    "GET",
    url + apikey + "&" + "q=" + author + "&" + "q=" + book,
    true
  );
  xmlhttp.send();
}

var bookname;
var authorname;
async function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table =
    "<tr><th>Title</th><th>Author</th><th>Cover Page</th><th>Ratings</th></tr>";
  var x = xmlDoc.getElementsByTagName("best_book");
  console.log("value int x", typeof x);
  for (i = 0; i < x.length; i++) {
    bookname = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    authorname = x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
    table +=
      "<tr><td>" +
      bookname +
      "</td><td>" +
      authorname +
      "</td><td>" +
      "<img src='" +
      x[i].getElementsByTagName("image_url")[0].childNodes[0].nodeValue +
      "' height='100px' width='70px'>" +
      "</td><td>" +
      "<div class=''stars data-rating='1'>" +
      "<span class='star'>&nbsp;</span>" +
      "<span class='star'>&nbsp;</span>" +
      "<span class='star'>&nbsp;</span>" +
      "<span class='star'>&nbsp;</span>" +
      "<span class='star'>&nbsp;</span>" +
      "<input type='submit' value='Add Rating' onClick = 'submitRating()'/>" +
      "</div>" +
      "</td></tr>";
  }
  document.getElementById("result").innerHTML = table;
}

async function submitRating() {
  // myFunction();
  try {
    let boo = bookname;
    let auth = authorname;
    let rat = 5;
    let data = JSON.stringify({
      author: auth,
      book: boo,
      rating: rat
    });
    let res = await fetch(hostUrl + "api/ratings", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    });
    const myJson = res.json();
    if (res.status == 200) {
      //console.log('Success:', JSON.stringify(myJson));
      console.log("the status is " + res.status);
      window.location =
        "https://findyourbook-2020.herokuapp.com/views/interest.html";
    } else {
      console.log("the status is " + res.status);
      alert("rating not given");
    }
    //const myJson = res.json();
    //console.log(JSON.stringify(myJson));
  } catch (error) {
    console.error("Error:", error);
  }
}
submitRating();
// async function openModal() {
//   var modal = document.getElementById("Book-Rating-modal");

//   var close = document.getElementsByClassName("close")[0];

//   modal.style.display = "block";

//   close.onclick = function() {
//     modal.style.display = "none";
//   };

//   window.onclick = function(event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   };
// }
