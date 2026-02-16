const questions = [
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    answers: [
      { text: "<link>", correct: false },
      { text: "<a>", correct: true },
      { text: "<href>", correct: false },
      { text: "<url>", correct: false },
    ],
  },
  {
    question: "Which CSS property is used to change text color?",
    answers: [
      { text: "font-color", correct: false },
      { text: "text-style", correct: false },
      { text: "color", correct: true },
      { text: "background-color", correct: false },
    ],
  },
  {
    question: "Inside which HTML tag do we put JavaScript code?",
    answers: [
      { text: "<javascript>", correct: false },
      { text: "<js>", correct: false },
      { text: "<script>", correct: true },
      { text: "<code>", correct: false },
    ],
  },
  {
    question: "Which symbol is used for comments in JavaScript (single line)?",
    answers: [
      { text: "<!-- -->", correct: false },
      { text: "##", correct: false },
      { text: "**", correct: false },
      { text: "//", correct: true },
    ],
  },
  {
    question: "Which of the following is a JavaScript data type?",
    answers: [
      { text: "String", correct: true },
      { text: "Style", correct: false },
      { text: "ClassName", correct: false },
      { text: "Link", correct: false },
    ],
  },
  {
    question: "Which CSS property controls the size of text?",
    answers: [
      { text: "font-style", correct: false },
      { text: "font-size", correct: false },
      { text: "text-size", correct: true },
      { text: "text-width", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
  })
}
