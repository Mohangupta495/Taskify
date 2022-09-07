import React, {Component} from "react";

interface typeProps {
  todo: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGoBtn: (e: React.FormEvent) => void;
}
export default class Inputfield extends Component<typeProps> {
  inputRef = React.createRef<HTMLInputElement>();
  render() {
    return (
      <form
        className="form"
        onSubmit={e => {
          this.props.handleGoBtn(e);
          this.inputRef.current?.blur();
        }}
      >
        <input
          type="text"
          className="input"
          placeholder="Enter your todo"
          onChange={e => {
            this.props.handleInput(e);
          }}
          value={this.props.todo}
          ref={this.inputRef}
        />
        <button className="submit-btn" type="submit">
          Go
        </button>
      </form>
    );
  }
}
