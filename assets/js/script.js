/**
 * Theese nested functions adds active class and removes target class.
 * And on timeout it removes active class and adds target class again.
 */
let time = 950
var startTime;
 function unMask() {
    let targetActive = document.getElementsByClassName("target")[Math.floor(Math.random()*40)]
    if(targetActive.classList !== "active"){
        targetActive.classList.add("active")
        targetActive.classList.remove("target")
        targetActive.addEventListener('click', onHit);
        if (Date.now() - startTime > 60000){
            stopGame();
}
if (1){
    return setTimeout(mask, time);
}
}
function mask (){
    if(targetActive.classList !== "target"){
    targetActive.classList.remove("active")
    targetActive.classList.add("target")
    targetActive.removeEventListener('click', onHit);
}}}
/**
 * Sets interval on unMask() to start the game.
 */
 function startUnMask(func, interval) {
    func();
    globalThis.delay = setInterval(func, interval);
    startTime = Date.now();
}
/**
 * Is called upon clicking start button
 * Calls startUnMask()
 */
function startSetInterval() {
    startUnMask(unMask, 1000);
    document.getElementById("score").innerHTML = 0
}
/**
 * Function to clearinterval and stop game from running.
*/
function stopGame(){
    clearInterval(globalThis.delay)
    clearTimeout
}
/**
 * Removes active class and makes it invisble again. And calls function,
 * scoreIncrement().
 * Also takes time off the timeout to increase difficulty on target hit. 
 */
 function onHit (){
    this.classList.remove("active")
    this.classList.add("target")
    scoreIncrement();
    time = time-200
}
/**
 * Takes old score and adds 1 for each time onHit() is called.
 * Borrowed from love-maths project Coding Institute
 */
function scoreIncrement() {
    let oldscore = parseInt(document.getElementById("score").innerHTML)
    document.getElementById("score").innerHTML = ++oldscore;
}


