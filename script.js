const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole, score;
let timeUp = false;

const randTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const randomHole = (holes) => {
    let hole = randTime(0, holes.length - 1);
    if (hole == lastHole) {
        console.log('Ah! na thats the same one bud');
        return randomHole(holes);
    }
    lastHole = hole;
    return holes[hole];
}

const peep = () => {
    const time = randTime(200, 700);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

const startGame = () => {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => {
        timeUp = true;
    }, 10000);
}

const bonk = (e) => {
    if(!e.isTrusted) return;
    score++;
    e.target.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));