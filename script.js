const firstLayout = document.querySelector(".game-layout-one");

const secondLayout = document.querySelector(".game-players");

const startGameBtn = document.querySelector(".start-game");

const playerOneInput = document.querySelector("#player_one");

const playerTwoInput = document.querySelector("#player_two");

const requiredFieldMsg = document.querySelector(".required-field");

const battleStartBtn = document.querySelector(".go-for-the-battle");

const thirdLayout = document.querySelector(".game-layout-two");

const playerOneName = document.querySelector(".player-one-name");

const playerTwoName = document.querySelector(".player-two-name");

const playerTurn = document.querySelector(".player-turn");

const winnerMsg = document.querySelector(".winnerMsg");

const resetGame = document.querySelector(".reset");

const allBoxes = document.querySelectorAll(".gameBox");

let playerOne = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];

startGameBtn.addEventListener("click", () => {
  firstLayout.style.display = "none";
  thirdLayout.style.display = "none";
  secondLayout.style.display = "flex";
  playerOneInput.value = "";
  playerTwoInput.value = "";
});

battleStartBtn.addEventListener("click", () => {
  if (playerOneInput.value !== "" && playerTwoInput.value !== "") {
    secondLayout.style.display = "none";
    thirdLayout.style.display = "block";
    playerOneName.innerHTML = `${playerOneInput.value} : O `;
    playerTwoName.innerHTML = `${playerTwoInput.value} : X`;
    playerOneName.style.backgroundColor = "#71bcc799";
    playerTwoName.style.backgroundColor = "#264941";
    playerTurn.innerHTML = `${playerOneInput.value} turn !`;
    requiredFieldMsg.innerHTML = "";
  } else {
    requiredFieldMsg.innerHTML = "Please fill all the fields";
  }
});

allBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!playerOne) {
      box.innerHTML = "X";
      playerTurn.innerHTML = `${playerOneInput.value} turn !`;
      playerOneName.style.backgroundColor = "#71bcc799";
      playerTwoName.style.backgroundColor = "#264941";
      playerOne = true;
    } else {
      box.innerHTML = "O";
      playerTurn.innerHTML = `${playerTwoInput.value} turn !`;
      playerTwoName.style.backgroundColor = "#71bcc799";
      playerOneName.style.backgroundColor = "#264941";
      playerOne = false;
    }
    box.disabled = true;
    winCheck();
  });
});

const winCheck = () => {
  let winnerFound = false;

  for (const pattern of winPatterns) {
    const pos1Val = allBoxes[pattern[0]].innerHTML;
    const pos2Val = allBoxes[pattern[1]].innerHTML;
    const pos3Val = allBoxes[pattern[2]].innerHTML;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        const winner =
          pos1Val === "O" ? playerOneInput.value : playerTwoInput.value;

        winnerMsg.innerHTML = `Congratulations ${winner} is winnner`;
        playerTurn.innerHTML = "Game Over";
        playerOneName.style.backgroundColor = "#264941";
        playerTwoName.style.backgroundColor = "#264941";

        disabledboxes();
      }
    }
  }

  const allFilled = [...allBoxes].every((box) => box.innerHTML !== "");

  if (!winnerFound && allFilled) {
    winnerMsg.innerHTML = `It's Draw`;
    playerOneName.style.backgroundColor = "#264941";
    playerTwoName.style.backgroundColor = "#264941";
    playerTurn.innerHTML = "Game Over";
  }
};

const disabledboxes = () => {
  for (const box of allBoxes) {
    box.disabled = true;
  }
};

const enabledBoxes = () => {
  for (const box of allBoxes) {
    box.disabled = false;
    box.innerHTML = "";
    winnerMsg.innerHTML = "";
  }
};

resetGame.addEventListener("click", () => {
  enabledBoxes();
  thirdLayout.style.display = "none";
  firstLayout.style.display = "flex";
});
