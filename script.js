let timeInSeconds = 5;
let timeInSecondsBreak = 5*60;
const workTimerElement = document.getElementById("workTimer");
const breakTimerElement = document.getElementById("breakTimer");
let workInterval;
let breakInterval;

function start() {
    document.getElementById("startBtn").disabled = true;
    document.getElementById("resetBtn").disabled = false;
    document.getElementById("stopBtn").disabled = false;

    document.getElementById("workTimer").style.display = "block";
    document.getElementById("breakTimer").style.display = "none";
    document.getElementById("timeStatus").textContent = "Work Time";

    workInterval = setInterval(() => {
        if (timeInSeconds <= 0) {
            clearInterval(workInterval);
            document.getElementById("startBtn").disabled = false;
            document.getElementById("resetBtn").disabled = true;
            document.getElementById("stopBtn").disabled = true;
            alert("Work Session is Over!");
            breakTime();
        } 
        else {
            timeInSeconds--;
            update();
        }
    }, 1000)
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

function breakTime() {
    document.getElementById("timeStatus").textContent = "Break Time!";
    document.getElementById("workTimer").style.display = "none";
    document.getElementById("breakTimer").style.display = "block";

    breakInterval = setInterval(() => {
        if (timeInSecondsBreak <= 0) {
            clearInterval(breakInterval);
            alert("Break is over!");
            reset();
        } 
        else {
            timeInSecondsBreak--;
            breakUpdate();
        }
    }, 1000)
}

function breakUpdate() {
    const minutes = Math.floor(timeInSecondsBreak / 60);
    const seconds = timeInSecondsBreak % 60;
    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    breakTimerElement.textContent = formattedTime;
}