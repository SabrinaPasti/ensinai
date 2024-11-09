// Alterna a visibilidade do dropdown ao clicar
document.getElementById("dropdownButton").onclick = function () {
  document.querySelector(".dropdown").classList.toggle("show");
};

// Fecha o dropdown se clicar fora dele
window.onclick = function (event) {
  if (!event.target.matches(".dropdown-btn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].parentElement.classList.remove("show");
    }
  }
};

// Função para buscar dados (simulação de chamada ao banco de dados)
function fetchData(option) {
  console.log("Buscando dados para: " + option);
  // Aqui você pode chamar uma função de backend para obter os dados de acordo com a opção
  // Exemplo usando fetch:
  /*
  fetch(`/api/dados?intervalo=${option}`)
    .then(response => response.json())
    .then(data => {
      // Processa os dados recebidos
      console.log(data);
    })
    .catch(error => console.error("Erro ao buscar dados:", error));
  */
}

// JavaScript para dashbord.html
// JavaScript para dashbord.html
// JavaScript para dashbord.html
window.addEventListener("DOMContentLoaded", () => {
  const timeData = JSON.parse(localStorage.getItem("timeSpent")) || {};

  // Define o tempo máximo para 8 horas (em segundos)
  const maxTime = 8 * 60 * 60; // 8 horas em segundos

  // Seleciona todos os elementos de barra de progresso
  const graphBars = document.querySelectorAll(".graphs");

  graphBars.forEach((bar, index) => {
    const timeSpent = timeData[index] || 0; // Tempo para o dia da semana correspondente
    const percentage = Math.max(1, (timeSpent / maxTime) * 100); // Calcula a altura da barra, com mínimo de 1%

    // Define a altura diretamente no style.height para simplificar
    bar.style.height = `${percentage}%`;
  });
});
