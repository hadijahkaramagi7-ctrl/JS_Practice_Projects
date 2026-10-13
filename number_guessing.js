/*
NUMBER GUESSING GAME
=====================

WHAT THIS PROGRAM DOES:
The computer picks a random number between 1 and 100.
The player keeps guessing until they find it.
The program gives hints ("Too high" / "Too low") after each guess.

HOW TO RUN:
1. Open a terminal.
2. Navigate to the folder containing this file.
3. Run: node number_guessing.js

HOW TO USE:
- Type a number between 1 and 100 and press Enter.
- Keep guessing until you find the secret number.
- The program will count how many attempts you used.
*/

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const MIN = 1;
const MAX = 100;

let secretNumber = 0;
let attempts = 0;

// Start a new game
function startGame() {
  secretNumber = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  attempts = 0;

  console.log('=================================');
  console.log('  NUMBER GUESSING GAME');
  console.log('=================================');
  console.log('I have picked a number between ' + MIN + ' and ' + MAX + '.');
  console.log('Can you guess it?\n');

  askGuess();
}

// Prompt for a guess
function askGuess() {
  rl.question('Enter your guess: ', function (input) {
    let guess = parseInt(input);

    // Validate input
    if (isNaN(guess) || guess < MIN || guess > MAX) {
      console.log('Please enter a number between ' + MIN + ' and ' + MAX + '.\n');
      askGuess();
      return;
    }

    attempts = attempts + 1;

    // Check the guess against the secret number
    if (guess === secretNumber) {
      console.log('\n🎉 Correct! The number was ' + secretNumber + '.');
      console.log('You took ' + attempts + ' attempt(s).');

      // Comment based on number of attempts
      if (attempts <= 5) {
        console.log('Amazing! You are a mind reader! 🧠');
      } else if (attempts <= 8) {
        console.log('Great job! Well played. 👏');
      } else {
        console.log('You got there in the end! 😅');
      }

      askPlayAgain();
    } else if (guess > secretNumber) {
      console.log('Too high! Try again.');
      askGuess();
    } else {
      console.log('Too low! Try again.');
      askGuess();
    }
  });
}

// Ask if the player wants another round
function askPlayAgain() {
  rl.question('\nPlay again? (yes/no): ', function (answer) {
    if (answer.trim().toLowerCase() === 'yes' || answer.trim().toLowerCase() === 'y') {
      startGame();
    } else {
      console.log('Thanks for playing! Goodbye. 👋');
      rl.close();
    }
  });
}

// Run the game
startGame();
