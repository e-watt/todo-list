let currentProject = "";

export default class Project {
  constructor(title, priority) {
    this.title = title;
    this.priority = priority;
    this.tasks = [];
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