const quiz = {
  data: [
    {
      q: "null e undefined são equivalentes em JavaScript.",
      o: ["True", "False"],
      a: 1,
    },
    {
      q: " O que a função alert() faz em JavaScript? ",
      o: [
        "Exibie uma janela de aviso com uma mensagem para o usuário",
        "Exibe um pop-up de confirmação com botões ok e Cancel",
        "Exibe uma mensagem na console do navegador",
        "Redireciona o usuário para outro página",
      ],
      a: 0,
    },
    {
      q: "O método setTimeout é usado para atrasar a execução de uma função.",
      o: ["True", "False"],
      a: 0,
    },
    {
      q: " Qual é o resultado de typeof null em JavaScript?  ",
      o: ["boolean", "undefined", "null", "object"],
      a: 3,
    },
    {
      q: "O que significa DOM em JavaScript?   ",
      o: [
        "Document Object Model ",
        "Data Object Mode",
        "Display Object Management",
        "Digital Object Management",
      ],
      a: 0,
    },
  ],
};

let currentQuestion = 0;
let score = 0;
let userAnswer = null;

// Elementos do DOM
const uploadButton = document.getElementById("uploadButton");
const quizPopup = document.getElementById("quizPopup");
const closeQuizButton = document.getElementById("closeQuiz");
const quizContainer = document.getElementById("quizContainer");
const nextQuestionButton = document.getElementById("nextQuestion");
const showResultButton = document.getElementById("showResult");
const remainingQuestions = document.getElementById("remainingQuestions");

// Exibe o quiz ao clicar no botão de upload
uploadButton.addEventListener("click", () => {
  quizPopup.classList.remove("hidden");
  renderQuestion();
});

// Fecha o quiz e reseta o estado inicial
closeQuizButton.addEventListener("click", closeQuiz);

// Avança para a próxima pergunta ou finaliza o quiz
nextQuestionButton.addEventListener("click", () => {
  if (currentQuestion < quiz.data.length) {
    checkAnswer();
    currentQuestion++;
    renderQuestion();
  }
});

// Exibe o resultado final
showResultButton.addEventListener("click", showResult);

// Renderiza a pergunta atual
function renderQuestion() {
  quizContainer.innerHTML = ""; // Limpa a pergunta anterior
  quizPopup.classList.remove("green", "red"); // Remove as cores de feedback

  if (currentQuestion < quiz.data.length) {
    const question = quiz.data[currentQuestion];

    // Renderiza a pergunta e as opções
    quizContainer.innerHTML = `
      <div class="quiz-question">
        <h3>${currentQuestion + 1}. ${question.q}</h3>
        <div class="quiz-options">
          ${question.o
            .map(
              (option, i) =>
                `<label><input type="radio" name="q${currentQuestion}" value="${i}"> ${option}</label>`
            )
            .join("")}
        </div>
      </div>
    `;

    // Atualiza o contador de perguntas restantes
    remainingQuestions.textContent = `Pergunta ${currentQuestion + 1} de ${
      quiz.data.length
    }`;

    // Ajusta o texto do botão "Next"
    nextQuestionButton.textContent =
      currentQuestion < quiz.data.length - 1 ? "Next" : "Finalizar";

    // Certifica que o botão está visível
    nextQuestionButton.classList.remove("hidden");
    showResultButton.classList.add("hidden");

    // Captura a resposta do usuário
    quizContainer.addEventListener("change", handleAnswer);
  } else {
    showResult(); // Exibe o resultado final
  }
}

// Captura a resposta selecionada pelo usuário
function handleAnswer() {
  const selectedOption = document.querySelector(
    `input[name="q${currentQuestion}"]:checked`
  );
  if (selectedOption) {
    userAnswer = parseInt(selectedOption.value);
    nextQuestionButton.disabled = false;
  }
}

// Verifica a resposta e dá feedback visual
function checkAnswer() {
  if (userAnswer !== null) {
    const isCorrect = userAnswer === quiz.data[currentQuestion].a;
    quizPopup.classList.toggle("green", isCorrect);
    quizPopup.classList.toggle("red", !isCorrect);

    if (isCorrect) score++;
  }
  userAnswer = null; // Reseta a resposta do usuário
}

// Exibe o resultado final
function showResult() {
  quizContainer.innerHTML = `
    <h3>Resultado</h3>
    <p>Você acertou ${score} de ${quiz.data.length} perguntas!</p>
  `;
  remainingQuestions.classList.add("hidden");
  nextQuestionButton.classList.add("hidden");
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
  remainingQuestions.classList.remove("hidden");
  nextQuestionButton.textContent = "Next";
  nextQuestionButton.classList.add("hidden");
  showResultButton.classList.add("hidden");
}
