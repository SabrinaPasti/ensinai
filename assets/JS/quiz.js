const quiz = {
  data: [
    {
      q: "The Earth is flat.",
      o: ["True", "False"],
      a: 1, // False
    },
    {
      q: "The Moon is a planet.",
      o: ["True", "False"],
      a: 1, // False
    },
    {
      q: "What is the capital of France?",
      o: ["Berlin", "Madrid", "Paris", "Lisbon"],
      a: 2, // Paris
    },
  ],
};

let currentQuestion = 0;
let score = 0;
let userAnswer = null;

const uploadButton = document.getElementById("uploadButton");
const quizPopup = document.getElementById("quizPopup");
const closeQuizButton = document.getElementById("closeQuiz");
const quizContainer = document.getElementById("quizContainer");
const nextQuestionButton = document.getElementById("nextQuestion");
const showResultButton = document.getElementById("showResult");

// Exibir o quiz ao clicar no botão de upload
uploadButton.addEventListener("click", () => {
  quizPopup.classList.remove("hidden");
  renderQuestion();
});

// Fecha o pop-up
closeQuizButton.addEventListener("click", () => {
  closeQuiz();
});

// Botão Next: avalia a resposta e carrega a próxima pergunta
nextQuestionButton.addEventListener("click", () => {
  checkAnswer();
  currentQuestion++;
  renderQuestion();
});

// Botão Show Result: exibe o resultado final
showResultButton.addEventListener("click", () => {
  showResult();
});

// Renderiza a pergunta atual
function renderQuestion() {
  quizContainer.innerHTML = ""; // Limpa a pergunta anterior
  quizPopup.classList.remove("green", "red"); // Remove as cores
  if (currentQuestion < quiz.data.length) {
    const question = quiz.data[currentQuestion];
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("quiz-question");
    questionBlock.innerHTML = `
      <h3>${currentQuestion + 1}. ${question.q}</h3>
      <div class="quiz-options">
        ${question.o
          .map(
            (option, i) =>
              `<label><input type="radio" name="q${currentQuestion}" value="${i}"> ${option}</label>`
          )
          .join("")}
      </div>
    `;
    quizContainer.appendChild(questionBlock);

    nextQuestionButton.classList.add("hidden");
    quizContainer.addEventListener("change", handleAnswer);
  } else {
    showResultButton.classList.remove("hidden");
    nextQuestionButton.classList.add("hidden");
  }
}

// Captura a resposta selecionada
function handleAnswer() {
  const selectedOption = document.querySelector(
    `input[name="q${currentQuestion}"]:checked`
  );
  if (selectedOption) {
    userAnswer = parseInt(selectedOption.value);
    nextQuestionButton.classList.remove("hidden");
  }
}

// Avalia a resposta e muda a cor do pop-up
function checkAnswer() {
  if (userAnswer !== null) {
    const isCorrect = userAnswer === quiz.data[currentQuestion].a;
    quizPopup.classList.toggle("green", isCorrect);
    quizPopup.classList.toggle("red", !isCorrect);
    if (isCorrect) score++;
  }
  userAnswer = null; // Reseta a resposta do usuário para a próxima pergunta
}

// Exibe o resultado final
function showResult() {
  quizContainer.innerHTML = `
    <h3>Resultado</h3>
    <p>Você acertou ${score} de ${quiz.data.length} perguntas!</p>
  `;
  showResultButton.classList.add("hidden");
}

// Fecha o quiz e reseta tudo
function closeQuiz() {
  quizPopup.classList.add("hidden");
  quizPopup.classList.remove("green", "red");
  currentQuestion = 0;
  score = 0;
  userAnswer = null;
  quizContainer.innerHTML = "";
  nextQuestionButton.classList.add("hidden");
  showResultButton.classList.add("hidden");
}
