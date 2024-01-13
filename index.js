let timer;
let startTime;
let isRunning = false;
let lapTimes = [];

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - (lapTimes.reduce((acc, lap) => acc + lap, 0) || 0);
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}

function pauseStopwatch() {
    clearInterval(timer);
    isRunning = false;
}

function resetStopwatch() {
    pauseStopwatch();
    lapTimes = [];
    updateDisplay();
}

function recordLap() {
    if (isRunning) {
        lapTimes.push(Date.now() - startTime);
        displayLapTimes();
    }
}

function updateDisplay() {
    document.querySelector('.display').textContent = formatTime(isRunning ? Date.now() - startTime : 0);
}

function displayLapTimes() {
    document.querySelector('.lap-times').innerHTML = lapTimes.map((lap, index) =>
        `<li>Lap ${index + 1}: ${formatTime(lap)}</li>`
    ).join('');
}

function formatTime(milliseconds) {
    const padZero = (num) => (num < 10 ? `0${num}` : num);
    const totalSeconds = Math.floor(milliseconds / 1000);

    return `${padZero(Math.floor(totalSeconds / 60))}:${padZero(totalSeconds % 60)}:${padZero(Math.floor((milliseconds % 1000) / 10))}`;
}
