import React from "react";
import { CluedLetter, getClues } from "./clue";
import Row from "./Row";
import WordInput from "./WordInput";
import './GameBoard.css'

interface GameBoardState {
  maxLength: number;
  target: string;
  guesses: string[];
}
class GameBoard extends React.Component<any, GameBoardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      maxLength: 5,
      target: "WORDS",
      guesses: ["ALERT"],
    };
  }
  onWordInputEnter = (enteredWord: string) => {
    let guesses = this.state.guesses;
    guesses.push(enteredWord);
    this.setState({
      guesses: guesses,
    });
  };
  render() {
    let rows: any[] = [];
    for (let guess of this.state.guesses) {
      const cluedLetters: CluedLetter[] = getClues(guess, this.state.target);
      rows.push(<Row key={guess} cluedLetters={cluedLetters} />);
    }
    return (
      <div>
        <WordInput maxLength={5} onEnter={this.onWordInputEnter} />
        <table className="table-container">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default GameBoard;
