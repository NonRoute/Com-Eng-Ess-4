var firebaseConfig = {
    apiKey: "AIzaSyCjBtptZ3CwUG459P5HBISAo2ftAyN3q-Q",
    authDomain: "ess-group-4.firebaseapp.com",
    projectId: "ess-group-4",
    storageBucket: "ess-group-4.appspot.com",
    messagingSenderId: "729179491584",
    appId: "1:729179491584:web:ab2dd8c2680d761833b7e5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

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

const pollText_ref = db.collection("pollText");

async function showPollsInTable() {

    console.log('showing polls from database');

    const table_body = document.getElementById('pollList');
    table_body.innerHTML = '';
    const collection = 'pollText';
    const polls = await pollText_ref.get();

    const Poll_list = polls.docs.map((polls) => ({ docId: polls.id, ...polls.data() }))
    Poll_list.map((polls) => {
        table_body.innerHTML += `
        <div class="pollelement" data-worth="${poll["voteCount"]}">
            <table class="poll-table">
                <tr>
                    <th class="poll-text">"${poll["voteText"]}"</th>
                    <th class="vote-count">"${poll["voteCount"]}"</th>
                </tr>
            </table>
        </div>
        `
    })
    console.log(Poll_list)


    console.log("Showing Item...")
        //console.log(table_body.innerHTML.toString())
}

function clearForm() {
    document.getElementById("yw").value = "";
    document.getElementById("pn").value = "";
}

async function addPoll() {
    const pollList = document.getElementById("pollList");
    const pollelement = document.createElement("div");
    pollelement.className = "pollelement";
    pollelement.setAttribute("data-worth", 0);
    pollelement.onclick = function() {
        voteCount.innerText++;
        pollelement.setAttribute("data-worth", voteCount.innerText);
        sortPoll();
        updateTopThree();
        // showPollsInTable();
    };
    const pollTable = document.createElement("table");
    pollTable.className = "poll-table"
    const tr = document.createElement("tr");
    const pollText = document.createElement("td");
    pollText.className = "poll-text"
    pollText.innerText = document.getElementById("yw").value + " - " + document.getElementById("pn").value;
    const voteCount = document.createElement("td");
    voteCount.className = "vote-count"
    voteCount.innerText = 0;
    pollList.appendChild(pollelement);
    pollelement.appendChild(pollTable);
    pollTable.appendChild(tr);
    tr.appendChild(pollText);
    tr.appendChild(voteCount);

    await db.collection('pollList').add({
        pollName,
        pollText,
        count: 0,
    })
    console.log("Successfully add item to db!");
}

function sortPoll() {
    const container = document.getElementById("pollList");
    Array.from(container.children)
        .sort((a, b) => b.dataset.worth - a.dataset.worth)
        .forEach(element => container.appendChild(element));
}

function updateTopThree() {
    console.log("update top 3");
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