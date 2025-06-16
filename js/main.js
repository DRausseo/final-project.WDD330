import { getQuote, getActivity } from "./apiHandler.js";

document.addEventListener("DOMContentLoaded", async () => {
  const quote = await getQuote();
  const activity = await getActivity();

  document.getElementById("quote").textContent = quote;
  document.getElementById("activity").textContent = activity;
});
const taskList = document.getElementById("task-list");
const addTaskButton = document.getElementById("add-task");
const mainTaskInput = document.getElementById("main-task");
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
});
let focusTimer;
let timeLeft = 25 * 60; // 25 minutes

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
