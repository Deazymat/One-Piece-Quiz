var startButton = document.getElementById("startButton");
var timerElement = document.getElementById("timer");
var quizContainer = document.getElementById("quizContainer");
var questionElement = document.getElementById("question");
var characters = ["Luffy", "Zoro", "Sanji", "Jimbei", "Chopper", "Nami"];
var choiceButtons = [
  document.getElementById("choice1"),
  document.getElementById("choice2"),
  document.getElementById("choice3"),
  document.getElementById("choice4"),
];

var questions = [
  {
    question: "Who's uses sandals as a weapon in the Straw-hats",
    options: ["Luffy", "Zoro", "Jimbei", "Chopper"],
    answer: "Luffy",
  },
  {
    question: "Who uses a stick to shoot clouds",
    options: ["Sanji", "Jimbei", "Chopper", "Nami"],
    answer: "Nami",
  },
  {
    question: "Who's always has a death wish",
    options: ["Zoro", "Sanji", "Nami", "Chopper"],
    answer: "Zoro",
  },
  {
    question: "Who's always packing the medicine",
    options: ["Chopper", "Sanji", "Jimbei", "Nami"],
    answer: "Chopper",
  },
  {
    question: "Who got that strong Fish Chop",
    options: [ "Nami", "Jimbei", "Chopper","Luffy", ],
    answer: "Jimbei",
  },
  {
    question: "Who always gets them nose bleeds",
    options: ["Sanji","Luffy", "Zoro", "Chopper"],
    answer: "Sanji",
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
function saveHighScores() {
var initials = prompt("Enter your initials:");
if (initials === null || initials === "") return;
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
highScores.push({initials: initials, score: correctAnswers});
localStorage.setItem("highScores", JSON.stringify(highScores))
}


function gameOver() {
  clearInterval(timer);
  quizContainer.style.display = "none";
  timerElement.style.display = "none";

  alert("Game over! Correct Answers" + correctAnswers);
  saveHighScores();
  showHighScores();

  // ... (same game over code as before) ...
}
function showHighScores() {
  
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.sort((a, b) => b.score - a.score);

  var highScoresList = document.getElementById('highScoresList');
  highScoresList.innerHTML = "";

  highScores.forEach(function(score) {

 var li = document.createElement('li');
    li.textContent = score.initials + ':' + score.score;
    highScoresList.appendChild(li);

  });
document.getElementById('highScoresContainer').style.display = 'block';

}
var resetButton = document.getElementById("resetScores");

resetButton.addEventListener("click", function () {
  localStorage.removeItem("highScores"); // Clearing the high scores from local storage
  document.getElementById("highScoresList").innerHTML = ""; // Clearing the displayed list
  alert("High scores have been reset!"); // Informing the user
});
var playAgainButton = document.getElementById("playAgain");

playAgainButton.addEventListener("click", function () {
  // Hide the high scores container
  document.getElementById("highScoresContainer").style.display = "none";

  // Reset the game variables
  timeLeft = 30;
  currentQuestionIndex = 0;
  correctAnswers = 0;

  // Display the start button
  startButton.style.display = "block";
  timerElement.textContent = "Time left: 30";
});

