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

const userHeight = 1;
document.documentElement.style.setProperty("--graph-height", `${userHeight}%`);
