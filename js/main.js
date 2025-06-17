import { getQuote, getActivity } from "./apiHandler.js";

const taskList = document.getElementById("task-list");
const addTaskButton = document.getElementById("add-task");
const mainTaskInput = document.getElementById("main-task");

// Load tasks from localStorage
function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    taskList.innerHTML = saved;
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

// Theme color switch
const colorPicker = document.getElementById("theme-color");
colorPicker.addEventListener("change", (e) => {
  document.documentElement.style.setProperty("--primary-color", e.target.value);
  localStorage.setItem("themeColor", e.target.value);
});

// Dark mode toggle
const toggleDark = document.getElementById("toggle-dark");
toggleDark.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", toggleDark.checked);
  localStorage.setItem("darkMode", toggleDark.checked);
});

// Restore settings on load
const savedColor = localStorage.getItem("themeColor");
if (savedColor) {
  document.documentElement.style.setProperty("--primary-color", savedColor);
  colorPicker.value = savedColor;
}

const savedDark = localStorage.getItem("darkMode") === "true";
if (savedDark) {
  toggleDark.checked = true;
  document.body.classList.add("dark-mode");
}

// Add task with micro-actions
addTaskButton.addEventListener("click", () => {
  const taskName = mainTaskInput.value.trim();
  if (taskName === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${taskName}</strong>
    <ul class="micro-tasks">
      <li><input type="checkbox" /> Step 1</li>
      <li><input type="checkbox" /> Step 2</li>
      <li><input type="checkbox" /> Step 3</li>
    </ul>
  `;
  taskList.appendChild(li);
  mainTaskInput.value = "";
  saveTasks();
});

// Save when micro-tasks are checked/unchecked
taskList.addEventListener("change", saveTasks);

// Timer (Focus Mode)
let focusTimer;
let timeLeft = 25 * 60;

function updateTimerDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  document.getElementById(
    "timer-display"
  ).textContent = `${minutes}:${seconds}`;
}

document.getElementById("start-focus").addEventListener("click", () => {
  if (focusTimer) return;

  focusTimer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(focusTimer);
      focusTimer = null;
      timeLeft = 25 * 60;
      updateTimerDisplay();
      alert("Focus session complete!");
    } else {
      timeLeft--;
      updateTimerDisplay();
    }
  }, 1000);
});

// Initial load
document.addEventListener("DOMContentLoaded", async () => {
  const quote = await getQuote();
  const activity = await getActivity();

  document.getElementById("quote").textContent = quote;
  document.getElementById("activity").textContent = activity;

  loadTasks();
  updateTimerDisplay();
});
