import React from "react";
import {Clue, CluedLetter } from "./clue";
import "./Row.css";

interface RowProps {
  cluedLetters: CluedLetter[];
}

export function getClueClass(clue?: Clue): string {
    if (clue === undefined || clue === Clue.Absent) {
      return "letter-absent";
    } else if (clue === Clue.Elsewhere) {
      return "letter-elsewhere";
    } else {
      return "letter-correct";
    }
  }

class Row extends React.Component<RowProps, any> {
  render() {
    let tds = [];

    for (let i = 0; i < this.props.cluedLetters.length; i++) {
      const cluedLetter = this.props.cluedLetters[i];
      tds.push(
        <td key={cluedLetter.letter} className={"row-letter " + getClueClass(cluedLetter.clue)}>
          {cluedLetter.letter}
        </td>
      );
    }
    return <tr className="row">{tds}</tr>;
  }
}

export default Row;
