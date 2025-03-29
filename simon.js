let btn = document.querySelectorAll(".btn");
let h2 = document.querySelector("h2");
let body = document.querySelector("body");
let btn_status = true;

let game_seq = [];
let user_seq = [] ;

let started = false;
let level = 0;
let highestScore = 0;

document.addEventListener("keypress",function(){
    if(started == false){
        started = true;

        levelUp();
    }
})

function gameFlash(randNum){
    btn[randNum].classList.add('flash');
    setTimeout(()=>{
        btn[randNum].classList.toggle('flash');
    },250);

    let id = btn[randNum].id;
    game_seq.push(id);
    console.log("game sequence: ",game_seq);
}

for(let i=0;i<btn.length;i++){
    btn[i].addEventListener("click",btnPress);
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    let id = btn.id;
    user_seq.push(id);
    console.log("user sequence: ",user_seq);

    let index = user_seq.length-1;
    checkSeq(index);
}

function userFlash(btn){
    btn.classList.add('flash');
    setTimeout(()=>{
        btn.classList.toggle('flash');
    },250);
}

function levelUp(){
    level++;
    user_seq = [];

    let randNum = Math.floor(Math.random()*4);
    gameFlash(randNum);

    h2.innerText = `Level ${level}`;
}
function checkSeq(index){
    if(user_seq[index] == game_seq[index]){
        if(user_seq.length == game_seq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        if(level>highestScore){
            highestScore = level;
        }
        h2.innerHTML = `Game Over! Your Score is ${level} <br> Your Highest Score was ${highestScore} <br> Press any key to start.`;
        body.classList.add('changeBgColor');
        setTimeout(()=>{
            body.classList.remove('changeBgColor');
        },250);
        reset();
    }
}
function reset(){
    started = false;
    user_seq = [];
    game_seq = [];
    level = 0;
}


