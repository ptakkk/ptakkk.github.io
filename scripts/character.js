// document.addEventListener("keydown", (Event => {
//     let element = document.querySelector('div');
//     let translateValue = window.getComputedStyle(element).getPropertyValue("translate");
//     console.log(translateValue);
//     if (Event.key == "ArrowUp") {
//         document.getElementById("character").style.transform = `translateY( ${translateValue} -10px)`;
//     } else if (Event.key == "ArrowDown") {
//         document.getElementById("character").style.transform = "translateY(10px)";
//     } else if (Event.key == "ArrowLeft") {
//         document.getElementById("character").style.transform = "translateX(-10px)";
//     } else if (Event.key == "ArrowRight") {
//         document.getElementById("character").style.transform = "translateX(10px)";
//     }
// }))


let character = document.getElementById("character");

const pressedKeys = {};
// document.addEventListener('keydown', function (e) {
//     pressedKeys.unshift(e);
//     console.log(pressedKeys);
// });

let animationRunning = false;

window.onkeydown = function (e) {
    pressedKeys[e.key] = true;
    if (!animationRunning) {
        animationRunning = true;
        requestAnimationFrame(controls);
    }
    //console.log(pressedKeys);                        to wazne
};

window.onkeyup = function (e) {
    pressedKeys[e.key] = false;
};

let firstRun = true;

function controls() {
    
    let translateValueMatrix = window.getComputedStyle(character).getPropertyValue("transform");

    let currentTranslateValueX = 0;
    let currentTranslateValueY = 0;

    // console.log(translateValueMatrix);
    let splitTranslateMatrix = translateValueMatrix.split(', ');
    currentTranslateValueX = parseInt(splitTranslateMatrix[4]);
    currentTranslateValueY = parseInt(splitTranslateMatrix[5]);

    // console.log('X: ' + currentTranslateValueX);
    // console.log('Y: ' + currentTranslateValueY);

    if (pressedKeys['ArrowRight']) {
        character.style.transform = `translate(${currentTranslateValueX +10}px, ${currentTranslateValueY}px)`;
    }
    if (pressedKeys['ArrowLeft']) {
        character.style.transform = `translate(${currentTranslateValueX -10}px, ${currentTranslateValueY}px)`;
    }
    if (pressedKeys['ArrowDown']) {
        character.style.transform = `translate(${currentTranslateValueX}px, ${currentTranslateValueY +10}px)`;
    }
    if (pressedKeys['ArrowUp']) {
        character.style.transform = `translate(${currentTranslateValueX}px, ${currentTranslateValueY -10}px)`;
    }

    getCharacterPosition();
    let prevScore = coinsArray.length;
    checkCoinsCollision();
    let nextScore = coinsArray.length;

    if (firstRun) {
        createScoreText();
        firstRun = false;
        if(coinsArray.length == 0) {
            deleteScoreText();

        }
    }
    if (nextScore < prevScore) {
        updatePoints();
    }

    endGame();
    
    requestAnimationFrame(controls);
};

// setInterval(function() {
//     controls(pressedKeys);

// }, 1000/30);


let characterPositionArray = [];

function getCharacterPosition() {
    let characterPosition = character.getBoundingClientRect();
    characterPositionArray = [characterPosition.left, characterPosition.right, characterPosition.top, characterPosition.bottom];
}

function createScoreText() {
    let score = document.getElementById('scoreDiv');
    let p = document.createElement('p');
    p.id = 'scoreText'
    let currentScore = coinsArray.length;

    let text = document.createTextNode(`Liczba pieniążków do zebrania: ${currentScore}`);
    p.appendChild(text);
    score.appendChild(p);
}
function deleteScoreText() {
    return;
}

function updatePoints() {
    let scoreText = document.getElementById('scoreText');
    let currentScore = coinsArray.length;
    scoreText.innerText = `Liczba pieniążków do zebrania: ${currentScore}`;
}
