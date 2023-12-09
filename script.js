let isMouseDown = false;

const grid = document.querySelector(".grid");
const value = document.querySelector("#value");
const input = document.querySelector("#input");
const colorPicker = document.querySelector("#color-picker");
const rainbowBtn = document.querySelector(".rainbow");
const eraser = document.querySelector(".eraser");
const clear = document.querySelector(".clear");

function setUpGrid() {
  grid.addEventListener("mousedown", () => {
    isMouseDown = true;
  });
  grid.addEventListener("mouseup", () => {
    isMouseDown = false;
  });
  grid.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });
  input.value = 16;
}

function createGrid(n) {
  for (let i = 0; i < n; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < n; j++) {
      const square = document.createElement("div");
      square.setAttribute("class", "square");
      square.style.width = `calc(800px/${n})`;
      square.style.height = `calc(800px/${n})`;

      row.appendChild(square);
    }
    grid.appendChild(row);
  }
}

function removeGrid() {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
}

function changeGridSize() {
  value.textContent = input.value;
  input.addEventListener("input", (event) => {
    value.textContent = event.target.value;
    removeGrid();
    createGrid(event.target.value);

    applyColorListener();
  });
}

function applyColorListener() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.addEventListener("mouseenter", handleMouseEnter);
    square.addEventListener("click", handleClick);
  });
}

function handleMouseEnter(e) {
  if (isMouseDown) {
    if (eraser.classList.contains("isEraseMode")) {
      e.target.style.background = "#eae7e7";
    } else if (rainbowBtn.classList.contains("isRainbowMode")) {
      const randomColor = getRandomColor();
      e.target.style.background = randomColor;
    } else {
      e.target.style.background = colorPicker.value;
    }
  }
}

function handleClick(e) {
  if (rainbowBtn.classList.contains("isRainbowMode")) {
    const randomColor = getRandomColor();
    e.target.style.background = randomColor;
  } else {
    e.target.style.background = colorPicker.value;
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setButtonListener() {
  rainbowBtn.addEventListener("click", () => {
    rainbowBtn.classList.toggle("isRainbowMode");
  });
  eraser.addEventListener("click", () => {
    eraser.classList.toggle("isEraseMode");
  });

  clear.addEventListener("click", clearGrid);
}

function clearGrid() {
  const squares = document.querySelectorAll(".square");

  squares.forEach((square) => {
    square.style.background = "#eae7e7";
  });
}

function main() {
  setUpGrid();
  createGrid(16);
  changeGridSize();
  applyColorListener();
  colorPicker.addEventListener("change", applyColorListener);
  setButtonListener();
}

window.onload = main;

//option to clear the board
// when the clear button is clicked
//make every cell revert to original color

// option to erase
//when that button has been clicked
//apply an eventlistener to all the squares
//when they are clicked they should reset the color back to original
