//BOARD
let board;
let boardWidth = 700;
let boardHeight = 280;
let context;

//BIRD
let birdWidth = 70; 
let birdHeight = 40;
let birdX = boardWidth/8;
let birdY = boardHeight/2.5;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight

}

//PIPES
let pipeArr = [];
let pipeWidth = 160;
let pipeHeight = 200;
pipeX = boardWidth;
pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//PHYSICS
let velocityX = -4;
let velocityY = 0; //bird jump speed
let gravity = 0.4;

let gameOver = false;
let score = 0;

let resetbtn = document.querySelector("#reset");

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //context.fillStyle = "green";
    //context.fillRect(bird.x, bird.y, bird.width, bird.height)

    //load bird image
    birdImg = new Image();
    birdImg.src = "file.png";
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    //load pipe image
    topPipeImg = new Image();
    topPipeImg.src = "stone_top.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "stone_bottom.png";

    setInterval(placePipes, 1600);// every 1.6s a pipe is placed
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveBird);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board.height);
    //Bird
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    if(bird.y>board.height){
        gameOver = true;

    }

    //Pipe
    for (let i = 0; i<pipeArr.length; i++){
        let pipe = pipeArr[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        /*if (detectCollision(bird, pipe)){
            gameOver = true;
        }*/

        if (!pipe.passed && pipe.x + pipe.width < bird.x) {
            pipe.passed = true;
            score += 0.5; // each pipe passed increases score by 0.5, so both pipes together increase the score by 1
        }
    }

    // Remove pipes that are out of view
    pipeArr = pipeArr.filter(pipe => pipe.x + pipe.width > 0);

    //Score
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("SCORE: " + Math.floor(score), 10, 20);

    if(gameOver){
        context.font = "35px Arial";
        context.fillText("GAME OVER", 250, 100);
    }
}

function placePipes() {
    if(gameOver){
        return;
    }
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openSpace = board.height/4;
    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height: pipeHeight,
        passed : false
    }

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openSpace,
        width : pipeWidth,
        height: pipeHeight,
        passed : false
    }

    pipeArr.push(topPipe); //will add a new pipe to the array
    pipeArr.push(bottomPipe);
}

function moveBird(e) {
    if(e.code === "space" || e.code === "ArrowUp" || e.code === "KeyX") {
        velocityY = -6;
    }
}


const resetGame = () => {
    bird.y = birdY;
    pipeArr = [];
    score = 0;
    gameOver = false;

}
resetbtn.addEventListener("click", resetGame);



/*function detectCollision(b, p) {
    console.log(`Bird: (${b.x}, ${b.y}, ${b.width}, ${b.height})`);
    console.log(`Pipe: (${p.x}, ${p.y}, ${p.width}, ${p.height})`);
    return  b.x < p.x + p.width && 
            b.x + b.width > p.x && 
            b.y < p.y +p.height && 
            b.y + b.height > p.y;
}*/