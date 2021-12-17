window.onload = () => {
    createTargets();
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
    }

function createTargets(){
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    let i = 0

    if (screenWidth <= 320){
        while(i < 35){
            let target = document.createElement('div')
            let gameWindow = document.getElementById('game-row')
            target.setAttribute('class', 'rounded-circle mobile-target target px-3 ms-3 invisible d-inline-flex');
            gameWindow.appendChild(target)
            i++;
        }
    } else if (screenWidth >= 321 && screenWidth <= 468){
        while(i < 64){
            let target = document.createElement('div')
            let gameWindow = document.getElementById('game-row')
            target.setAttribute('class', 'rounded-circle mobile-target target px-3 ms-3 d-inline-flex invisible');
            gameWindow.appendChild(target)
            i++;
        }
    } else if (screenWidth >= 470 && screenWidth <= 776){
        while(i < 60){
            let target = document.createElement('div')
            let gameWindow = document.getElementById('game-row')
            target.setAttribute('class', 'rounded-circle mobile-target target px-3 ms-3 d-inline-flex invisible');
            gameWindow.appendChild(target)
            i++;
        }
    } else if (screenWidth >= 777 && screenWidth <= 999){
        while(i < 110){
            let target = document.createElement('div')
            let gameWindow = document.getElementById('game-row')
            target.setAttribute('class', 'rounded-circle mobile-target target px-3 ms-3 d-inline-flex invisible');
            gameWindow.appendChild(target)
            i++;
        }
    } else if (screenWidth >= 1000 && screenWidth <= 1197){
        if(screenHeight >= 851){
            while(i < 130){
                let target = document.createElement('div')
                let gameWindow = document.getElementById('game-row')
                target.setAttribute('class', 'rounded-circle target px-3 ms-3 d-inline-flex invisible');
                gameWindow.appendChild(target)
                i++;
            }
        } else {
            while(i < 75){
                let target = document.createElement('div')
                let gameWindow = document.getElementById('game-row')
                target.setAttribute('class', 'rounded-circle target px-3 ms-3 d-inline-flex invisible');
                gameWindow.appendChild(target)
                i++;
            }
        }
    } else {
        if(screenHeight >= 851){   
            while(i < 171){
                let target = document.createElement('div')
                let gameWindow = document.getElementById('game-row')
                target.setAttribute('class', 'rounded-circle target px-3 ms-3 d-inline-flex invisible');
                gameWindow.appendChild(target)
                i++;
            }
        } else {
            while(i < 130){
                let target = document.createElement('div')
                let gameWindow = document.getElementById('game-row')
                target.setAttribute('class', 'rounded-circle target px-3 ms-3 d-inline-flex invisible');
                gameWindow.appendChild(target)
                i++;
            }
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
        if (Date.now() - startTime > 60300) {
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
        }
    }
}

/**
 * Sets interval on unMask() to start the game.
 */
function startUnMask(func, interval) {
    time = 950
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
        alert('Score points by hiting the red targets as they appear! You got 60 seconds.')
        startUnMask(unMask, 1000);
        document.getElementById("score").innerHTML = 0;
        disableEnableStartBtn(); // Make sure this is called before setting gameStarted to true
        disableEnableStopBtn(); // Make sure this is called before setting gameStarted to true
        gameStarted = true;
    } else{
        alert("You already have one started game. To start a new game, stop the current one first!")
    }
}

function disableEnableStartBtn(){
    if (gameStarted != true){
        startBtn.classList.remove("purple")
        startBtn.classList.add("gray")
        startBtn.disabled = true;
    } else {
        startBtn.classList.remove("gray")
        startBtn.classList.add('purple')
        startBtn.disabled = false;
    }
}

function disableEnableStopBtn(){
    if (gameStarted != true){
        stopBtn.classList.remove("gray")
        stopBtn.classList.add("red")
        stopBtn.disabled = false;
    } else {
        stopBtn.classList.remove("red")
        stopBtn.classList.add('gray')
        stopBtn.disabled = true;
    }
}

/**
 * Function to clearinterval and stop game from running.
 */
function stopGame() {
    if (gameStarted){
        showResults();
        clearInterval(delay);
        clearInterval(timer);
        disableEnableStartBtn(); // Call before changing gameStarted
        disableEnableStopBtn(); // Call before changing gameStarted
        gameStarted = false;
    }
}


function showResults(){
    let finalScore = parseInt(document.getElementById('score').innerHTML);
    let timeLeft = parseInt(document.getElementById('time-left').innerHTML);
    let time = 60 - timeLeft
    alert(`Congratulations you scored ${finalScore} in ${time} seconds!`)
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