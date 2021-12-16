let time = 950;
var startTime;
var delay;
var gameStarted = false;
let startBtn = document.getElementById("start")
let stopBtn = document.getElementById("stop")

/**
 * Theese nested functions adds active class and removes target class.
 * And on timeout it removes active class and adds target class again.
 */
function unMask() {
    let totalTargets = document.getElementsByClassName("target").length
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
}

/**
 * Is called upon clicking start button
 * Calls startUnMask()
 */
function startSetInterval() {
    if (gameStarted != true){
        startUnMask(unMask, 1000);
        document.getElementById("score").innerHTML = 0;
        startBtn.classList.add("gray")
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
    startBtn.classList.remove("gray")
    startBtn.classList.add('purple')
    stopBtn.classList.remove("red")
    stopBtn.classList.add('gray')
    gameStarted = false;
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