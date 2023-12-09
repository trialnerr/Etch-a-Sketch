let isMouseDown = false;

const grid = document.querySelector(".grid");
const value = document.querySelector("#value");
const input = document.querySelector("#input");
const colorPicker = document.querySelector("#color-picker");
const rainbowBtn = document.querySelector(".rainbow");
console.log(colorPicker.value);

grid.addEventListener("mousedown", () => {
  isMouseDown = true;
});


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
    if (rainbowBtn.classList.contains("isRainbowMode")) {
      const randomColor = getRandomColor()
      e.target.style.background = randomColor;
    } else {
      e.target.style.background = colorPicker.value;
    }
  }
}

function handleClick(e){

  if (rainbowBtn.classList.contains("isRainbowMode")) {
    const randomColor = getRandomColor()
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

function setRainbowMode() {
  rainbowBtn.addEventListener("click", () => {
    rainbowBtn.classList.toggle("isRainbowMode");
  });
}

createGrid(16);
changeGridSize();
applyColorListener();
colorPicker.addEventListener("change", applyColorListener);
setRainbowMode();
//create an option to paint in color mode

//add an event listener to all the square divs
//on key down they should apply selected color as background
// on key down again toggle the color

//create an option to paint in rainbow mode
//option to clear the board
//option to clear a cell
