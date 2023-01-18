/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  // let board = Array(HEIGHT).fill().map(() =>Array(WIDTH).fill());    //thought this was working until findSpotForCol error//

  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
  console.log("gameboard: ", board);     // to visibly see the board in console
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  
  let board = document.getElementById('board');
  
  // TODO: add comment for this code
  const top = document.createElement("tr");          //creates table for htmlBoard
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("class", "top1");                 //creates cells for the top row
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
   board.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); 
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `id${y}-${x}`);        //creates cells for the game board
      row.append(cell);
    }
    board.append(row);
    
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT -1; y >= 0; y--){
    if(!board[y][x]) {
      return y
    }
  }
  return -1;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.append(`P${currPlayer}`)
  piece.classList.add(`p${currPlayer}`);    //had to had "p" to identify class in CSS
  
  const location = document.getElementById(`id${y}-${x}`);
  location.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */
let oneCounts = 0;
let twoCounts = 0;

function handleClick(e) {
  // get x from ID of clicked cell
  const x = +e.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y < 0) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    if(currPlayer == 1){
      setTimeout(function(){
        endGame(`Red Wins!`)        //  Piece is played before the prompt comes up for winner when Timeout < 0s
      },5)    
  } else setTimeout(function(){
    endGame(`Black Wins!`)
  },5) ;
}

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  const IDs = document.querySelectorAll("#id0-0, #id0-1, #id0-2, #id0-3, #id0-4, #id0-5");
  let tally = 0;

  for(i = 0; i < IDs.length; i++){
    if((IDs[i].hasChildNodes()) !== true){
    } else tally += 1;
  }
  if (tally >= 6) {
    return endGame('Tie Game');
  }
  
  
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;  

  if(currPlayer === 1){
    oneCounts += 1;
  } else twoCounts += 1;

  const oneCount = document.getElementById('play1token')
  const twoCount = document.getElementById('play2token')
  oneCount.innerHTML = oneCounts;
  twoCount.innerHTML = twoCounts;

  const topSwitch = document.querySelectorAll('.top1');
  const topSwitch2 = document.querySelectorAll('.top2');
  topSwitch.forEach(function(e) {
    e.classList.remove("top1");
    e.classList.add("top2")
  })
  topSwitch2.forEach(function(e) {
    e.classList.remove("top2");
    e.classList.add("top1")
  })
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

// following changes title color
function randomRGB(){
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 1);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`
}
const title = document.querySelectorAll('.title');

setInterval(function(){
     for(let tit of title){
          tit.style.color = randomRGB();
     }     
},1500)

//following is for button refresh
function refresh(){
  window.location.reload("Refresh")
}


makeBoard();
makeHtmlBoard();