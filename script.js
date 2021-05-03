var firebaseConfig = {
    apiKey: "AIzaSyDZSDeBS6BpfcNoVkrWfx-uNeLZMscOo1o",
    authDomain: "projectengess.firebaseapp.com",
    projectId: "projectengess",
    storageBucket: "projectengess.appspot.com",
    messagingSenderId: "434969956116",
    appId: "1:434969956116:web:f5d7ac191e382b821d3c01"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

async function autoGenerate() {
    //https://github.com/lukePeavey/quotable#get-random-quote
    const response = await fetch('https://api.quotable.io/random')
    const data = await response.json()
    document.getElementById("yw").value = data.content;
    document.getElementById("pn").value = data.author;
}