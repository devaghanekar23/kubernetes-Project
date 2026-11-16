/* =========================
   SCREEN ELEMENTS
========================= */

const startScreen = document.getElementById("start");
const quizScreen = document.getElementById("quiz");
const resultScreen = document.getElementById("result");


/* =========================
   BUTTONS
========================= */

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");


/* =========================
   QUIZ ELEMENTS
========================= */

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");

const progressElement = document.getElementById("progress");
const scoreElement = document.getElementById("score");

const barFill = document.getElementById("barFill");
const feedbackElement = document.getElementById("feedback");

const questionNumber = document.getElementById("questionNumber");
const categoryElement = document.getElementById("category");
const difficultyElement = document.getElementById("difficulty");


/* =========================
   RESULT ELEMENTS
========================= */

const finalScore = document.getElementById("finalScore");
const percentageElement = document.getElementById("percentage");

const correctAnswersElement =
  document.getElementById("correctAnswers");

const wrongAnswersElement =
  document.getElementById("wrongAnswers");

const totalQuestionsElement =
  document.getElementById("totalQuestions");

const messageElement =
  document.getElementById("message");


/* =========================
   CATEGORY ELEMENTS
========================= */

const categoryCards =
  document.querySelectorAll(".category-card");

const selectedCategoryElement =
  document.getElementById("selectedCategory");


/* =========================
   DIFFICULTY ELEMENTS
========================= */

const difficultyCards =
  document.querySelectorAll(".difficulty-card");

const selectedDifficultyElement =
  document.getElementById("selectedDifficulty");


/* =========================
   QUIZ VARIABLES
========================= */

let quizQuestions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;

let selectedCategory = "";

let selectedDifficulty = "";


/* =========================
   CATEGORY SELECTION
========================= */

categoryCards.forEach(card => {

  card.addEventListener("click", () => {

    /* Remove selection from all cards */

    categoryCards.forEach(item => {
      item.classList.remove("selected");
    });


    /* Select clicked card */

    card.classList.add("selected");


    /* Get category */

    selectedCategory =
      card.dataset.category;


    /* Show selected category */

    selectedCategoryElement.textContent =
      `Selected: ${selectedCategory}`;


    /* Update Start Button */

    updateStartButton();

  });

});


/* =========================
   DIFFICULTY SELECTION
========================= */

difficultyCards.forEach(card => {

  card.addEventListener("click", () => {

    /* Remove selection from all cards */

    difficultyCards.forEach(item => {
      item.classList.remove("selected");
    });


    /* Select clicked card */

    card.classList.add("selected");


    /* Get difficulty */

    selectedDifficulty =
      card.dataset.difficulty;


    /* Show selected difficulty */

    selectedDifficultyElement.textContent =
      `Selected: ${selectedDifficulty}`;


    /* Update Start Button */

    updateStartButton();

  });

});


/* =========================
   UPDATE START BUTTON
========================= */

function updateStartButton() {

  /*
     Start button will only work
     when both category and
     difficulty are selected.
  */

  if (selectedCategory && selectedDifficulty) {

    startBtn.disabled = false;

    startBtn.innerHTML =
      `Start ${selectedCategory} ${selectedDifficulty} Quiz <span>→</span>`;

  }

  else {

    startBtn.disabled = true;

    startBtn.innerHTML =
      `Select Category & Difficulty`;

  }

}


/* =========================
   START QUIZ
========================= */

startBtn.addEventListener(
  "click",
  startQuiz
);


/* =========================
   RESTART QUIZ
========================= */

restartBtn.addEventListener(
  "click",
  startQuiz
);


/* =========================
   NEXT QUESTION
========================= */

nextBtn.addEventListener(
  "click",
  nextQuestion
);


/* =========================
   START QUIZ FUNCTION
========================= */

function startQuiz() {

  /* =========================
     SAFETY CHECK
  ========================= */

  if (!selectedCategory) {

    alert("Please select a category first.");

    return;

  }


  if (!selectedDifficulty) {

    alert("Please select a difficulty.");

    return;

  }


  /* =========================
     FILTER QUESTIONS
  ========================= */

  const filteredQuestions =
    questions.filter(question =>

      question.category === selectedCategory &&
      question.difficulty === selectedDifficulty

    );


  /* =========================
     CHECK QUESTIONS
  ========================= */

  if (filteredQuestions.length === 0) {

    alert(
      `No ${selectedDifficulty} questions available for ${selectedCategory}.`
    );

    return;

  }


  /* =========================
     SHUFFLE QUESTIONS
  ========================= */

  quizQuestions =
    [...filteredQuestions]
      .sort(() => Math.random() - 0.5);


  /* =========================
     SELECT MAX 10 QUESTIONS
  ========================= */

  quizQuestions =
    quizQuestions.slice(0, 10);


  /* =========================
     RESET QUIZ
  ========================= */

  currentQuestion = 0;

  score = 0;

  answered = false;


  /* =========================
     RESET SCORE
  ========================= */

  scoreElement.textContent = "0";


  /* =========================
     TOTAL QUESTIONS
  ========================= */

  totalQuestionsElement.textContent =
    quizQuestions.length;


  /* =========================
     SCREEN CHANGE
  ========================= */

  startScreen.classList.add("hidden");

  resultScreen.classList.add("hidden");

  quizScreen.classList.remove("hidden");


  /* =========================
     SHOW SELECTED DIFFICULTY
  ========================= */

  difficultyElement.textContent =
    selectedDifficulty;


  /* =========================
     SHOW FIRST QUESTION
  ========================= */

  showQuestion();

}


