class TaskSorting {
    static sortByDate(tasks) {
      return tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  
    static sortByPriority(tasks) {
      return tasks.sort((a, b) => a.priority - b.priority);
    }
  }
  
  export default TaskSorting;  