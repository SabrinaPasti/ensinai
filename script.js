// Função para adicionar uma nova tarefa
function addTodo() {
  // Pegamos o valor do campo de input e a lista onde as tarefas serão adicionadas
  const todoInput = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');

  // Verificamos se o campo de input não está vazio
  if (todoInput.value.trim() !== '') {
    // Criamos o elemento que representa a tarefa
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';

    // Criamos a caixa de seleção para marcar a tarefa como concluída
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Criamos o rótulo (label) para o texto da tarefa
    const label = document.createElement('label');
    label.innerText = todoInput.value;

    // Criamos o botão de excluir para remover a tarefa
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    // Definimos a função que será chamada ao clicar no botão de excluir
    deleteBtn.onclick = function () {
      todoItem.remove(); // Remove a tarefa da lista
    };

    // Adicionamos os elementos (checkbox, label e deleteBtn) à tarefa
    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(deleteBtn);
    // Adicionamos a tarefa à lista de tarefas
    todoList.appendChild(todoItem);

    // Limpamos o campo de entrada
    todoInput.value = '';

    // Adicionamos um ouvinte de evento para o checkbox
    checkbox.addEventListener('change', function () {
      // Quando a tarefa for marcada, risca o texto
      if (this.checked) {
        label.style.textDecoration = 'line-through';
        label.style.color = '#bbb';
      } else {
        label.style.textDecoration = 'none';
        label.style.color = '#555';
      }
    });
  }
}