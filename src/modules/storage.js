import Project from "./project.js";
import { createProject } from "./interface.js";

if(!localStorage.getItem("projectObj")) {
  localStorage.setItem("projectObj", JSON.stringify({ }));
}

let projectObj = JSON.parse(localStorage.getItem("projectObj"));

export function storeTask() {
  projectObj[Project.getActiveProject().unique] = Project.getActiveProject();

  localStorage.setItem("projectObj", JSON.stringify(projectObj));
}

export function storeProject(project) {
  projectObj[project.unique] = project;

  localStorage.setItem("projectObj", JSON.stringify(projectObj));
}

export function loadLocalStorage() {
  for (let [key, value] of Object.entries(JSON.parse(localStorage.getItem("projectObj")))) {
    createProject(value);
  }
}