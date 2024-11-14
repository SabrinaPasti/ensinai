// JavaScript para curso.html
let startTime = Date.now();

window.addEventListener("beforeunload", () => {
  const endTime = Date.now();
  const totalTime = Math.floor((endTime - startTime) / 1000); // tempo em segundos

  // Obtém os dados de tempo do localStorage
  const timeData = JSON.parse(localStorage.getItem("timeSpent")) || {};

  // Obtém o dia da semana (0 = Domingo, 1 = Segunda, etc.)
  const currentDay = new Date().getDay();

  // Atualiza o tempo do dia atual no localStorage
  timeData[currentDay] = (timeData[currentDay] || 0) + totalTime;
  localStorage.setItem("timeSpent", JSON.stringify(timeData));
});
