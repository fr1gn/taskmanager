import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskFactory from './TaskFactory'; // Factory Method Pattern
import TaskRepository from './TaskRepository'; // Singleton Pattern
import Task from './components/Task';
import TrelloAdapter from './TrelloAdapter'; // Adapter Pattern
import TaskComposite from './TaskComposite'; // Composite Pattern
import TaskObserver from './TaskObserver'; // Observer Pattern
import TaskSorting from './TaskSorting'; // Strategy Pattern
import TaskCommand from './TaskCommand'; // Command Pattern

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
  }, []);

  const handleAddTask = async () => {
    if (!taskText.trim()) {
      Alert.alert('Task cannot be empty');
      return;
    }
    
    Keyboard.dismiss();
    const newTask = TaskFactory.createTask(taskText, 'personal');
    TaskRepository.addTask(newTask);
    const updatedTasks = [...taskItems, newTask];
    setTaskItems(updatedTasks);
    setTaskText('');

    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    Alert.alert('Task Added', `Task "${newTask.text}" has been added!`);
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {taskItems.map((item) => (
              <Task 
                key={item.id} 
                text={item.text} 
                completed={item.completed} 
                onComplete={() => completeTask(item.id)} // Pass task ID to completeTask
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
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});