const bird = document.getElementById('bird');
const pipe = document.getElementById('pipe');
const pipeTop = document.getElementById('pipeTop');
const scoreDisplay = document.getElementById('score');
const menu = document.getElementById('menu');
const gameOverMenu = document.getElementById('gameOverMenu');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const currentScoreDisplay = document.getElementById('currentScore');
const highScoreDisplay = document.getElementById('highScore');

let birdTop = 250;
let score = 0;
let highScore = 0;
let gravity = 2;
let jump = -20;
let gameStarted = false;
let pipeSpeed = 2.5;
let pipeHeightGap = 150;
let pipePassed = false;

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

// Add touch support for mobile devices
document.addEventListener('keydown', jumpBird);
document.addEventListener('touchstart', jumpBird); // Touch event for mobile

function jumpBird() {
    if (gameStarted) birdTop += jump;
}

function startGame() {
    menu.style.display = 'none';
    gameOverMenu.style.display = 'none';
    bird.style.display = 'block';
    pipe.style.display = 'block';
    pipeTop.style.display = 'block';
    scoreDisplay.style.display = 'block';
    gameStarted = true;
    resetGame();
    gameLoop();
}

function gameLoop() {
    if (!gameStarted) return;

    birdTop += gravity;
    bird.style.top = birdTop + 'px';

    let pipeLeft = parseInt(pipe.style.left) || 400;
    pipeLeft -= pipeSpeed;

    if (pipeLeft <= -60) {
        pipeLeft = 400;
        resetPipes();
        pipePassed = false;
    }

    pipe.style.left = pipeLeft + 'px';
    pipeTop.style.left = pipeLeft + 'px';

    const birdRect = bird.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();
    const pipeTopRect = pipeTop.getBoundingClientRect();

    if (
        birdRect.top <= 0 ||
        birdRect.bottom >= window.innerHeight ||
        (birdRect.left < pipeRect.right && birdRect.right > pipeRect.left &&
            (birdRect.bottom > pipeRect.top || birdRect.top < pipeTopRect.bottom))
    ) {
        endGame();
        return;
    }

    if (pipeLeft < 50 && !pipePassed) {
        score++;
        scoreDisplay.textContent = score;
        pipePassed = true;
    }

    requestAnimationFrame(gameLoop);
}

function endGame() {
    gameStarted = false;
    bird.style.display = 'none';
    pipe.style.display = 'none';
    pipeTop.style.display = 'none';
    scoreDisplay.style.display = 'none';
    gameOverMenu.style.display = 'flex';
    
    currentScoreDisplay.textContent = score;
    
    if (score > highScore) {
        highScore = score;
    }
    highScoreDisplay.textContent = highScore;
}

function resetGame() {
    birdTop = window.innerHeight / 2 - 15; // Centers the bird
    score = 0;
    scoreDisplay.textContent = score;
    pipe.style.left = '400px';
    pipeTop.style.left = '400px';
    resetPipes();
}

function resetPipes() {
    let pipeHeight = Math.floor(Math.random() * 200) + 150;
    pipe.style.height = (window.innerHeight - pipeHeightGap - pipeHeight) + 'px';
    pipeTop.style.height = pipeHeight + 'px';
}
