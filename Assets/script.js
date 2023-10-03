var startButton = document.getElementById("startButton");
var timerElement = document.getElementById("timer");
var quizContainer = document.getElementById("quizContainer");
var questionElement = document.getElementById("question");
var characters = ["Luffy", "Zoro", "Sanji", "Jimbei", "Chopper"];
var choiceButtons = [
  document.getElementById("choice1"),
  document.getElementById("choice2"),
  document.getElementById("choice3"),
  document.getElementById("choice4"),
];

var questions = [

  {
    question: "Who is the best in the Straw-hats",
    options: [],
    answer: "",
  },
   {
    question: "",
    options: [],
    answer: "",
  },
   {
    question: "",
    options: [],
    answer: "",
  },
   {
    question: "",
    options: [],
    answer: "",
  },
   {
    question: "",
    options: [],
    answer: "",
  },
   {
    question: "",
    options: [],
    answer: "",
  },

  // ... (same questions array as before) ...
];

var timeLeft = 30;
var currentQuestionIndex = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var timer;

startButton.addEventListener("click", function () {
  startButton.style.display = "none";
  quizContainer.style.display = "block";

  timer = setInterval(function () {
    timeLeft--;
    timerElement.textContent = "Time left: " + timeLeft;

    if (timeLeft <= 0) {
      gameOver();
    }
  }, 1000);

  showQuestion();
});

function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  choiceButtons.forEach(function (button, index) {
    button.textContent = currentQuestion.options[index];
    button.onclick = checkAnswer;
  });
}

function checkAnswer(event) {
  var chosenAnswer = event.target.textContent;
  var correctAnswer = questions[currentQuestionIndex].answer;

  if (chosenAnswer === correctAnswer) {
    correctAnswers++;
  } else {
    incorrectAnswers++;
    timeLeft -= 5;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    gameOver();
  }
}

function gameOver() {
  clearInterval(timer);

  quizContainer.style.display = "none";
  timerElement.style.display = "none";

  // ... (same game over code as before) ...
}
