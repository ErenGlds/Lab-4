import { Task, TaskManager } from "./taskManager.js";
import { fetchTasks } from "./api.js";

const loadTasksBtn = document.getElementById("loadTasksBtn");
const statusMessage = document.getElementById("statusMessage");
const taskList = document.getElementById("taskList");

const manager = new TaskManager();

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}

function createTaskElement(task) {
  const div = document.createElement("div");
  div.classList.add("task");
  if (task.completed) div.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = task.title;

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Toggle";
  toggleBtn.addEventListener("click", () => {
    manager.toggleTask(task.id);
    render();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    manager.removeTask(task.id);
    render();
  });

  div.appendChild(span);
  div.appendChild(toggleBtn);
  div.appendChild(deleteBtn);
  return div;
}

function render() {
  taskList.replaceChildren();
  manager.tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
}

async function loadTasks() {
  setStatus("Loading tasks...");
  loadTasksBtn.disabled = true;

  try {
    const rawTasks = await fetchTasks();

    const json = JSON.stringify(rawTasks);
    const parsed = JSON.parse(json);

    const tasks = parsed.map(
      ({ id, title, completed }) => new Task(id, title, completed),
    );

    manager.setTasks(tasks);
    render();
    setStatus("");
  } catch (error) {
    setStatus(`Failed to load tasks: ${error.message}`, true);
  } finally {
    loadTasksBtn.disabled = false;
  }
}

loadTasksBtn.addEventListener("click", loadTasks);
