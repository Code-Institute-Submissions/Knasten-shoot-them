window.onload = (event) => {
    createTargets();
    console.log('Page successfully loaded, targets should been added based on size')
}
let time = 950;
var startTime;
var delay;
var gameStarted = false;
let startBtn = document.getElementById("start")
let stopBtn = document.getElementById("stop")

function displayTime() {
    var timeLeft = Math.round((startTime + 60000 - Date.now()) / 1000);
    let showTime = document.getElementById('time-left');
    showTime.innerHTML = timeLeft;
    console.log('Time should change')
}

function createTargets(){
    var screenWidth = window.screen.width;
    let i = 0

    if (screenWidth <= 767){
        while(i < 28){
            let target = document.createElement('div')
            let gameWindow = document.getElementById('game-row')
            target.setAttribute('class', 'rounded-circle mobile-target target px-3 ms-3 invisible d-inline-flex');
            gameWindow.appendChild(target)
            i++;
        }
    } else if (screenWidth >= 768 && screenWidth <= 899){
        while(i < 28){
            let target = document.createElement('div')
            let gameWindow = document.getElementById('game-row')
            target.setAttribute('class', 'rounded-circle target px-3 ms-3 d-inline-flex invisible');
            gameWindow.appendChild(target)
            i++;
        }
    } else if (screenWidth >= 900 && screenWidth <= 1197){
        while(i < 130){
            let target = document.createElement('div')
            let gameWindow = document.getElementById('game-row')
            target.setAttribute('class', 'rounded-circle target px-3 ms-3 d-inline-flex invisible');
            gameWindow.appendChild(target)
            i++;
        }
    } else {
        while(i < 171){
            let target = document.createElement('div')
            let gameWindow = document.getElementById('game-row')
            target.setAttribute('class', 'rounded-circle target px-3 ms-3 d-inline-flex invisible');
            gameWindow.appendChild(target)
            i++;
        }
    }
}


/**
 * Theese nested functions adds active class and removes target class.
 * And on timeout it removes active class and adds target class again.
 */
function unMask() {
    let totalTargets = document.getElementsByClassName("target").length
    console.log(totalTargets)
    let targetActive = document.getElementsByClassName("target")[Math.floor(Math.random() * totalTargets)];
    if (targetActive.classList !== "visible") {
        targetActive.classList.add("visible");
        targetActive.classList.remove("invisible");
        targetActive.addEventListener('click', onHit);
        if (Date.now() - startTime > 60000) {
            stopGame();
        }
        if (1) {
            return setTimeout(mask, time);
        }
    }

    function mask() {
        if (targetActive.classList !== "invisible") {
            targetActive.classList.remove("visible");
            targetActive.classList.add("invisible");
            targetActive.removeEventListener('click', onHit);
        } else {
            console.log("Target was already invisible!")
        }
    }
}

/**
 * Sets interval on unMask() to start the game.
 */
function startUnMask(func, interval) {
    func();
    delay = setInterval(func, interval);
    startTime = Date.now();
    timer = setInterval(displayTime, 1000);
}

/**
 * Is called upon clicking start button
 * Calls startUnMask()
 */
function startSetInterval() {
    if (gameStarted != true){
        startUnMask(unMask, 1000);
        document.getElementById("score").innerHTML = 0;
        startBtn.classList.remove("purple")
        startBtn.classList.add("gray")
        stopBtn.classList.add("gray")
        stopBtn.classList.add("red")
        gameStarted = true;
        console.log('new round')
    } else{
        alert("You already have one started game. To start a new game, stop the current one first!")
    }
}

/**
 * Function to clearinterval and stop game from running.
 */
function stopGame() {
    clearInterval(delay);
    clearInterval(timer);
    gameStarted = false;
    resetClasses();
    showResults();
}

/**
 * Help function for stopGame
 */
function resetClasses(){
    startBtn.classList.remove("gray")
    startBtn.classList.add('purple')
    stopBtn.classList.remove("red")
    stopBtn.classList.add('gray')
}

function showResults(){
    let finalScore = parseInt(document.getElementById('score').innerHTML);
    alert(`Congratulations you scored ${finalScore}!`)
}

/**
 * Removes active class and makes it invisble again. And calls function,
 * scoreIncrement().
 * Also takes time off the timeout to increase difficulty on target hit. 
 */
function onHit() {
    this.classList.remove("visible");
    this.classList.add("invisible");
    scoreIncrement();
    time = time - 10;
}

/**
 * Takes old score and adds 1 for each time onHit() is called.
 * Borrowed from love-maths project Coding Institute
 */
function scoreIncrement() {
    let oldscore = parseInt(document.getElementById("score").innerHTML);
    document.getElementById("score").innerHTML = ++oldscore;
}