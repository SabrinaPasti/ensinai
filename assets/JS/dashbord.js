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
// grafico
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


// calendario


const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");
// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();
// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";
  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
renderCalendar();
prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
  });
});