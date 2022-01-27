import React, { Ref, RefObject } from "react";
import "./WordInput.css";
class WordInput extends React.Component<any, any> {
  private inputRef: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.inputRef = React.createRef();
  }
  handleKeyUp = (event: any) => {
    const val = event.target.value.toUpperCase();
    if (event.key === "Enter") {
      if (val.length === this.props.maxLength) {
        this.props.onEnter(val);
        this.resetInput();
      }
    }
  };
  resetInput = () => {
    const currentRef = this.inputRef.current;
    if (currentRef != null) {
      currentRef.value = "";
    }
  };
  render() {
    return (
      <div className="word-input-container">
        <input
          onKeyUp={this.handleKeyUp}
          ref={this.inputRef}
          maxLength={this.props.maxLength}
          className="word-input"
          type="text"
        ></input>
      </div>
    );
  }
}

export default WordInput;
