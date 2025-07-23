const api = 'https://lab-3-24560004.onrender.com/api/tasks';
console.log("app.js is loaded!");

async function loadTasks() {
  const res = await fetch(api);
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.description;
    if (task.completed) li.classList.add('done');
    li.onclick = () => toggleTask(task._id, !task.completed);
    const del = document.createElement('button');
    del.textContent = '❌';
    del.onclick = (e) => {
      e.stopPropagation();
      deleteTask(task._id);
    };
    li.appendChild(del);
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById('taskInput');
  const description = input.value.trim();
  if (!description) return;
  await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description })
  });
  input.value = '';
  loadTasks();
}

document.getElementById('taskInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

async function toggleTask(id, completed) {
  await fetch(`${api}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${api}/${id}`, { method: 'DELETE' });
  loadTasks();
}

loadTasks();
