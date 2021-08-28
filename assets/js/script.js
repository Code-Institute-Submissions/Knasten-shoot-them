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
}
function mask (){
    if(targetActive.classList !== "target"){
    targetActive.classList.remove("active")
    targetActive.classList.add("target")
    targetActive.removeEventListener('click', onHit);
}}}



