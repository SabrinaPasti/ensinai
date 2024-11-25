let timeSpent = 0; // Tempo inicial em minutos

setInterval(() => {
  timeSpent++;
}, 60000);

window.addEventListener("beforeunload", () => {
  fetch("/salvar-tempo-cursos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ timeSpent }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Tempo salvo:", data);
    })
    .catch((error) => {
      console.error("Erro ao salvar tempo:", error);
    });
});

// app.post("/salvar-tempo-cursos", async (req, res) => {
//   const { timeSpent } = req.body;

//   if (typeof timeSpent !== "number") {
//     return res.status(400).json({ message: "Tempo inválido" });
//   }

//   try {
//     const userId = req.user?.id || "user_placeholder"; // Substitua pelo sistema de autenticação real
//     const { data, error } = await supabase
//       .from("user_time")
//       .upsert([{ user_id: userId, time_spent: timeSpent }], {
//         onConflict: ["user_id"],
//       });

//     if (error) {
//       throw error;
//     }

//     res.json({ success: true, message: "Tempo salvo com sucesso!" });
//   } catch (err) {
//     console.error("Erro ao salvar o tempo:", err);
//     res.status(500).json({ message: "Erro ao salvar o tempo" });
//   }
// });
