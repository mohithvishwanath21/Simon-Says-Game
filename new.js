let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;

const btns = ["yellow", "red", "purple", "green"];
const h2 = document.querySelector("h2");
const highScoreDisplay = document.getElementById("high-score");

// Display initial high score
highScoreDisplay.innerText = `High Score: ${highScore}`;

// Handle start button click
document.getElementById("start-button").addEventListener("click", function() {
    if (!started) {
        started = true;
        levelUp();
    }
});

document.getElementById("reset-button").addEventListener("click", resetGame);

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 300); // Faster flash duration
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 300); // Matches the faster flash
}

function wrongFlash() {
    document.body.style.animation = "backgroundFlash 0.5s ease-in-out";
    document.querySelectorAll(".btn").forEach((btn) => {
        btn.classList.add("wrong");
        setTimeout(() => btn.classList.remove("wrong"), 500);
    });
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    setTimeout(() => {
        let randomIndex = Math.floor(Math.random() * btns.length);
        let randomColor = btns[randomIndex];
        let randombtn = document.querySelector(`#${randomColor}`);
        gameSeq.push(randomColor);
        gameFlash(randombtn);
    }, 800); // Slightly faster interval between flashes
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 800); // Faster transition to the next level
        }
    } else {
        wrongFlash();
        h2.innerHTML = `Game Over! Your score: <b>${level}</b><br>Press the Start button to restart`;
        setTimeout(() => {
            document.body.style.animation = "";
        }, 500);
        updateHighScore(level);
        reset();
    }
}

function updateHighScore(score) {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.innerText = `High Score: ${highScore}`;
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach((btn) =>
    btn.addEventListener("click", btnPress)
);

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = "Press the Start button to start the game";
}

function resetGame() {
    reset(); // Reset the game
    highScoreDisplay.innerText = `High Score: ${highScore}`; // Keep high score intact
    document.body.style.animation = ""; // Remove any active animation
}

// Handle reset high score button click
document.getElementById("reset-high-score").addEventListener("click", function() {
    highScore = 0; // Reset high score to 0
    localStorage.setItem("highScore", highScore); // Update localStorage
    highScoreDisplay.innerText = `High Score: ${highScore}`; // Update the display
});
