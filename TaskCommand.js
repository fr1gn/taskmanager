class TaskCommand {
    constructor(taskManager) {
      this.taskManager = taskManager;
      this.history = [];
      this.redoStack = [];
    }
  
    execute(command) {
      this.history.push(command);
      command.execute();
    }
  
    undo() {
      const command = this.history.pop();
      if (command) {
        command.undo();
        this.redoStack.push(command);
      }
    }
  
    redo() {
      const command = this.redoStack.pop();
      if (command) {
        command.execute();
        this.history.push(command);
      }
    }
  }
  
  export default TaskCommand;  