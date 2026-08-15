import Task from "./task.js";
import Project from "./project.js";

const content = document.querySelector(".content");
const title = document.querySelector("#title");
const desc = document.querySelector("#desc");
const completed = document.querySelector("#completed");
const dueDate = document.querySelector("#dueDate");
const priority = document.querySelector("#priority");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function createTask() {
  const task = new Task(title.value, desc.value, completed.checked, dueDate.value, priority.value);

  const container = document.createElement("div");
  const checkbox = document.createElement("input");
  const taskDate = document.createElement("div");
  const taskTitleDiv = document.createElement("div");
  const taskTitle = document.createElement("h2")
  const removeBtn = document.createElement("button");

  container.classList.add("task");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("checkbox");
  taskTitleDiv.classList.add("task-title");
  removeBtn.classList.add("remove-button");

  const dateArr = dueDate.value.split("-");

  if(dateArr[0] == new Date().getFullYear()) {
    taskDate.textContent = months[dateArr[1] - 1] + " " + dateArr[2];
  }

  checkbox.checked = completed.checked;
  taskTitle.textContent = title.value;

  taskTitleDiv.appendChild(taskTitle);

  container.appendChild(checkbox);
  container.appendChild(taskDate);
  container.appendChild(taskTitleDiv);
  container.appendChild(removeBtn);

  content.appendChild(container);

  checkbox.addEventListener("click", () => {
    task.changeCompletion(checkbox.checked);
  })
}