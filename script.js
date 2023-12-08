const grid = document.querySelector(".grid");
const value = document.querySelector('#value'); 
const input = document.querySelector('#input'); 

//create a div of width 100/n %

function createGrid(n) {
  for (let i = 0; i < n; i++) {
    const row = document.createElement('div');
    row.setAttribute('class', 'row')
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

createGrid(16);

function clearGrid(){
    while(grid.firstChild){
        grid.removeChild(grid.firstChild);
    }
}
 

function changeGridSize() {
    value.textContent = input.value;
    input.addEventListener("input", (event) => {
      value.textContent = event.target.value;
      clearGrid();
      createGrid(event.target.value);
    });
}  

changeGridSize();



//create an option to paint in color mode 
    //add an event listener to all the square divs
    //on key down they should apply selected color as background 
    //
//create an option to paint in rainbow mode 
//option to clear the board
//option to clear a cell