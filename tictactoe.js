const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    return {
        board
    }
})();

const player = (name, symbol) => {
    return{
        name,
        symbol
    }
};

const playerOne = player("PlayerOne", "X");
const playerTwo = player("PlayerTwo", "O");

const gameController = (() => {
   const {board} = gameBoard;

   let currentPlayer = "";
   let symbol = "";
   let counter = 0;
   let win = false;

   const boxes = Array.from(document.querySelectorAll(".box"));

   //Randomise turn at beginning of game
   function startGame (){
       let number = Math.floor(Math.random() * 2);
       if (number == 0){
           currentPlayer = playerOne;
       } else {
           currentPlayer = playerTwo;
       }
       return currentPlayer;
   } 

   const winningCombos = [
       [0, 1, 2],
       [3, 4, 5],
       [6, 7, 8],
       [0, 3, 6],
       [1, 4, 7],
       [2, 5, 8],
       [0, 4, 8],
       [2, 4, 6]
   ];

   const notice = document.querySelector(".notice");

   function winAnimation (player){
       notice.textContent = `"${player}" has won the game!`;
   }

   //Looping through winning combinations
   function checkWin (){
        for (let i=0; i < winningCombos.length; i++){
            let first = board[winningCombos[i][0]];
            let second = board[winningCombos[i][1]];
            let third = board[winningCombos[i][2]];
            if((first == second) && (second == third) && (first != "")){
                win = true;
                winAnimation(first);
            }
        }
        return win;
   }
   
   //Taking turns 
   function turn (x){
        if (board[boxes.indexOf(x)] != ""){
            return;
        }
        if (currentPlayer == playerOne){
            if (win == true){
                return false;
            } else {
                symbol = playerOne.symbol;
                board[boxes.indexOf(x)] = symbol;
                boxes[boxes.indexOf(x)].textContent = symbol;
                currentPlayer = playerTwo;
                console.log(board);
                checkWin();
            }
        } else if (currentPlayer == playerTwo){
            if (win == true){
                return false;
            } else {
                symbol = playerTwo.symbol;
                board[boxes.indexOf(x)] = symbol;
                boxes[boxes.indexOf(x)].textContent = symbol;
                currentPlayer = playerOne;
                console.log(board);
                checkWin();
            }
        }
        return counter;
   }

   function h (){
       boxes.forEach((box) => box.addEventListener('click', function(){
            if (currentPlayer == ""){
                startGame();
                turn(box);
               
            } else if (counter == 9){
                return;
            } else if (currentPlayer == playerOne || currentPlayer == playerTwo){
                turn(box);
            }
       }
       ));
   };
   h();
   
    return {
        h
    }
})();

function resetGame (){
    window.location.reload();
}