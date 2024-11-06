const hangImage = document.querySelector("#hang-box img");
const keyboard = document.querySelector("#keyboard");
const wordDisplay = document.querySelector("#word-display");
const score = document.querySelector("#score");
const lostMsg = document.querySelector(".pop-up1");
const winMsg = document.querySelector(".pop-up2");
const container = document.querySelector(".container");
const msg1 = document.querySelector("#correct-word1");
const msg2 = document.querySelector("#correct-word2");
const playBtn = document.querySelector(".tryAgain");


let currWord, correctLetters = [], wrongGuessCount = 0;
let maxGuess = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    wordDisplay.innerHTML = currWord.split("").map(() => `<li class="letter"></li>`).join("");
    lostMsg.classList.add("hide");
    winMsg.classList.add("hide");
    container.classList.remove("hide");
    hangImage.src = `images/hangman-${wrongGuessCount}.svg`;
    score.innerText = `${wrongGuessCount} / ${maxGuess}`;
    keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false);
}

const gameOver = (isvictory) => {
    lostMsg.classList.remove("hide");
    container.classList.add("hide");
    msg1.innerText = `The correct word was ${currWord}`;
}

const gameWon = (isvictory) => {
    winMsg.classList.remove("hide");
    container.classList.add("hide");
    msg2.innerText = `${currWord} is the right word!`;
}

const getRandom = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currWord = word;
    console.log(word);
    score.innerText = "0/" + maxGuess;
    document.querySelector("#hint").innerText = "HINT: "+hint;
    resetGame();
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const intGame = (button, clickedLetter) => {
    if(currWord.includes(clickedLetter)) {
        [...currWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("letter-guessed");

            }
        })
    }
    else {
        wrongGuessCount++;
        hangImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    score.innerText = `${wrongGuessCount} / ${maxGuess}`;

    if(wrongGuessCount === maxGuess) return gameOver(true);
    if(correctLetters.length === currWord.length) return gameWon(true);
}

for(let i=97; i<=122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener("click", e => intGame(e.target, String.fromCharCode(i)))
}

playBtn.addEventListener("click", getRandom);
getRandom();