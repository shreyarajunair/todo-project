import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    };
    fetchTasks();
  }, []);

  // ✅ Add task with date
  const addTask = async (title, date) => {
    const res = await axios.post("/tasks", { title, done: false, date });
    setTasks([...tasks, res.data]);
  };

  // ✅ Toggle completion
  const toggleTask = async (id, done) => {
    const res = await axios.put(`/tasks/${id}`, { done });
    setTasks(tasks.map(t => (t._id === id ? res.data : t)));
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    await axios.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  // ✅ Edit task (fix typing issue)
  const editTask = async (id, title, save = false) => {
    if (save) {
      // Save to backend
      const res = await axios.put(`/tasks/${id}`, { title });
      setTasks(tasks.map(t => (t._id === id ? res.data : t)));
    } else {
      // Update local state while typing
      setTasks(tasks.map(t =>
        t._id === id ? { ...t, title, isEditing: true } : t
      ));
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm onAddTask={addTask} />
      <TodoList
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

export default App;
