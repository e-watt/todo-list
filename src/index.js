import Task from "./modules/task.js";
import Project from "./modules/project.js";
import { createTask, createProject, loadDefaultProject } from "./modules/interface.js";
import "./style.css";

loadDefaultProject();

const projectDialog = document.querySelector("#projectDialog");
const taskDialog = document.querySelector("#taskDialog");

const createTaskBtn = document.querySelector(".createTaskBtn");
createTaskBtn.addEventListener("click", (event) => {
if (taskTitle.value != "") {
    event.preventDefault();
    taskDialog.close();
    
    const task = createTask();
    Project.getActiveProject().addTask(task);
  }
});

const createProjectButton = document.querySelector(".createProjectBtn");
createProjectButton.addEventListener("click", (event) => {
  if (projectTitle.value != "") {
    event.preventDefault();
    projectDialog.close();

    createProject();
  }
});