import React from "react";
import { CluedLetter, getClues } from "./clue";
import Row from "./Row";
import WordInput from "./WordInput";
import './GameBoard.css'

interface GameBoardState {
  maxLength: number;
  clues: CluedLetter[][];
}
class GameBoard extends React.Component<any, GameBoardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      maxLength: 5,
      clues: [],
    };
  }
  onWordInputEnter = (enteredWord: string) => {
    this.props.socket.emit("guess", enteredWord);
  };
  componentDidMount() {
    this.props.socket.on('clues', (clues: CluedLetter[]) => {
      let clueState: CluedLetter[][] = this.state.clues;
      clueState.push(clues);
      this.setState({ clues: clueState })
    });
  };
  render() {
    let rows: any[] = [];
    for (let clue of this.state.clues) {
      rows.push(<Row cluedLetters={clue} />);
    }
    return (
      <div>
        <WordInput maxLength={5} onEnter={this.onWordInputEnter} />
        <table className="table-container">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };
}

export default GameBoard;