/* =========================
   SHOW QUESTION
========================= */

function showQuestion() {

  answered = false;


  /* =========================
     RESET BUTTON
  ========================= */

  nextBtn.classList.add("hidden");

  nextBtn.innerHTML =
    `Next Question <span>→</span>`;


  /* =========================
     RESET FEEDBACK
  ========================= */

  feedbackElement.textContent = "";

  feedbackElement.className =
    "feedback";


  /* =========================
     CURRENT QUESTION
  ========================= */

  const question =
    quizQuestions[currentQuestion];


  const total =
    quizQuestions.length;


  const questionIndex =
    currentQuestion + 1;


  /* =========================
     PROGRESS TEXT
  ========================= */

  progressElement.textContent =
    `Question ${questionIndex} of ${total}`;


  /* =========================
     QUESTION NUMBER
  ========================= */

  questionNumber.textContent =
    String(questionIndex).padStart(2, "0");


  /* =========================
     CATEGORY
  ========================= */

  categoryElement.textContent =
    question.category;


  /* =========================
     DIFFICULTY
  ========================= */

  difficultyElement.textContent =
    question.difficulty;


  /* =========================
     PROGRESS BAR
  ========================= */

  const progress =
    (questionIndex / total) * 100;


  barFill.style.width =
    `${progress}%`;


  /* =========================
     QUESTION TEXT
  ========================= */

  questionElement.textContent =
    question.question;


  /* =========================
     CLEAR OPTIONS
  ========================= */

  optionsElement.innerHTML = "";


  /* =========================
     CREATE OPTIONS
  ========================= */

  question.options.forEach(
    (option, index) => {

      const button =
        document.createElement("button");


      button.className =
        "option";


      button.type =
        "button";


      button.textContent =
        `${String.fromCharCode(65 + index)}. ${option}`;


      button.addEventListener(
        "click",
        () => selectAnswer(index)
      );


      optionsElement.appendChild(button);

    }
  );

}


/* =========================
   SELECT ANSWER
========================= */

function selectAnswer(selectedIndex) {

  /* Prevent multiple answers */

  if (answered) {

    return;

  }


  answered = true;


  /* =========================
     CURRENT QUESTION
  ========================= */

  const question =
    quizQuestions[currentQuestion];


  /* =========================
     ALL OPTION BUTTONS
  ========================= */

  const buttons =
    document.querySelectorAll(".option");


  /* =========================
     DISABLE OPTIONS
  ========================= */

  buttons.forEach(button => {

    button.disabled = true;

  });


  /* =========================
     CORRECT ANSWER
  ========================= */

  const correctIndex =
    question.answer;


  buttons[correctIndex]
    .classList.add("correct");


  /* =========================
     CORRECT ANSWER SELECTED
  ========================= */

  if (selectedIndex === correctIndex) {

    score++;


    scoreElement.textContent =
      score;


    feedbackElement.textContent =
      `✓ Correct! ${question.explanation}`;


    feedbackElement.classList.add(
      "correct-text"
    );

  }


  /* =========================
     WRONG ANSWER
  ========================= */

  else {

    buttons[selectedIndex]
      .classList.add("wrong");


    feedbackElement.textContent =
      `✕ Incorrect. ${question.explanation}`;


    feedbackElement.classList.add(
      "wrong-text"
    );

  }


  /* =========================
     SHOW NEXT BUTTON
  ========================= */

  nextBtn.classList.remove("hidden");


  /* =========================
     LAST QUESTION
  ========================= */

  if (
    currentQuestion ===
    quizQuestions.length - 1
  ) {

    nextBtn.innerHTML =
      `View Result <span>→</span>`;

  }

}


/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {

  currentQuestion++;


  /* =========================
     CHECK LAST QUESTION
  ========================= */

  if (
    currentQuestion >=
    quizQuestions.length
  ) {

    showResult();

    return;

  }


  /* =========================
     SHOW NEXT
  ========================= */

  showQuestion();


  /* =========================
     SCROLL TOP
  ========================= */

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* =========================
   SHOW RESULT
========================= */

function showResult() {

  /* =========================
     SCREEN CHANGE
  ========================= */

  quizScreen.classList.add("hidden");

  resultScreen.classList.remove("hidden");


  /* =========================
     TOTAL
  ========================= */

  const total =
    quizQuestions.length;


  /* =========================
     WRONG ANSWERS
  ========================= */

  const wrong =
    total - score;


  /* =========================
     PERCENTAGE
  ========================= */

  const percentage =
    Math.round(
      (score / total) * 100
    );


  /* =========================
     RESULT VALUES
  ========================= */

  finalScore.textContent =
    `${score}/${total}`;


  percentageElement.textContent =
    `${percentage}%`;


  correctAnswersElement.textContent =
    score;


  wrongAnswersElement.textContent =
    wrong;


  totalQuestionsElement.textContent =
    total;


  /* =========================
     RESULT MESSAGE
  ========================= */

  if (percentage >= 90) {

    messageElement.textContent =
      "Outstanding! Your knowledge is excellent. 🏆";

  }

  else if (percentage >= 70) {

    messageElement.textContent =
      "Great work! You have a strong knowledge base. 🎉";

  }

  else if (percentage >= 50) {

    messageElement.textContent =
      "Good attempt! Keep learning and improve. 💪";

  }

  else {

    messageElement.textContent =
      "Keep practicing! Every quiz is a chance to learn. 📚";

  }

}