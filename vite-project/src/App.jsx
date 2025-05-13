import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import List from "./components/TaskList/List";
import RegisterForm from "./components/RegisterForm";
import { v4 as uuidv4 } from "uuid";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      currentSession: "",
    };

    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.doneTask = this.doneTask.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  saveToLocal(key, newTasks) {
    const userData = JSON.parse(
      localStorage.getItem(this.state.currentSession)
    );
    console.log(userData);
    userData.tasks = newTasks;
    localStorage.setItem(key, JSON.stringify(userData));
  }

  addTask(taskText) {
    const newTasks = [
      ...this.state.tasks,
      { text: taskText, id: uuidv4(), done: false },
    ];
    this.setState({
      tasks: newTasks,
    });
    this.saveToLocal(this.state.currentSession, newTasks);
  }

  deleteTask(id) {
    const newTasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({
      tasks: newTasks,
    });
    this.saveToLocal(this.state.currentSession, newTasks);
  }

  doneTask(id) {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) return { ...task, done: true };
      return task;
    });

    this.setState({
      tasks: newTasks,
    });
    this.saveToLocal(this.state.currentSession, newTasks);
  }

  handleLogin(login) {
    const userData = JSON.parse(localStorage.getItem(login));
    this.setState({
      currentSession: login,
    });

    if (userData.tasks) {
      this.setState({
        tasks: JSON.parse(localStorage.getItem(login)).tasks,
      });
    }
  }

  render() {
    return (
      <>
        {!this.state.currentSession ? (
          <RegisterForm onLogin={this.handleLogin} />
        ) : (
          <>
            <h1 className="tasks-header">Tasks list</h1>
            <TaskForm onSubmit={this.addTask} />
            <List
              todo={this.state.tasks}
              onDelete={this.deleteTask}
              onDone={this.doneTask}
            />
          </>
        )}
      </>
    );
  }
}

export default App;
