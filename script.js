let timeInSeconds = 25 * 60; // 25 min
let timeInSecondsBreak = 5 * 60; // 5 min

const workTimerElement = document.getElementById("workTimer");
const breakTimerElement = document.getElementById("breakTimer");
const workEndSound = new Audio('Order-up-bell-sound-effect.mp3');


let workInterval;
let breakInterval;

function start() {
    clearInterval(workInterval);
    clearInterval(breakInterval);

    document.getElementById("startBtn").disabled = true;
    document.getElementById("resetBtn").disabled = false;
    document.getElementById("stopBtn").disabled = false;

    if (document.getElementById("timeStatus").textContent === "Break Time!") {
        startBreak();
    } else {
        startWork();
    }
}

function startWork() {
    document.getElementById("workTimer").style.display = "block";
    document.getElementById("breakTimer").style.display = "none";
    document.getElementById("timeStatus").textContent = "Work Time";

    workInterval = setInterval(() => {
        if (timeInSeconds <= 0) {
            clearInterval(workInterval);
            workEndSound.play();
            breakTime();
        } else {
            timeInSeconds--;
            update();
        }
    }, 1000);
}

function startBreak() {
    document.getElementById("workTimer").style.display = "none";
    document.getElementById("breakTimer").style.display = "block";

    breakInterval = setInterval(() => {
        if (timeInSecondsBreak <= 0) {
            clearInterval(breakInterval);
            workEndSound.play();
            reset();
        } else {
            timeInSecondsBreak--;
            breakUpdate();
        }
    }, 1000);
}

function reset() {
    clearInterval(workInterval);
    clearInterval(breakInterval);

    timeInSeconds = 25 * 60;
    timeInSecondsBreak = 5 * 60;

    update();
    breakUpdate();

    document.getElementById("startBtn").disabled = false;
    document.getElementById("resetBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;

    document.getElementById("workTimer").style.display = "block";
    document.getElementById("breakTimer").style.display = "none";
    document.getElementById("timeStatus").textContent = "Work Time";
}

function stop() {
    clearInterval(workInterval);
    clearInterval(breakInterval);
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
}

function update() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    workTimerElement.textContent = formattedTime;
}

function breakUpdate() {
    const minutes = Math.floor(timeInSecondsBreak / 60);
    const seconds = timeInSecondsBreak % 60;
    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    breakTimerElement.textContent = formattedTime;
}

function breakTime() {
    document.getElementById("timeStatus").textContent = "Break Time!";
    start();
}
