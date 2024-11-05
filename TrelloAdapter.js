class TrelloAdapter {
    constructor(trelloApi) {
      this.trelloApi = trelloApi;
    }
  
    getTasks() {
      return this.trelloApi.getTasks();
    }
  
    createTask(task) {
      this.trelloApi.createTask(task);
    }
  }
  
  export default TrelloAdapter;
  