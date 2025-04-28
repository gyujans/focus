let workTime = 50 * 60; // 50 minutes
let breakTime = 10 * 60; // 10 minutes
let isWork = true;
let timerInterval;
let timeLeft = workTime;

const timeDisplay = document.getElementById('time');
const timerLabel = document.getElementById('timer-label');

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (timerInterval) return; // Prevent multiple intervals

    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            isWork = !isWork;
            timeLeft = isWork ? workTime : breakTime;
            timerLabel.textContent = isWork ? "Work Time" : "Break Time";
            startTimer(); // Auto-start next session
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isWork = true;
    timeLeft = workTime;
    timerLabel.textContent = "Work Time";
    updateDisplay();
}

function customizeTimer() {
    const workInput = document.getElementById('workMinutes').value;
    const breakInput = document.getElementById('breakMinutes').value;

    if (workInput > 0) workTime = workInput * 60;
    if (breakInput > 0) breakTime = breakInput * 60;

    resetTimer();
}

// Initialize the display
updateDisplay();
