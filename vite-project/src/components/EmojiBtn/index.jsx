import React, { Component } from "react";

class EmojiBtn extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onVote(this.props.emoji);
  }

  render() {
    return (
      <button className="emoji-btn-container" onClick={this.handleClick}>
        <div className="emoji-img">{this.props.emoji}</div>
        <div className="emoji-score">{this.props.score}</div>
      </button>
    );
  }
}

export default EmojiBtn;
