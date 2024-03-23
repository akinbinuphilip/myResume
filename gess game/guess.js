let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector("#sub");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaning = document.querySelector(".lastResult");
const startOver = document.querySelector(".resultPress");
const LowOrHigh = document.querySelector(".lowOrHigh");
const notification_ele = document.querySelector(".notification");


const p = document.createElement("p");

let previousGuesses = [];
let numGuesses = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();

    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    show_notification("Please enter a valid number");
  } else if (guess < 1) {
    show_notification("Please enter a number greater than 1!");
  } else if (guess > 100) {
    show_notification("Please enter a number less than 100");
  } else {
    previousGuesses.push(guess);

    if (numGuesses === 11) {
      displayGuesses(guess);
      displayMessage(`Game Over.<br> <h1> Number Was ${randomNumber}</h1>`);
      endGame();
    } else {
      displayGuesses(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage("you guessed correctly");
    endGame();
  } else if (guess < randomNumber) {
    displayMessage("Too low! Try again");
  } else if (guess > randomNumber) {
    displayMessage("Too High! Try again");
  }
}

function displayGuesses(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess},`;
  numGuesses++;
  remaning.innerHTML = `${11 - numGuesses}`;
}

function displayMessage(message) {
  LowOrHigh.innerHTML = `<h1>${message}</h1>`;
}

function endGame() {
  userInput.value = " ";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = `<h1 id="newgame">Start New Game </h1>`;

  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGamebutton = document.querySelector("#newgame");
  newGamebutton.addEventListener("click", function () {
    randomNumber = parseInt(Math.random() * 100 + 1);
     previousGuesses = [];
     numGuesses = 1;
     numGuesses = 1;
     guessSlot.innerHTML = '';
     LowOrHigh.innerHTML = "";
     remaning.innerHTML =  `${11 - numGuesses}`
     userInput.removeAttribute("disabled");
     startOver.removeChild(p);
     playGame = true;
  });
}

//  SHOW A NOTIFIATIOBN
function show_notification(msg) {
  //CHANGE THE MESSAGE
  notification_ele.innerHTML = msg;
  // NOTIFICATION ENTER

  notification_ele.classList.add("notif-enter");

  // NOTIFICATION REMOVE
  setTimeout(() => {
    notification_ele.classList.remove("notif-enter");
  }, 2000);
}
