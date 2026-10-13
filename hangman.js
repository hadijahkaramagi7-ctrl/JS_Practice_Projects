/*
HANGMAN GAME
=============

WHAT THIS PROGRAM DOES:
A word is chosen at random from a list.
The player guesses letters one at a time.
Correct guesses reveal letters; wrong guesses cost a life.
The player has 6 lives. Guess the word before they run out!

HOW TO RUN:
1. Open a terminal.
2. Navigate to the folder containing this file.
3. Run: node hangman.js

HOW TO USE:
- Type a single letter and press Enter to guess.
- Type the whole word if you think you know it (only counted as a win/loss).
- You have 6 wrong guesses allowed.
*/

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const WORDS = [
  'javascript', 'programming', 'computer', 'developer', 'function',
  'variable', 'internet', 'keyboard', 'algorithm', 'terminal',
  'elephant', 'giraffe', 'mountain', 'universe', 'chocolate'
];

const MAX_WRONG = 6;

let chosenWord = '';
let guessedLetters = [];
let wrongLetters = [];
let lives = MAX_WRONG;

// Show the hangman picture based on lives lost
function showHangman() {
  const wrong = wrongLetters.length;

  const stages = [
    // 0 wrong
    `
     +---+
     |
