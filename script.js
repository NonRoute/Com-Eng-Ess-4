var firebaseConfig = {
    apiKey: "AIzaSyDZSDeBS6BpfcNoVkrWfx-uNeLZMscOo1o",
    authDomain: "projectengess.firebaseapp.com",
    databaseURL: "https://projectengess-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "projectengess",
    storageBucket: "projectengess.appspot.com",
    messagingSenderId: "434969956116",
    appId: "1:434969956116:web:f5d7ac191e382b821d3c01"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const db = firebase.firestore();
const pollText_ref = db.collection("pollList");

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

async function showPollsInTable() {

    console.log('showing polls from database');

    const table_body = document.getElementById('pollList');
    table_body.innerHTML = '';

    const collection = 'pollText';
    const items = await pollText_ref.get();
    const Poll_list = items.docs.map((item) => ({ docId: item.id, ...item.data() }))
    //  console.log(Poll_list);
    Poll_list.map((item) => {
        addPoll(item["pollText"], item["voteCount"], item["docId"]);
    })
    console.log("Showing polls finish")
}

function clearForm() {
    document.getElementById("yw").value = "";
    document.getElementById("pn").value = "";
}

async function addPoll(text = document.getElementById("yw").value + " - " + document.getElementById("pn").value, vote=0, docId=0) {
    // console.log("docId ="+docId);
    const pollList = document.getElementById("pollList");
    const pollelement = document.createElement("div");
    pollelement.className = "pollelement";
    pollelement.setAttribute("data-worth", 0);
    pollelement.onclick = function() {
        voteCount.innerText++;
        pollelement.setAttribute("data-worth", voteCount.innerText);
        sortPoll();
        updateTopThree();
        updateItem(docId,text,voteCount.innerText);
     };
    const pollTable = document.createElement("table");
    pollTable.className = "poll-table"
    const tr = document.createElement("tr");
    const pollText = document.createElement("td");
    pollText.className = "poll-text"
    pollText.innerText = text;
    const voteCount = document.createElement("td");
    voteCount.className = "vote-count"
    voteCount.innerText = vote;
    pollList.appendChild(pollelement);
    pollelement.appendChild(pollTable);
    pollTable.appendChild(tr);
    tr.appendChild(pollText);
    tr.appendChild(voteCount);
}
async function deleteAllItem() {
  //Not finish

}

async function updateItem(docId,newText,newVote) {
    console.log('updateItem');
    console.log('Update '+docId)
    const poll_ref = await db.doc(`pollList/${docId}`);

    let book_instance = await poll_ref.get()
    book_instance = book_instance.data();
    
    let pollText = newText;
    let voteCount = newVote;

    poll_ref.set({
        pollText: pollText ? pollText : book_instance.pollText,
        voteCount: voteCount ? voteCount : book_instance.voteCount,
    }).then(function () {
        console.log('updateItem success')
        showPollsInTable();
    }).catch(function (error) {
        console.log('failed', error)
    })
}

function addItem(text = document.getElementById("yw").value + " - " + document.getElementById("pn").value, vote=0) {
    console.log("ADDITEM");
    const pollText = text;
    const voteCount = vote;

    pollText_ref.add({
        pollText,
        voteCount,
    })
}


function sortPoll() {
    const container = document.getElementById("pollList");
    Array.from(container.children)
        .sort((a, b) => b.dataset.worth - a.dataset.worth)
        .forEach(element => container.appendChild(element));
}

function updateTopThree() {
    const myElement = document.getElementById('pollList');
    for (let i = 0; i < myElement.children.length; i++) {
        if (i == 0) {
            document.getElementById("firText").innerText =
                myElement.getElementsByClassName('pollelement')[0].getElementsByClassName('poll-text')[0].innerText;
            document.getElementById("firVote").innerText =
                myElement.getElementsByClassName('pollelement')[0].getElementsByClassName('vote-count')[0].innerText;
        } else if (i == 1) {
            document.getElementById("secText").innerText =
                myElement.getElementsByClassName('pollelement')[1].getElementsByClassName('poll-text')[0].innerText;
            document.getElementById("secVote").innerText =
                myElement.getElementsByClassName('pollelement')[1].getElementsByClassName('vote-count')[0].innerText;
        } else if (i == 2) {
            document.getElementById("triText").innerText =
                myElement.getElementsByClassName('pollelement')[2].getElementsByClassName('poll-text')[0].innerText;
            document.getElementById("triVote").innerText =
                myElement.getElementsByClassName('pollelement')[2].getElementsByClassName('vote-count')[0].innerText;
        }
    }
}