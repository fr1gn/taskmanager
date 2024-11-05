import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskFactory from './TaskFactory'; // Factory Pattern
import TaskRepository from './TaskRepository'; // Singleton Pattern
import AddTaskCommand from './AddTaskCommand';
import Task from './components/Task';
import TaskObserver from './TaskObserver'; // Observer Pattern
import TaskSorting from './TaskSorting'; // Strategy Pattern
import TaskCommand from './TaskCommand'; // Command Pattern

const taskObserver = new TaskObserver(); // Observer instance
const taskCommand = new TaskCommand(TaskRepository); // Command with TaskRepository

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [taskItems, setTaskItems] = useState(TaskRepository.getTasks());

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTaskItems(JSON.parse(storedTasks));
      }
    };
    loadTasks();
    taskObserver.subscribe((task) => Alert.alert('Observer', `New task added: ${task.text}`)); // Observer alert
  }, []);

  const handleAddTask = async () => {
    if (!taskText.trim()) {
      Alert.alert('Task cannot be empty');
      return;
    }

    Keyboard.dismiss();
    const newTask = TaskFactory.createTask(taskText, 'personal');
    const addTaskCommand = new AddTaskCommand(newTask);

    taskCommand.execute(addTaskCommand); // Execute add task command
    const updatedTasks = [...taskItems, newTask];
    setTaskItems(updatedTasks);
    setTaskText('');
    taskObserver.notify(newTask); // Notify observers
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const completeTask = async (id) => {
    const updatedTasks = taskItems.map(task => {
      if (task.id === id) {
        task.completed = !task.completed; // Toggle the completed status
      }
      return task;
    });
    setTaskItems(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = async (id) => {
    const updatedTasks = taskItems.filter(task => task.id !== id);
    setTaskItems(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const undoLastAction = () => {
    taskCommand.undo(); // Undo the last action
    setTaskItems([...TaskRepository.getTasks()]);
  };

  const sortTasks = () => {
    const sortedTasks = TaskSorting.sortByDate(taskItems);
    setTaskItems([...sortedTasks]);
  };

  return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Today's tasks</Text>
            <TouchableOpacity style={styles.sortButton} onPress={sortTasks}>
              <Text style={styles.sortText}>Sort by Date</Text>
            </TouchableOpacity>
            <View style={styles.items}>
              {taskItems.map((item) => (
                  <Task
                      key={item.id}
                      text={item.text}
                      completed={item.completed}
                      onComplete={() => completeTask(item.id)}
                      onDelete={() => deleteTask(item.id)} // Delete functionality
                  />
              ))}
            </View>
          </View>
        </ScrollView>

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.writeTaskWrapper}
        >
          <TextInput
              style={styles.input}
              placeholder={'Write a task'}
              value={taskText}
              onChangeText={setTaskText}
          />
          <TouchableOpacity onPress={handleAddTask}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={undoLastAction} style={styles.undoButton}>
            <Text style={styles.undoText}>Undo</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F7FF',
    paddingTop: 40,
  },
  tasksWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sortButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#5DA3FA',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  sortText: {
    color: '#FFF',
    fontSize: 16,
  },
  items: {
    marginTop: 15,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 25,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 200,
    fontSize: 16,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#5DA3FA',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: '#FFF',
    fontSize: 24,
  },
  undoButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  undoText: {
    color: '#FFF',
    fontSize: 16,
  },
});
