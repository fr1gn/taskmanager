class Task {
    constructor(text, type) {
      this.text = text;
      this.type = type; // Type of task (e.g., personal, work, project)
      this.id = Date.now();
      this.completed = false;
    }
  }
  
  class TaskFactory {
    static createTask(text, type) {
      return new Task(text, type);
    }
  }
  
  export default TaskFactory;
  