import React, { Component } from "react";
import "./App.css";
import EmojiBtn from "./components/EmojiBtn";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emojis: {
        "👍": 0,
        "❤️": 0,
        "🔥": 0,
        "🎉": 0,
        "😂": 0,
      },
    };

    this.handleVote = this.handleVote.bind(this);
    this.showResult = this.showResult.bind(this);
  }

  handleVote(emoji) {
    const updatedScore = { ...this.state.emojis };
    updatedScore[emoji] += 1;

    this.setState({ emojis: updatedScore });
  }

  showResult() {
    const emojiList = this.state.emojis;
    let winnersList;
    let maxScore = 0;

    Object.entries(emojiList).forEach(([key, value]) => {
      if (emojiList[key] == maxScore) {
        if (winnersList) {
          const updatedWinners = { ...winnersList };
          updatedWinners[key] = [value];
          winnersList = updatedWinners;
        } else {
          winnersList = { [key]: [value] };
        }
      } else if (emojiList[key] > maxScore) {
        maxScore = emojiList[key];
        winnersList = { [key]: [value] };
      }
    });

    this.setState({
      winner: winnersList,
    });
  }

  render() {
    return (
      <>
        {!this.state.winner ? (
          <>
            <div className="emojis-container">
              {Object.entries(this.state.emojis).map(([key, value]) => (
                <EmojiBtn emoji={key} score={value} onVote={this.handleVote} />
              ))}
            </div>
            <button onClick={this.showResult} className="control-btn">
              Show result
            </button>
          </>
        ) : (
          <>
            <h1>
              {Object.keys(this.state.winner).length === 1 ? "Winner" : "Draw"}
            </h1>
            <div className="winner-container">
              {Object.entries(this.state.winner).map(([key, value]) => (
                <div className="emoji-btn-container" onClick={this.handleClick}>
                  <div className="emoji-img">{key}</div>
                  <div className="emoji-score">{value}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    );
  }
}

export default App;
