import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TaskList from "./components/TaskList";
const App = () => {
  let todo = {
    task: "",
    createdAt: new Date().toISOString(),
  };
  const [todos, setTodos] = useState(todo);
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddTask = () => {
    if (todos) {
      if (editIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = todos;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([...tasks, todos]);
      }

      setTodos(todo);
    }
  };

  const handleEditTask = (index) => {
    console.log(index);
    let task = tasks[index];
    setTodos(task);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };
  const onChangeEvent = (text) => {
    let _todos = { ...todos };
    _todos["task"] = text;
    setTodos(_todos);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native TODO</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={todos?.task}
        onChangeText={(text) => onChangeEvent(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>
          {editIndex !== -1 ? "Update" : "Add"}
        </Text>
      </TouchableOpacity>
      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: "green",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});

export default App;
