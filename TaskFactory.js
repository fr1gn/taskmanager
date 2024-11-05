import { v4 as uuidv4 } from 'uuid';

class Task {
  constructor(text, type) {
    this.text = text;
    this.type = type;
    this.id = uuidv4(); // Unique ID for each task
    this.completed = false;
    this.date = new Date(); // Set the task creation date
  }
}

class TaskFactory {
  static createTask(text, type) {
    return new Task(text, type);
  }
}

export default TaskFactory;
