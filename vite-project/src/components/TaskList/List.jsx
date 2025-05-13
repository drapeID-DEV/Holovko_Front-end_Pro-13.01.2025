import React, { Component } from "react";
import Item from "./Item";

class List extends React.Component {
  render() {
    return (
      <ul className="task-list">
        {this.props.todo.map((task) => (
          <Item
            task={task}
            onDelete={this.props.onDelete}
            onDone={this.props.onDone}
          />
        ))}
      </ul>
    );
  }
}

export default List;
