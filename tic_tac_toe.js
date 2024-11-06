let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count=0
let turnO = true;

const winpatterns = [ 
    [0, 1, 2], 
    [0, 3, 6], 
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6], 
    [2, 5, 8],
    [3, 4, 5], 
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO === true){
            box.innerText = "O"
            turnO = false;
        }
        else {
            box.innerText = "X"
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkwinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    })
})

const gameDraw = () => {
    msg.innerText = "The Game Was A Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkwinner = () => {
    for(let pattern of winpatterns){
        //console.log(pattern[0], pattern[1], pattern[2])
       // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText)
       let pos1 = boxes[pattern[0]].innerText;
       let pos2 = boxes[pattern[1]].innerText;
       let pos3 = boxes[pattern[2]].innerText;

       if(pos1 != "" && pos2 != "" && pos3 != ""){
        if(pos1===pos2 && pos2==pos3) {
            winner=true;
            console.log("winner is", pos1);
            disableBoxes();
            showWinner(pos1);

        }
       }
    }
}



const showWinner = (winner) => {
   msg.innerText = `Congratulations!! The Winner Is ${winner}`;
   msgContainer.classList.remove("hide");
}

const disableBoxes = () => {
    for(box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}


const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;

}
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);

