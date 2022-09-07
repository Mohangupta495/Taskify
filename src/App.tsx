import React, {Component} from "react";
import Inputfield from "./Inputfield";
import {Todos} from "./model";
import Todolist from "./componants/Todolist";
import "./app.css";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
// import { MdFollowTheSigns } from "react-icons/md";

interface typeState {
  todo: string;
  todos: Todos[];
  completeTodo: Todos[];
}
export default class App extends Component<{}, typeState> {
  state = {
    todo: "",
    todos: [{id: 101, todo: "hello, This is your Taskify", isDone: false}],
    completeTodo: [
      {id: 102, todo: "hello, This is your complted Taskify", isDone: true},
    ],
  };
  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({todo: e.target.value});
  };
  handleGoBtn = (e: React.FormEvent) => {
    e.preventDefault();

    if (this.state.todo) {
      this.setState({
        todos: [
          ...this.state.todos,
          {id: Date.now(), todo: this.state.todo, isDone: false},
        ],
      });
    }
    this.setState({todo: ""});
  };
  handleDone = (id: number) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        return todo.id === id ? {...todo, isDone: !todo.isDone} : todo;
      }),
    });
  };
  handleDelete = (id: number) => {
    this.setState({todos: this.state.todos.filter(todo => todo.id !== id)});
  };

  handleNewInput = (e: React.FormEvent, id: number, todo: string) => {
    e.preventDefault();
    this.setState({
      todos: this.state.todos.map(todos =>
        todos.id === id ? {...todos, todo: todo} : todos,
      ),
    });
    // console.log(this.props.todos.map((todos)=>todos.id===id?{...todos,todo:this.state.editTodo}:todos))
  };
  handleCompleteTodo = () => {
    console.log("handleCompleteTodo is running.....");
  };
  handleDnD=(result:DropResult)=>{
    console.log(result);
    
  }
  render() {
    // console.log(this.state.todos);

    return (
      <DragDropContext onDragEnd={this.handleDnD}>
      <div className="App">
        <span className="heading">Taskify</span>
        <Inputfield
          todo={this.state.todo}
          handleInput={this.handleInput}
          handleGoBtn={this.handleGoBtn}
        />
        <Todolist
          todos={this.state.todos}
          handleDone={this.handleDone}
          handleDelete={this.handleDelete}
          handleNewInput={this.handleNewInput}
          completeTodo={this.state.completeTodo}
          handleCompleteTodo={this.handleCompleteTodo}
        />
      </div>
      </DragDropContext>
    );
  }
}
