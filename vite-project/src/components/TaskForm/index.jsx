import React, { Component } from "react";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskText: ``
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.taskText);
    this.setState({
      taskText: ''
    })
  }

  handleInput(event) {
    const text = event.target.value;
    this.setState({
      taskText: text
    })
  }

  render() {
    return <>
      <form className="task-form" onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.taskText} onChange={this.handleInput} />
        <button type="submit" className="add-btn">Add</button>  
      </form>  
    </>
  }
}

export default TaskForm;
