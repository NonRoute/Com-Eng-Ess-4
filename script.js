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
    console.log(data.content);
    document.getElementById("yw").value = data.content;
    document.getElementById("pn").value = data.author;
}