let currentProject = "";

export default class Project {
  constructor(title, priority, unique = "", tasks = "") {
    this.title = title;
    this.priority = priority;

    if (tasks == "") {
      this.tasks = [];
    } else {
      this.tasks = tasks;
    }

    if (unique == "") {
      this.unique = crypto.randomUUID();
    } else {
      this.unique = unique;
    }
  }

  addTask(task) {
    this.tasks.push(task);
  }

  static setActiveProject(activeProject) {
    currentProject = activeProject;
  }

  static getActiveProject() {
    return currentProject;
  }
}