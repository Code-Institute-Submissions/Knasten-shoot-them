/**
 * Theese nested functions adds active class and removes target class.
 * And on timeout it removes active class and adds target class again.
 */
 function unMask() {
    let targetActive = document.getElementsByClassName("target")[Math.floor(Math.random()*40)]
    if(targetActive.classList !== "active"){
        targetActive.classList.add("active")
        targetActive.classList.remove("target")
        targetActive.addEventListener('click', onHit);
        if (Date.now() - startTime > 60000){
            stopGame();
}
}
function mask (){
    if(targetActive.classList !== "target"){
    targetActive.classList.remove("active")
    targetActive.classList.add("target")
    targetActive.removeEventListener('click', onHit);
}}}
/**
 * Function to clearinterval and stop game from running.
*/
function stopGame(){
    clearInterval(globalThis.delay)
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
    time = time-10
}
/**
 * Takes old score and adds 1 for each time onHit() is called.
 * Borrowed from love-maths project Coding Institute
 */
function scoreIncrement() {
    let oldscore = parseInt(document.getElementById("score").innerHTML)
    document.getElementById("score").innerHTML = ++oldscore;
}


