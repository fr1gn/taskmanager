import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskFactory from './TaskFactory';
import TaskRepository from './TaskRepository';
import AddTaskCommand from './AddTaskCommand';
import Task from './components/Task';
import TaskObserver from './TaskObserver';
import TaskSorting from './TaskSorting';
import TaskCommand from './TaskCommand';

const taskObserver = new TaskObserver();
const taskCommand = new TaskCommand(TaskRepository);

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [taskItems, setTaskItems] = useState(TaskRepository.getTasks());
  const [editingTaskId, setEditingTaskId] = useState(null); // ID of the task being edited
  const [descriptionInput, setDescriptionInput] = useState(''); // Description input for editing

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTaskItems(JSON.parse(storedTasks));
      }
    };
    loadTasks();
    taskObserver.subscribe((task) => Alert.alert('Observer', `New task added: ${task.text}`));
  }, []);

  const handleAddTask = async () => {
    if (!taskText.trim()) {
      Alert.alert('Task cannot be empty');
      return;
    }

    Keyboard.dismiss();
    const newTask = TaskFactory.createTask(taskText, 'personal');
    const addTaskCommand = new AddTaskCommand(newTask);

    taskCommand.execute(addTaskCommand);
    const updatedTasks = [...taskItems, newTask];
    setTaskItems(updatedTasks);
    setTaskText('');
    taskObserver.notify(newTask);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const completeTask = async (id) => {
    const updatedTasks = taskItems.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
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
    taskCommand.undo();
    setTaskItems([...TaskRepository.getTasks()]);
  };

  const sortTasks = () => {
    const sortedTasks = TaskSorting.sortByDate(taskItems);
    setTaskItems([...sortedTasks]);
  };

  const startEditDescription = (id, currentDescription) => {
    setEditingTaskId(id);
    setDescriptionInput(currentDescription || '');
  };

  const saveDescription = async () => {
    const updatedTasks = taskItems.map(task => {
      if (task.id === editingTaskId) {
        task.description = descriptionInput; // Update description
      }
      return task;
    });
    setTaskItems(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setEditingTaskId(null); // Reset editing state
    setDescriptionInput(''); // Clear input
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
                description={item.description} // Display description
                completed={item.completed}
                onComplete={() => completeTask(item.id)}
                onDelete={() => deleteTask(item.id)}
                onEdit={() => startEditDescription(item.id, item.description)} // Edit description functionality
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {editingTaskId ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.editDescriptionWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={'Edit description'}
            value={descriptionInput}
            onChangeText={setDescriptionInput}
          />
          <TouchableOpacity onPress={saveDescription}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>Save</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      ) : (
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
      )}
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
    fontSize: 24,
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
  editDescriptionWrapper: {
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
    width: '70%', // Responsive width
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
    fontSize: 18,
  },
  undoButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 10,
  },
  undoText: {
    color: '#FFF',
    fontSize: 16,
  },
});