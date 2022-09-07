import React, {Component} from "react";
import {Todos} from "../model";
import SingleTodo from "./SingleTodo";
import "../style/todoList.css";
import {Droppable} from "react-beautiful-dnd";
// import SingleTodo from "./SingleTodo";

interface typeProps {
  todos: Todos[];
  completeTodo: Todos[];
  handleDone: (id: number) => void;
  handleDelete: (id: number) => void;
  handleNewInput: (e: React.FormEvent, id: number, todo: string) => void;
  handleCompleteTodo: () => void;
}
export default class Todolist extends Component<typeProps> {
  render() {
    // console.log(this.props.todos);
    return (
      <div className="container">
        <Droppable droppableId="Todolist">
          {provided => (
            <div
              className="all__todo"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="heading">ALL Tasks</span>
              {this.props.todos.map((todo, index) => {
                return (
                  <SingleTodo
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={this.props.todos}
                    handleDone={this.props.handleDone}
                    handleDelete={this.props.handleDelete}
                    handleNewInput={this.props.handleNewInput}
                    {...provided.placeholder}
                  />
                );
              })}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="TodoRemove">
          {provided => (
            <div
              className="done__todo"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="heading">ALL Tasks</span>
              {this.props.completeTodo.map((todo, index) => {
                return (
                  <SingleTodo
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={this.props.completeTodo}
                    handleDone={this.props.handleDone}
                    handleDelete={this.props.handleDelete}
                    handleNewInput={this.props.handleCompleteTodo}
                    {...provided.placeholder}
                    // handleCompleteTodo={this.props.handleCompleteTodo}
                  />
                );
              })}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
