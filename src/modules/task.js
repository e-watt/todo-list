/* Todo task features: Title, description, due date, priority, notes, checklist,
*/
export default class Task {
  constructor(title, description, completed, dueDate, priority, notes, checkList) {
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checkList = checkList;
  }

  completeTask() {
    this.completed = true;
  }

  changePriority(priorityValue) {
    this.priority = priorityValue;
  }
}