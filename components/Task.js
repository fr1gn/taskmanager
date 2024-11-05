import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Task({ text, description, completed, onComplete, onDelete, onEdit }) {
  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskContent}>
        <TouchableOpacity onPress={onComplete} style={styles.checkbox}>
          {completed && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <Text style={[styles.taskText, completed && styles.completedText]}>{text}</Text>
      </View>
      {description ? (
        <Text style={styles.descriptionText}>{description}</Text>
      ) : (
        <Text style={styles.noDescriptionText}>No description</Text>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#C0C0C0',
    borderWidth: 2,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 16,
    color: '#5DA3FA',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#A9A9A9',
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    fontStyle: 'italic',
  },
  noDescriptionText: {
    fontSize: 14,
    color: '#AAA',
    marginTop: 5,
    fontStyle: 'italic',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#5DA3FA',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
  },
});