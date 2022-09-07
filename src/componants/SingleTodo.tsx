import React, {Component, createRef} from "react";
import {Todos} from "../model";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import {Draggable} from "react-beautiful-dnd";
import Todolist from "./Todolist";

interface typeState {
  edit: boolean;
  editTodo: string;
}

interface typeProps {
  todo: Todos;
  todos: Todos[];
  handleDone: (id: number) => void;
  handleDelete: (id: number) => void;
  handleNewInput: (e: React.FormEvent, id: number, todo: string) => void;
  index: number;
  // handleCompleteTodo:()=>void;
}

export default class SingleTodo extends Component<typeProps, typeState> {
  inputRef = createRef<HTMLInputElement>();

  state: typeState = {
    edit: false,
    editTodo: this.props.todo.todo,
  };
  handleEdit = () => {
    if (!this.state.edit && !this.props.todo.isDone) {
      this.setState({edit: !this.state.edit});
    }
  };
  componentDidUpdate() {
    if (this.state.edit !== false) {
      this.inputRef.current?.focus();
    }
  }
  render() {
    return (
      <Draggable
        draggableId={this.props.todo.id.toString()}
        index={this.props.index}
      >
        {provided => (
          <form
            className="todo_single"
            onSubmit={e => {
              this.props.handleNewInput(
                e,
                this.props.todo.id,
                this.state.editTodo,
              );
              this.setState({edit: !this.state.edit});
            }}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            {this.state.edit ? (
              <input
                className="text__input"
                value={this.state.editTodo}
                onChange={e => {
                  this.setState(    {editTodo: e.target.value});
                }}
                ref={this.inputRef}
              />
            ) : this.props.todo.isDone ? (
              <s className="todo__single_text">{this.props.todo.todo}</s>
            ) : (
              <span className="todo__single_text">{this.props.todo.todo}</span>
            )}
            <div>
              <span
                className="icon"
                onClick={() => {
                  this.handleEdit();
                }}
              >
                <AiFillEdit />
              </span>
              <span
                className="icon"
                onClick={() => {
                  this.props.handleDelete(this.props.todo.id);
                }}
              >
                <AiFillDelete />
              </span>
              <span
                className="icon"
                onClick={() => {
                  this.props.handleDone(this.props.todo.id);
                }}
              >
                <MdDone />
              </span>
            </div>
          </form>
        )}
      </Draggable>
    );
  }
}
