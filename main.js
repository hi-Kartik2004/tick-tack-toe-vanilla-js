console.log("Welcome to the Tic-Tac-Toe game!");

let player = "X";

function handleClicks() {
  const boxes = document.querySelectorAll(".box");
  const playerStatus = document.getElementById("player-status");
  console.log(boxes);

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", handleBoxClick);
  }
}

function handleBoxClick() {
  if (this.innerHTML === "") {
    this.innerHTML = player;
    player = player === "X" ? "O" : "X";
    setTimeout(checkWinner, 100);
    setTimeout(handleDraw, 120);
    handlePlayerStatus();
  }
}

function handlePlayerStatus() {
  const playerStatus = document.getElementById("player-status");
  playerStatus.innerHTML = player + "'s turn";
}

function reset() {
  const boxes = document.querySelectorAll(".box");

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
  }

  player = "X";
  handlePlayerStatus();
}

function handleResetBtn() {
  const btn = document.getElementById("reset");
  btn.addEventListener("click", function () {
    let response = confirm("Are you sure you want to reset the game?");
    if (response) {
      reset();
    }
  });
}

function handleThemeBtn() {
  const themeBtn = document.getElementById("theme-btn");
  const body = document.querySelector("body");
  console.log(themeBtn);

  themeBtn.addEventListener("click", function () {
    if (themeBtn.innerText === "Dark Mode") {
      themeBtn.innerText = "Light Mode";
      body.classList.add("dark");
      body.classList.remove("light");
    } else if (themeBtn.innerText === "Light Mode") {
      themeBtn.innerText = "Dark Mode";
      body.classList.add("light");
      body.classList.remove("dark");
    }
  });
}

function generateWinningCombinations(rows, cols) {
  const winningCombos = [];

  for (let i = 0; i < rows; i++) {
    const rowCombo = [];
    for (let j = 0; j < cols; j++) {
      rowCombo.push(i * cols + j);
    }
    winningCombos.push(rowCombo);
  }

  for (let i = 0; i < cols; i++) {
    const colCombo = [];
    for (let j = 0; j < rows; j++) {
      colCombo.push(j * cols + i);
    }
    winningCombos.push(colCombo);
  }

  if (rows === cols) {
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < rows; i++) {
      diagonal1.push(i * cols + i);
      diagonal2.push(i * cols + (cols - i - 1));
    }
    winningCombos.push(diagonal1);
    winningCombos.push(diagonal2);
  }

  return winningCombos;
}

function handleDraw() {
  const boxes = document.querySelectorAll(".box");
  let count = 0;

  for(let i = 0; i < boxes.length; i++){
    if (boxes[i].innerHTML !== "") {
      count++;
    }
  }

  if (count === boxes.length) {
    alert("The game ended in a Draw!");
    reset();
  }
}

function checkWinner() {
  const boxes = document.querySelectorAll(".box");
  const boxesLen = document.querySelectorAll(".box").length;
  const rows = parseInt(document.getElementById("range").value);
  const cols = boxesLen / rows;
  const winningCombos = generateWinningCombinations(rows, cols);
  handleDraw();
  for (const combo of winningCombos) {
    const winner = combo
      .map((index) => boxes[index].innerHTML)
      .filter((value) => value !== "")[0];

    if (combo.every((index) => boxes[index].innerHTML === winner)) {
      alert("The winner is " + winner);
      reset();
      return;
    }
  }

  console.log("Game Continues!");
}



function setRange() {
  const range = document.getElementById("range");
  const container = document.querySelector(".container");

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  for (let i = 0; i < range.value; i++) {
    const row = document.createElement("section");
    row.classList.add("row");

    for (let j = 0; j < range.value; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.addEventListener("click", handleBoxClick);
      row.appendChild(box);
    }

    container.appendChild(row);
  }
}

function setBoxSize() {
  let fontSize = document.getElementById("box-size").value;
  const boxes = document.querySelectorAll(".box");

  if (fontSize > 105) {
    fontSize = 100;
    document.getElementById("box-size").value = 100;
    alert("Font size too big, reset to 100px");
  }

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.width = fontSize + "px";
    boxes[i].style.height = fontSize + "px";
  }

  console.log("font size is " + fontSize + "px");
}




setBoxSize();
handleThemeBtn();
handleClicks();
setRange();
handleResetBtn();
