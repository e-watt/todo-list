export default class Project {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.tasks = {};
  }

  addTask(task) {
    this.tasks[task.title] = task;
  }
}