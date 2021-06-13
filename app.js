const playerImg = document.getElementById("plyr-img");
const computerImg = document.getElementById("comp-img");
const rockSelected = document.getElementById("rock");
const paperSelected = document.getElementById("paper");
const scissorsSelected = document.getElementById("scissors");
const won = document.getElementById("won");
const loose = document.getElementById("loose");
const tie = document.getElementById("tie");
const changeBestOfBtn = document.getElementById("bestof");
const bestOfText = document.getElementById("best");
const resultText = document.getElementById("result");

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";

let wonNumber = 0;
let looseNumber = 0;
let tieNumber = 0;
let choosenBestOf = 3;
let runCheck = 0;

const computerChoice = () => {
  const computer = Math.trunc(Math.random() * 100);
  if (computer < 34) {
    return ROCK;
  } else if (computer < 67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

//Resets Everything
const reset = (bestof = 3) => {
  wonNumber = 0;
  looseNumber = 0;
  tieNumber = 0;
  choosenBestOf = bestof;
  runCheck = 0;
  won.textContent = wonNumber;
  loose.textContent = looseNumber;
  tie.textContent = tieNumber;
  bestOfText.textContent = choosenBestOf;
  resultText.textContent = " ";
  computerImg.src = "images/crock.png";
  playerImg.src = "images/prock.png";
};

const winnerManager = (userSelText, userSel) => {
  runCheck += 1;
  const compSel = computerChoice();
  playerImg.src = userSel;
  if (compSel === ROCK) {
    computerImg.src = "images/crock.png";
  } else if (compSel === PAPER) {
    computerImg.src = "images/cpaper.png";
  } else if (compSel === SCISSORS) {
    computerImg.src = "images/cscissors.png";
  }
  //checking winner
  if (
    (userSelText === ROCK && compSel === SCISSORS) ||
    (userSelText === PAPER && compSel === ROCK) ||
    (userSelText === SCISSORS && compSel === PAPER)
  ) {
    wonNumber += 1;
    won.textContent = wonNumber;
    console.log("won");
  } else if (
    (compSel === ROCK && userSelText === SCISSORS) ||
    (compSel === PAPER && userSelText === ROCK) ||
    (compSel === SCISSORS && userSelText === PAPER)
  ) {
    looseNumber += 1;
    loose.textContent = looseNumber;
  } else if (userSelText === compSel) {
    tieNumber += 1;
    tie.textContent = tieNumber;
  }

  //checking best of and setting result
  if (runCheck === choosenBestOf) {
    if (wonNumber > looseNumber) {
      resultText.textContent = "You Won";
      console.log("You Won");
    } else if (wonNumber === looseNumber) {
      console.log("Game Was Tie");
      resultText.textContent = "It's A Tie";
    } else {
      console.log("You Loose");
      resultText.textContent = "You Loose";
    }
    setTimeout(reset, 3000);
  }
};

rockSelected.addEventListener(
  "click",
  winnerManager.bind(null, ROCK, "images/prock.png")
);
paperSelected.addEventListener(
  "click",
  winnerManager.bind(null, PAPER, "images/ppaper.png")
);
scissorsSelected.addEventListener(
  "click",
  winnerManager.bind(null, SCISSORS, "images/pscissors.png")
);
changeBestOfBtn.addEventListener("click", () => {
  let bestOfValue = parseInt(prompt("Enter any number", "3"));
  isNaN(bestOfValue) || bestOfValue < 3
    ? alert("It's Not A Number or you have choosen less than 3")
    : (choosenBestOf = bestOfValue);
  bestOfText.textContent = choosenBestOf;
  reset(choosenBestOf);
});