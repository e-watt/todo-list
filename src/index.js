import "./style.css";
import Task from "./modules/task.js";
import Project from "./modules/project.js";
import { createTask, createProject } from "./modules/interface.js";
import { loadLocalStorage } from"./modules/storage.js";

loadLocalStorage();

const projectDialog = document.querySelector("#projectDialog");
const taskDialog = document.querySelector("#taskDialog");

const createTaskBtn = document.querySelector(".createTaskButton");
createTaskBtn.addEventListener("click", (event) => {
if (taskTitle.value != "") {
    event.preventDefault();
    taskDialog.close();

    createTask();
  }
});

const createProjectBtn = document.querySelector(".createProjectButton");
createProjectBtn.addEventListener("click", (event) => {
  if (projectTitle.value != "") {
    event.preventDefault();
    projectDialog.close();

    createProject();
  }
});