import React from "react";
import Row from "./Row";
import WordInput from "./WordInput";

interface GameBoardState {
  maxLength: number;
  enteredWords: string[];
}
class GameBoard extends React.Component<any, GameBoardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      maxLength: 5,
      enteredWords: [],
    };
  }
  onWordInputEnter = (enteredWord: string) => {
    console.log(enteredWord);
    let enteredWords = this.state.enteredWords;
    enteredWords.push(enteredWord);
    this.setState({
        enteredWords: enteredWords
    })
  }
  render() {
    let rows: any[] = [];
    for(let word of this.state.enteredWords) {
        rows.push(<Row/>);
    }
    return (
      <div>
        <WordInput
          maxLength={5}
          onEnter={this.onWordInputEnter}
        />
        {rows}
      </div>
    );
  }
}

export default GameBoard;
