class TaskRepository {
    constructor() {
      if (!TaskRepository.instance) {
        this.tasks = [];
        TaskRepository.instance = this;
      }
      return TaskRepository.instance;
    }
  
    addTask(task) {
      this.tasks.push(task);
    }
  
    getTasks() {
      return this.tasks;
    }
  }
  
  const instance = new TaskRepository();
  Object.freeze(instance);
  
  export default instance;
  