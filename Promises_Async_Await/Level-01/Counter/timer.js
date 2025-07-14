let timer = 0;
let isRunning = false;
let isPaused = false;

const timeEl = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const resetBtn = document.getElementById('resetBtn');

function updateCounter() {
    timeEl.textContent = timer;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateTimer() {
    if (isPaused || !isRunning) {
        return Promise.resolve();
    }

    return delay(1000).then(() => {
        if (!isPaused) {
            timer++;
            updateCounter();
        }
        return updateTimer();
    });
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isPaused = false;
        isRunning = true;
        updateTimer();
    }
});

pauseBtn.addEventListener('click', () => {
    isPaused = true;
});


resumeBtn.addEventListener('click', () => {
    if (isPaused || !isRunning) {
        isPaused = false;
        isRunning = true;
        updateTimer();
    }
});

resetBtn.addEventListener('click', () => {
    isPaused = true;
    isRunning = false;
    timer = 0;
    updateCounter();
});