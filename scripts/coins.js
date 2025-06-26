const screenHeight = window.innerHeight - 100;
const screenWidth = window.innerWidth - 100;


console.log(screenHeight);

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function createCoins () {

    for (let i = 0; i < 10 ;i++) {
        let coin = document.createElement('div');
        coin.classList.add('coin');
        coin.id = 'coin' + i;
        document.body.appendChild(coin);

        let randomValueX = getRandomNumber(screenWidth);
        let randomValueY = getRandomNumber(screenHeight);
        coin.style.transform = `translate(${randomValueX}px, ${randomValueY}px)`;
    }
}

createCoins();

let coinsArray = [];

function getCoinsArray() {

    for (let i = 0; i < 10; i++) {
        let coin = document.getElementById(`coin${i}`);
        coinsArray.push(coin);
    }
}

getCoinsArray();

function checkCoinsCollision() {

    let char = character.getBoundingClientRect();

    for (let i = 0; i < coinsArray.length; i++) {
        let coin = coinsArray[i].getBoundingClientRect();

        let overlap =
            char.left < coin.right &&
            char.right > coin.left &&
            char.top < coin.bottom &&
            char.bottom > coin.top;

        if (overlap) {
            console.log('Zebrany!');
            coinsArray[i].remove();
            coinsArray.splice(i, 1);
            i--;
        }
    }
}