import Task from "./task.js";
import Project from "./project.js";
import { storeTask, storeProject, removeProject } from "./storage.js";
import { format } from "date-fns";

const content = document.querySelector(".content");
const sidebar = document.querySelector(".sidebar");

const taskTitle = document.querySelector("#taskTitle");
const taskDesc = document.querySelector("#taskDesc");
const completed = document.querySelector("#completed");
const dueDate = document.querySelector("#dueDate");
const taskPriority = document.querySelector("#taskPriority");

const projectTitle = document.querySelector("#projectTitle");
const projectPriority = document.querySelector("#projectPriority");

export function createTask(currentTask = "") {
  if (Project.getActiveProject() != "") {
    const container = document.createElement("div");
    const taskPriorityDiv = document.createElement("div");
    const checkbox = document.createElement("input");
    const taskDate = document.createElement("div");
    const taskTitleDiv = document.createElement("div");
    const taskTitleH2 = document.createElement("h2")
    const taskDescDiv = document.createElement("div");
    const taskRemoveBtn = document.createElement("button");

    container.classList.add("task");
    taskPriorityDiv.classList.add("taskPriority");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("checkbox");
    taskTitleDiv.classList.add("taskTitle");
    taskDescDiv.classList.add("taskDescription");
    taskRemoveBtn.classList.add("removeButton");

    if (currentTask == "") {
      var task = new Task(taskTitle.value, taskDesc.value, completed.checked, dueDate.value, taskPriority.value);

      Project.getActiveProject().addTask(task);

      storeTask(task);

      if (dueDate.value != "") {
        var dateStrWithoutYear = dueDate.value.split("-").join(", ");
        dateStrWithoutYear = format(new Date(dateStrWithoutYear), "MMM d");

        var dateStrWithYear = dueDate.value.split("-").join(", ");
        dateStrWithYear = format(new Date(dateStrWithYear), "MMM d yyyy");

        var dateArr = dueDate.value.split("-");
      }

      taskPriorityDiv.classList.add(`priority${taskPriority.value}`);
      taskTitleH2.classList.add(`titlePriority${taskPriority.value}`);

      checkbox.checked = completed.checked;
      taskTitleH2.textContent = taskTitle.value;
      taskDescDiv.textContent = taskDesc.value;

      taskTitle.value = "";
      taskDesc.value = "";
      dueDate.value = "";
      completed.checked = false;
      taskPriority.value = "";

      checkbox.addEventListener("click", () => {
        task.changeCompletion(checkbox.checked);
      });
    } else {
      if (currentTask.dueDate != "") {
        var dateStrWithoutYear = currentTask.dueDate.split("-").join(", ");
        dateStrWithoutYear = format(new Date(dateStrWithoutYear), "MMM d");

        var dateStrWithYear = currentTask.dueDate.split("-").join(", ");
        dateStrWithYear = format(new Date(dateStrWithYear), "MMM d yyyy");

        var dateArr = currentTask.dueDate.split("-");
      }

      taskPriorityDiv.classList.add(`priority${currentTask.priority}`);
      taskTitleH2.classList.add(`titlePriority${currentTask.priority}`);

      checkbox.checked = currentTask.completed;
      taskTitleH2.textContent = currentTask.title;
      taskDescDiv.textContent = currentTask.description;

      checkbox.addEventListener("click", () => {
        currentTask.changeCompletion(checkbox.checked);
      });
    }

    if (dateArr != undefined) {
      if (dateArr[0] == new Date().getFullYear()) {
        taskDate.textContent = dateStrWithoutYear;
      } else {
        taskDate.textContent = dateStrWithYear;
      }
    }

    taskTitleDiv.appendChild(taskTitleH2);

    container.appendChild(taskPriorityDiv);
    container.appendChild(checkbox);
    container.appendChild(taskDate);
    container.appendChild(taskTitleDiv);
    container.appendChild(taskDescDiv);
    container.appendChild(taskRemoveBtn);

    content.appendChild(container);

    taskRemoveBtn.addEventListener("click", () => {
      content.removeChild(container);
    });

    return task;
  }
}

export function createProject(currentProject = "") {
  const projectBtn = document.createElement("button");
  const projectPriorityDiv = document.createElement("div");
  const projectTitleDiv = document.createElement("div");
  const projectRemoveBtn = document.createElement("button");
  const contentTitleDiv = document.createElement("div");
  const contentTitleH2 = document.createElement("h2");

  projectRemoveBtn.classList.add("removeButton");
  projectBtn.classList.add("projectButton");
  contentTitleDiv.classList.add("contentTitle");

  if (currentProject == "") {
    var project = new Project(projectTitle.value, projectPriority.value);

    storeProject(project);

    projectPriorityDiv.classList.add(`priority${projectPriority.value}`);
    projectTitleDiv.classList.add(`titlePriority${projectPriority.value}`);
    
    contentTitleDiv.classList.add(`titlePriority${projectPriority.value}`);

    projectTitleDiv.textContent = projectTitle.value;

    if (projectPriority.value != undefined) {
      projectBtn.appendChild(projectPriorityDiv);
    }

    projectTitle.value = "";
    projectPriority.value = "";
  } else {
    currentProject = new Project(currentProject.title, currentProject.priority, currentProject.unique, currentProject.tasks);

    projectPriorityDiv.classList.add(`priority${currentProject.priority}`);
    projectTitleDiv.classList.add(`titlePriority${currentProject.priority}`);

    contentTitleDiv.classList.add(`titlePriority${currentProject.priority}`);

    projectTitleDiv.textContent = currentProject.title;

    if (currentProject.priority != undefined) {
      projectBtn.appendChild(projectPriorityDiv);
    }
  }

  projectBtn.appendChild(projectTitleDiv);
  projectBtn.appendChild(projectRemoveBtn);

  sidebar.appendChild(projectBtn);

  contentTitleH2.textContent = projectTitleDiv.textContent;

  contentTitleDiv.appendChild(contentTitleH2);

  projectBtn.addEventListener("click", (event) => {
    if (event.target == projectRemoveBtn) {
      return undefined;
    }

    content.textContent = "";
    content.appendChild(contentTitleDiv);

    if (project == undefined) {
      Project.setActiveProject(currentProject);
    } else {
      Project.setActiveProject(project);
    }

    Project.getActiveProject().tasks.forEach((currentTask) => {
      createTask(currentTask);
    });
  });

  projectRemoveBtn.addEventListener("click", () => {
    sidebar.removeChild(projectBtn);

    if (project == undefined) {
      removeProject(currentProject);
    } else {
      removeProject(project);
    }

    if(Project.getActiveProject() == project ||
      Project.getActiveProject() == currentProject)
    content.textContent = "";
    Project.setActiveProject("");
  });
}