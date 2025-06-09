let questions = [];
let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');
const scoreBox = document.getElementById('scoreBox');

// Load questions from external JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    loadQuestion();
  });

function loadQuestion() {
  resetState();
  let q = questions[currentQuestion];
  questionEl.innerText = q.question;

  q.options.forEach((option, index) => {
    const li = document.createElement('li');
    li.innerText = option;
    li.addEventListener('click', () => selectAnswer(index, li));
    answersEl.appendChild(li);
  });
}

function resetState() {
  nextBtn.style.display = 'none';
  answersEl.innerHTML = '';
  scoreBox.innerText = '';
}

function selectAnswer(index, selectedOption) {
  const correct = index === questions[currentQuestion].answer;
  selectedOption.classList.add(correct ? 'correct' : 'wrong');
  if (correct) score++;

  Array.from(answersEl.children).forEach((li, i) => {
    if (i === questions[currentQuestion].answer) {
      li.classList.add('correct');
    }
    li.style.pointerEvents = 'none';
  });

  nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionEl.innerText = 'Quiz Completed!';
  scoreBox.innerText = `Your Score: ${score} / ${questions.length}`;
}
