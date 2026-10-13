// Quiz App - multiple choice questions with score

// The quiz questions
const questions = [
  {
    question: 'What does HTML stand for?',
    options: [
      'Hyper Trainer Markup Language',
      'HyperText Markup Language',
      'HyperText Machine Language',
      'Home Tool Markup Language'
    ],
    answer: 1
  },
  {
    question: 'Which keyword declares a variable in JavaScript?',
    options: ['int', 'var', 'dim', 'string'],
    answer: 1
  },
  {
    question: 'What does CSS stand for?',
    options: [
      'Creative Style Sheets',
      'Computer Style Sheets',
      'Cascading Style Sheets',
      'Colorful Style Sheets'
    ],
    answer: 2
  },
  {
    question: 'Which symbol starts a single-line comment in JavaScript?',
    options: ['#', '<!--', '//', '**'],
    answer: 2
  },
  {
    question: 'Which method adds an item to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'slice()'],
    answer: 0
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;

// Elements
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const questionText = document.getElementById('questionText');
const optionsBox = document.getElementById('options');
const feedback = document.getElementById('feedback');
const currentQ = document.getElementById('currentQ');
const totalQ = document.getElementById('totalQ');
const scoreText = document.getElementById('scoreText');
const commentText = document.getElementById('commentText');

// Start the quiz
function startQuiz() {
  currentIndex = 0;
  score = 0;
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  resultScreen.classList.add('hidden');
  totalQ.textContent = questions.length;
  showQuestion();
}

// Display the current question
function showQuestion() {
  answered = false;
  feedback.textContent = '';
  currentQ.textContent = currentIndex + 1;

  const q = questions[currentIndex];
  questionText.textContent = q.question;

  // Clear old options
  optionsBox.innerHTML = '';

  // Create a button for each option
  q.options.forEach(function (option, index) {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.className = 'option-btn';
    btn.onclick = function () { checkAnswer(index); };
    optionsBox.appendChild(btn);
  });
}

// Check the selected answer
function checkAnswer(selectedIndex) {
  if (answered) return; // Prevent double-clicking
  answered = true;

  const q = questions[currentIndex];
  const buttons = optionsBox.querySelectorAll('.option-btn');

  // Highlight right and wrong answers
  buttons.forEach(function (btn, i) {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    if (i === selectedIndex && i !== q.answer) btn.classList.add('wrong');
  });

  // Update score
  if (selectedIndex === q.answer) {
    score = score + 1;
    feedback.textContent = '✅ Correct!';
    feedback.style.color = '#28a745';
  } else {
    feedback.textContent = '❌ Wrong!';
    feedback.style.color = '#dc3545';
  }

  // Move to the next question after a short delay
  setTimeout(function () {
    currentIndex = currentIndex + 1;
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

// Show the final result
function showResult() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  scoreText.textContent = score + ' / ' + questions.length;

  // Comment based on score
  if (score === questions.length) {
    commentText.textContent = 'Excellent! Perfect score! 🏆';
  } else if (score >= questions.length / 2) {
    commentText.textContent = 'Good job! Keep practising. 👍';
  } else {
    commentText.textContent = 'Keep trying — you will improve! 💪';
  }
}

// Restart the quiz
function restartQuiz() {
  startQuiz();
}
