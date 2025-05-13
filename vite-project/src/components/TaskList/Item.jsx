import React, { Component } from "react";

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.task.id);
  }

  handleDone() {
    this.props.onDone(this.props.task.id);
  }

  render() {
    return (
      <div className="task-container">
        <div className="task-title">{this.props.task.text}</div>
        {this.props.task.done ? (
          <div>Done</div>
        ) : (
          <>
            <div className="task-controls">
              <button
                className="control-btn done-btn"
                onClick={this.handleDone}
              >
                Done
              </button>
              <button
                className="control-btn delete-btn"
                onClick={this.handleDelete}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Item;
