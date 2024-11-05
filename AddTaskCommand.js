import TaskRepository from './TaskRepository'; // Ensure the path is correct

class AddTaskCommand {
    constructor(task) {
        this.task = task;
    }

    execute() {
        TaskRepository.addTask(this.task); // This now correctly references TaskRepository
    }
}

export default AddTaskCommand;
