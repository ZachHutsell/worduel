import React from "react";
import './Row.css';

enum Condition {
    Clicked,
    NotClicked
}
type MyState = { message: string, className: string, condition: Condition }

const defaultState: MyState = {
    message: 'has not been clicked :(',
    className: '',
    condition: Condition.NotClicked
}

const clickedState: MyState = {
    message: 'has been clicked!',
    className: 'clicked',
    condition: Condition.Clicked
}

class Row extends React.Component<any, MyState> {
    constructor(props: any) {
        super(props);
        this.state = defaultState;

    }
    onHeaderClick() {
        if (this.state.condition === Condition.NotClicked) {
            this.setState(clickedState);
        }
    }
    onButtonClick() {
        this.setState(defaultState);
    }
    render() {
        const clicked = this.state.condition === Condition.Clicked;
        let button;
        if (clicked) {
            button = <button className="btn" onClick={() => this.onButtonClick()}>reset!</button>;
        }
        return (
            // <div className="container">
            //     <p className="message + {this.state.className}" onClick={() => this.onHeaderClick()}>This row {this.state.message}</p>
            //     {button}
            // </div>
            <tr className="row">
                <td className="row-letter">A</td>
                <td className="row-letter">B</td>
                <td className="row-letter">C</td>
                <td className="row-letter">D</td>
                <td className="row-letter">E</td>
            </tr>
        )
    }
}

export default Row;