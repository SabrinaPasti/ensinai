function saveNote() {
  const input = document.querySelector(".note-input");
  const noteBox = document.querySelector(".note-box");

  // Verifica se há algo digitado no input
  if (input.value.trim() !== "") {
    // Cria um novo div para a anotação
    const newNote = document.createElement("div");
    newNote.classList.add("saved-note");

    // Adiciona o conteúdo da anotação
    newNote.textContent = input.value;

    // Adiciona a nova anotação à note-box
    noteBox.querySelector(".note-content").appendChild(newNote);

    // Limpa o campo de input após salvar
    input.value = "";

    // Faz o scroll para a parte de baixo da note-box para mostrar a anotação recém-salva
    noteBox.querySelector(".note-content").scrollTop =
      noteBox.querySelector(".note-content").scrollHeight;
  }
}
