class TaskObserver {
    constructor() {
      this.subscribers = [];
    }
  
    subscribe(callback) {
      this.subscribers.push(callback);
    }
  
    unsubscribe(callback) {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    }
  
    notify(task) {
      this.subscribers.forEach(callback => callback(task));
    }
  }
  
  export default TaskObserver;
  