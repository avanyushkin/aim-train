const startButton = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeLs = document.querySelector('#time-list');
const board = document.querySelector('#board');

let time = 0;

startButton.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeLs.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) { //проверяем тот элемент, по которому мы кликнули
        time = +event.target.getAttribute('data-time');
        screens[1].classList.add('up');
        startGame();
    }
});

let score = 0;

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score += 1;
        event.target.remove();
        createRandomCircle();
    }
})

const time_x = document.querySelector('#time');

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    if (time < 10) {
        time_x.innerHTML = `00:0${time}`;
    } else {
        time_x.innerHTML = `00:${time}`;
    }
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            time_x.innerHTML = `00:0${time}`;
        } else {
            time_x.innerHTML = `00:${current}`;
        }
    }
}

/*
function finishGame() {

}
*/

function createRandomCircle() {
    const circle = document.createElement('div');
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(30, width - 30);
    const y = getRandomNumber(30, height - 30);

    circle.classList.add('circle');
    circle.style.width = '30px';
    circle.style.height = '30px';

    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle);

}

function getRandomNumber(left, right) {

    return Math.round(Math.random() * (right - left) + left);
}


function finishGame() {
    time_x.parentNode.remove();
    board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span></h1>`;
}