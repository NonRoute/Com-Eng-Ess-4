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

function clearForm() {
  document.getElementById("yw").value = "";
  document.getElementById("pn").value = "";
}

function addPoll() {
    const poll = document.getElementById("pollList");
    const pollelement = document.createElement("div");
    pollelement.onclick = function() {
      voteCount.innerText++;
    };
    pollelement.className = "pollelement";
    const pollTable = document.createElement("table");
    pollTable.className = "poll-table"
    const tr = document.createElement("tr");
    const pollText = document.createElement("td");
    pollText.className = "poll-text"
    pollText.innerText = document.getElementById("yw").value+" - "+document.getElementById("pn").value;
    const voteCount = document.createElement("td");
    voteCount.className = "vote-count"
    voteCount.innerText = 0;
    poll.appendChild(pollelement);
    pollelement.appendChild(pollTable);
    pollTable.appendChild(tr);
    tr.appendChild(pollText);
    tr.appendChild(voteCount);
}

