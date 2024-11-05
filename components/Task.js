import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Task = ({ text, completed, onComplete }) => {
  return (
    <TouchableOpacity onPress={onComplete} accessible={true} accessibilityLabel={`Complete task: ${text}`}>
      <View style={[styles.item, completed ? styles.completed : null]}>
        <View style={styles.itemLeft}>
          <View style={[styles.square, completed ? styles.completedSquare : styles.incompleteSquare]} />
          <Text style={[styles.itemText, completed ? styles.completedText : null]}>{text}</Text>
        </View>
        <View style={[styles.circular, completed ? styles.completedCircular : null]} />
      </View>
    </TouchableOpacity>
  );
};

// Define prop types for better type checking
Task.propTypes = {
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  onComplete: PropTypes.func.isRequired,
};

Task.defaultProps = {
  completed: false,
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  completed: {
    backgroundColor: '#d3ffd3', // Light green background for completed tasks
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    borderRadius: 5,
    marginRight: 15,
  },
  incompleteSquare: {
    backgroundColor: '#55BCF6',
    opacity: 0.4,
  },
  completedSquare: {
    backgroundColor: '#4caf50', // Green color for completed tasks
  },
  itemText: {
    maxWidth: '80%',
  },
  completedText: {
    textDecorationLine: 'line-through', // Strike-through for completed tasks
    color: '#aaa',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  completedCircular: {
    borderColor: '#4caf50', // Green color for completed circular indicator
  },
});

export default Task;