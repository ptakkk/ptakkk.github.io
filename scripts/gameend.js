let hasEnded = false;

function checkIfGameEnded() {
    return coinsArray.length == 0;
}

function endGame() {
    if (checkIfGameEnded() && !hasEnded) {
        let img = document.createElement("img");
        img.src = "resources/jerz.jpg";
        document.getElementById('endImg').appendChild(img);
        hasEnded = true;
        
    }
}
