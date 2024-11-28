const percentages = [30, 50, 75, 100, 60, 90, 45];

const maxHeight = 164;

const bars = document.querySelectorAll(".graphs");

bars.forEach((bar, index) => {
  const targetHeight = (percentages[index] / 100) * maxHeight;

  bar.style.setProperty("--target-height", `${targetHeight}px`);
});

const diaDaSemana = new Date().getDay();

function atualizarCores() {
  const graphWrappers = document.querySelectorAll(".graph-wrapper .graphs");

  graphWrappers.forEach((graph, index) => {
    if (index === diaDaSemana) {
      graph.style.backgroundColor = "#FF8E47";
    } else {
      graph.style.backgroundColor = "#FFF1E9";
    }
  });
}
