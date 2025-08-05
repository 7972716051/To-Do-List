const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));
};

// Add new task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTaskToDOM(taskText);
    saveTask(taskText);
    taskInput.value = '';
  }
});

// Add task to DOM
function addTaskToDOM(text, isCompleted = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (isCompleted) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateStorage();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.className = 'delete-btn';
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    updateStorage();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(text) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update localStorage after changes
function updateStorage() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.childNodes[0].textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
