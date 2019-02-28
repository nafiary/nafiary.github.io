
document.addEventListener('DOMContentLoaded', function() {
//catch the button
var optionsButton = document.getElementById("playbutton");
optionsButton.addEventListener("click", function() {
	//change play button to reset button after clicked
	optionsButton.innerHTML = "Reset";

	function even(value){
		if (value%2 == 0) {
			return true;
		} else {
			return false;
		};
	};

	function odd(value){
		if (value%1 == 0) {
			return true;
		} else {
			return false;
		};
	};

	function allSame(array) {
		var first = array[0];

		if (array[0] == "") {
			return false;
		} else {
			return array.every(function(element) {
				return element == first;
			});
		};
	};

	//var customBackground = document.getElementById("boardcolor_input").value;

	//set board size
	var boardSize = parseInt(document.getElementById("boardsize_input").value);
	var gamesBoard = [];

	//gameboard size squared
	var sizeSquared = boardSize*boardSize;

	//create gameboard array
	for (var i = 0; i < sizeSquared; i++) {
		gamesBoard.push(i);
	};

	//create new div inside of game div
	document.getElementById("game").innerHTML =
	'<div id="board"></div>';
	var papan = document.getElementById("board");

	//style the board of game
	papan.style.margin = '0 auto';
	papan.style.height = (100 * boardSize) + 'px';
	papan.style.width = (100 * boardSize) + 'px';
	board.style.border = 'solid 1px #00f0b5';

	for (var i = 0; i < sizeSquared; i++) {
		papan.innerHTML += '<div class="square"></div>';
	};
	var squares = document.getElementsByClassName("square");

	//styling the squares
	for (var i = 0; i < sizeSquared; i++) {
		// set div squares to 100px x 100px
		squares[i].style.height = '100px';
		squares[i].style.width = '100px';
		// Float square divs left
		squares[i].style.float = "left";
		// Set div line height to 100px
		squares[i].style.lineHeight = "100px";
		// Set unique DIV IDs to each square 
		squares[i].setAttribute("id", i.toString());
	};

	if (sizeSquared % 2 !== 0) { // If board size is odd
		for (var i = 0; i < sizeSquared; i += 2) { // make every other square light gray
			squares[i].style.backgroundColor = "#6decaf";
		};
	} else { // If board size is even ### This was extremely hard to nail down ###
		for (i = 0; i < sizeSquared; i += 1) {
			if (even(i/boardSize)) { // make even rows alternate color
				for (var squareNum = i; squareNum < (i + boardSize); squareNum += 2) {
					squares[squareNum].style.backgroundColor = "#6decaf";	
				};
			} else if (odd(i/boardSize)) { // make odd rows alternate color
				for (var squareNum = i+1; squareNum < (i + boardSize); squareNum += 2) {
					squares[squareNum].style.backgroundColor = "#6decaf";	
				};
			} else {
			};
		};
	};

	//changable indicator
	var turnDiv = document.getElementById("turnIndicator");

	//X default goes first
	turnDiv.style.color = "black";
	turnDiv.innerHTML = "X go!";

	//click counter to count how many board is clicked
	var boardClick = 0;

	//variable for move counter
	var moveCounter = 0;

	//if board is clicked
	papan.addEventListener("click", function() {
		if (countWinner()) {
			alert(theWinner[0] + " is the winner! Play again?" );
			location.reload();
		} else if (moveCounter==sizeSquared && !countWinner()) {
			alert("DRAW! Play again?");
			location.reload();
		}else if (even(boardClick)) {
			turnDiv.style.color = "blue";
			turnDiv.innerHTML = "O go!";
		} else {
			turnDiv.style.color = "black";
			turnDiv.innerHTML = "X go!";
		};
		boardClick++;
	});

	//make var for square click data, and set it 0
	var squareClick = [];
	for (var i = 0; i < sizeSquared; i++) {
		squareClick[i] = 0;
	};

	//variable for winning combination
	var theWinner;

	//function for determine the winner
	var countWinner = function() {
		//check from row side
		for (i = 0; i < sizeSquared; i++) {
			if ((i%boardSize) == 0) {
				var checkRow = [];
				for (var numSq = i; numSq < (i+boardSize); numSq+=1) {
					checkRow.push(squares[numSq].innerHTML);
				};

				if (allSame(checkRow)) {
					theWinner = checkRow;
					return true;
				};
			};
		};

		//check from column side
		for (i = 0; i < sizeSquared; i++) {
			if (i < boardSize) {
				var checkCol = [];
				for (var numSq = i; numSq < sizeSquared; numSq+=boardSize) {
					checkCol.push(squares[numSq].innerHTML);
				};

				if (allSame(checkCol)) {
					theWinner = checkCol;
					return true;
				};
			};
		};

		//check from right diagonal
		var checkRDiag = []; // Needs to be outside of for loop to prevent overwriting array
		for (i = (boardSize - 1); i < (sizeSquared - 1); i += 1) { // first iteration over board
			if ((i % (boardSize - 1)) == 0) { // use condition if iterator % BOARDSIZE - 1 === 0 to get right diagonals
				checkRDiag.push(squares[i].innerHTML);
			};
		};
		if (allSame(checkRDiag)) { // As does the return statement
			theWinner = checkRDiag; // Push winning player data
			return true;
		};

		//check from left diagonal
		var checkLDiag = []; // Needs to be outside of for loop to prevent overwriting array
		for (i = 0; i < sizeSquared; i++) { // first iteration over board
			if ((i % (boardSize + 1)) == 0) { // use condition if iterator % BOARDSIZE - 1 === 0 to get right diagonals
				checkLDiag.push(squares[i].innerHTML);
			};
		};
		if (allSame(checkLDiag)) { // As does the return statement
			theWinner = checkLDiag; // Push winning player data
			return true;
		};

	};

	//function to count square click
	var countSqClick = function() {
		var div = this.getAttribute("id");
		squareClick[div]++;

		// If global click counter is odd and local click is == 1, change innerhtml of div to 'X' 
		if (even(boardClick) && squareClick[div] == 1) {
			this.style.color = "black";
			this.innerHTML = 'X';
			moveCounter++;
		// If global click counter is even and local click is == 1, change innerhtml of div to 'O'
		} else if (odd(boardClick) && squareClick[div] == 1) {
			this.innerHTML = 'O';
			this.style.color = "blue";
			moveCounter++;
		// If local click counter is greater than 1, alert player and subtract 1 from global clicks
		} else if (!countWinner()){
			alert('You cannot move there. That space is taken.');
			boardClick -= 1;
		} else {
		};

		//check winner then lock so no one can click again
		if (countWinner()) {
			for (var i = 0; i < sizeSquared; i++) {
				squareClick[i] = 2; //set 2 to lock
			};
			document.getElementById("playbutton").innerHTML = "Play again?"
		};
	};

	for (var i = 0; i < sizeSquared; i++) {
		squares[i].addEventListener("click", countSqClick);
	};
});

});
