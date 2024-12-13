const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task-btn");
const searchBox = document.getElementById("search-box");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    taskItem.innerHTML = `
      <div>
        <h3>${task.title} <span style="color:${getPriorityColor(task.priority)};">[${task.priority}]</span></h3>
        <p>${task.description}</p>
        <span>${task.completed ? "✔ Completed" : ""}</span>
      </div>
      <div>
        <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Complete"}</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

function getPriorityColor(priority) {
  return priority === "High" ? "red" : priority === "Medium" ? "orange" : "green";
}

addTaskBtn.addEventListener("click", () => {
  const title = document.getElementById("task-title").value.trim();
  const description = document.getElementById("task-desc").value.trim();
  const priority = document.getElementById("task-priority").value;

  if (title && description) {
    tasks.push({ title, description, priority, completed: false });
    saveTasks();
    renderTasks();
    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
    document.getElementById("task-priority").value = "Medium";
  } else {
    alert("Please fill in all fields.");
  }
});

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-priority").value = task.priority;
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

searchBox.addEventListener("input", (e) => {
  const filterText = e.target.value.toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filterText)
  );

  taskList.innerHTML = "";
  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    taskItem.innerHTML = `
      <div>
        <h3>${task.title} <span style="color:${getPriorityColor(task.priority)};">[${task.priority}]</span></h3>
        <p>${task.description}</p>
        <span>${task.completed ? "✔ Completed" : ""}</span>
      </div>
      <div>
        <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Complete"}</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
});

renderTasks();
