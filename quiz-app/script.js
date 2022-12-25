const quizData = [
  {
    question: "How old is Hoyeon",
    a: "10",
    b: "20",
    c: "22",
    d: "23",
    correct: "c",
  },
  {
    question: "What is the most used programming laguage",
    a: "java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "a",
  },
  {
    question: "How old is Soyeon",
    a: "10",
    b: "20",
    c: "22",
    d: "23",
    correct: "d",
  },
  {
    question: "What is Soyeon's favorite movie",
    a: "The Avengers",
    b: "The Greatest Show Man",
    c: "Begin Again",
    d: "Midnight Sun",
    correct: "b",
  },
  {
    question: "Where does Soyeon live?",
    a: "Yeongdeungpo-gu",
    b: "Gwanak-gu",
    c: "Yongsan-gu",
    d: "Anyang-si",
    correct: "d",
  },
];

const questionEl = document.getElementById("question");
const quiz = document.getElementById("quiz");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const answerEls = document.querySelectorAll(".answer");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselcteAnswers();
  const currentQuizData = quizData[currentQuiz];
  // console.log(currentQuizData.question)
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSeleted() {
  let answer = undefined;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

function deselcteAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  const answer = getSeleted();
  console.log(answer);
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `<h2>you answered corrextly at ${score}/${quizData.length} question.</h2> <button onclick="location.reload()">Reload</button>`;
    }
  }
});
