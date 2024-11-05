class TaskComposite {
    constructor(text) {
      this.text = text;
      this.subtasks = [];
    }
  
    addSubtask(task) {
      this.subtasks.push(task);
    }
  
    getSubtasks() {
      return this.subtasks;
    }
  }
  
  export default TaskComposite;