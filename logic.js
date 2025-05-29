// let boxes=document.querySelectorAll(".boxes");
// let reset_btn=document.querySelector("#reset");
// let trunO=true;
// const win_patterns=[
//     [0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
//     [0,4,8],
//     [2,4,6]  
// ]

// boxes.forEach((box)=>{
//     box.addEventListener("click",()=>{
//         console.log("box wAS clicked");
//         if(trunO){
//             box.innerText="O";
//             trunO=false

//         }else{
//             box.innerText="X";
//             trunO=true;
//         }
//     })
// })

















const boxes = document.querySelectorAll('.box');
const msgContainer = document.querySelector('.msg_container');
const msg = document.getElementById('msg');
const resetBtn = document.getElementById('reset');
const newGameBtn = document.getElementById('New_btn');

let currentPlayer = 'X';  // Player X starts
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // columns
  [0,4,8], [2,4,6]            // diagonals
];

// Function to check winner or draw
function checkResult() {
  let roundWon = false;
  
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a,b,c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameActive = false;
    showMessage(`${currentPlayer} wins! 🏆`);
    return;
  }

  if (!board.includes('')) {
    gameActive = false;
    showMessage("It's a draw!🤷‍♂️");
  }
}

// Function to show message
function showMessage(message) {
  msg.textContent = message;
  msgContainer.classList.remove('hide');
}

// Function to handle box click
function boxClicked(e) {
  const index = Array.from(boxes).indexOf(e.target);
  
  if (board[index] !== '' || !gameActive) {
    return;  // ignore if already filled or game over
  }
  
  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  
  checkResult();
  
  if (gameActive) {
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Reset board but keep current player
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  boxes.forEach(box => box.textContent = '');
  msgContainer.classList.add('hide');
  gameActive = true;
}

// New game - reset and start with X
function newGame() {
  resetGame();
  currentPlayer = 'X';
}

// Event listeners
boxes.forEach(box => box.addEventListener('click', boxClicked));
resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', newGame);
