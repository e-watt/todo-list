export default class Task {
  constructor(title, description, completed, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  changeCompletion(bool) {
    this.completed = bool;
  }

  changePriority(priorityValue) {
    this.priority = priorityValue;
  }
}