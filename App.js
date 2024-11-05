import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './components/Task';

// Task Factory
const createTask = (text) => {
  return {
    text,
    id: Date.now(), // Unique ID based on the current timestamp
    completed: false, // New property to track completion
  };
};

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    // Load tasks from local storage when the app starts
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTaskItems(JSON.parse(storedTasks));
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (!task.trim()) {
      Alert.alert('Task cannot be empty');
      return;
    }
    
    Keyboard.dismiss();
    const newTask = createTask(task);
    const updatedTasks = [...taskItems, newTask];
    setTaskItems(updatedTasks);
    setTask('');

    // Save tasks to local storage
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    notifyTaskAdded(newTask);
  };

  const completeTask = async (id) => {
    const updatedTasks = taskItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTaskItems(updatedTasks);

    // Update local storage
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    notifyTaskCompleted(id);
  };

  // Notification functions
  const notifyTaskAdded = (task) => {
    Alert.alert('Task Added', `Task "${task.text}" has been added!`);
  };

  const notifyTaskCompleted = (id) => {
    Alert.alert('Task Completed', `Task with ID "${id}" has been completed!`);
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
                onComplete={() => completeTask(item.id)} 
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
          value={task} 
          onChangeText={setTask} 
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