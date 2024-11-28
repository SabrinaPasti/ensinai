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

const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
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

function handleClick(element) {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  element.classList.add("active");
}

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

atualizarCores();

// const maxTimeInMinutes = 8 * 60;
// const maxHeight = 164;

// function carregarTempo() {
//   fetch("/obter-tempo-cursos")
//     .then((response) => response.json())
//     .then((data) => {
//       const timeSpent = data.timeSpent || 0;
//       const percentage = Math.min((timeSpent / maxTimeInMinutes) * 100, 100);
//       const targetHeight = (percentage / 100) * maxHeight;

//       const bars = document.querySelectorAll(".graphs");
//       bars.forEach((bar) => {
//         bar.style.setProperty("--target-height", `${targetHeight}px`);
//       });
//     })
//     .catch((error) => {
//       console.error("Erro ao carregar o tempo:", error);
//     });
// }

// carregarTempo();



// app.get("/obter-tempo-cursos", async (req, res) => {
//   try {
//     const userId = req.user?.id || "user_placeholder"; // Substitua pelo sistema de autenticação real
//     const { data, error } = await supabase
//       .from("user_time")
//       .select("time_spent")
//       .eq("user_id", userId)
//       .single();

//     if (error) {
//       throw error;
//     }

//     res.json({ timeSpent: data?.time_spent || 0 });
//   } catch (err) {
//     console.error("Erro ao buscar o tempo:", err);
//     res.status(500).json({ message: "Erro ao buscar o tempo" });
//   }
// });
