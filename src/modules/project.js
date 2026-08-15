export let projectArr = [];

export default class Project {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.tasks = {};
    
    projectArr.push(this);
  }

  addTask(task) {
    this.tasks[task.title] = task;
  }
}