let UserScore = 0;
let CompScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#your-score");
const compScorePara = document.querySelector("#comp-score");

const GenCompMove = () => {
    const options = ["rock", "paper", "scissors"]; 
    //rock, paper, scissors
    //math is a library in JS that has a method named random() which generates a number 
    const random = Math.floor(Math.random() * 3); //so that number ranges between 0-2
    return options[random];

}

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        UserScore++;
        userScorePara.innerText = UserScore;
        console.log("You Win !");
        msg.innerText = `YAY! You win your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else {
        CompScore++;
        compScorePara.innerText = CompScore;
        console.log("You Loose :(");
        msg.innerText = `Oh No! you loose ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "rgba(207, 35, 35, 0.875)";
    }
}

const PlayGame = (userChoice) => {
    console.log("User Choice = ", userChoice);
    //Generate computer choice - dividing functions into smaller functions: Modular programming
    const compChoice = GenCompMove()
    console.log("Computer Choice = ", compChoice);

    if(userChoice === compChoice) {
        console.log("Draw")
        msg.innerText = "It is a Draw. Play again";
        msg.style.backgroundColor = "rgb(132, 127, 211)";
    }
    else {
        let userWin = true;

        if (userChoice === "rock") {
            //comp = paper, scissors
            userWin = compChoice === "paper" ? false: true;
        }
        else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false: true;
        }
        else if(userChoice === "scissors") {
            userWin = compChoice === "rock" ? false: true;
        }
        showWinner(userWin, userChoice, compChoice);
    }

    
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        PlayGame(userChoice);
    })
})