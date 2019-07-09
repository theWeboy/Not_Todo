import React, { Component } from 'react';
import './Board.css';
import uuid from 'uuid';
import List from '../List/List';

class Board extends Component{

	state = {
		input: '',
		todos: [],
		title: ''
	}

	componentDidMount = () => {
		const {board} = this.props;
		const boardid = board.id;
		const boardslocal = JSON.parse(localStorage.getItem('boards'));

		if(boardslocal){
			const index = boardslocal.findIndex(i => i.id===boardid);
			// console.log(boardid,index);
			this.setState({
				title: boardslocal[index].text,
				todos: boardslocal[index].todos
			})
		} else{
			console.log('No boards');
		}
	}


	changeHandler = (e) => {
		this.setState({input: e.target.value});
	}

	onSubmitHandler = (e) => {
		e.preventDefault();

		const {input,todos} = this.state;
		if(input.length !== 0){
			const id = uuid();
			const todotext = input;
			const checked = false;

			const newtodo = Object.assign({},{id,todotext,checked});
			const temptodos = Object.assign([],todos);
			temptodos.push(newtodo);

			const {board} = this.props;
			const boardid = board.id;
			const boardslocal = JSON.parse(localStorage.getItem('boards'));
			const index = boardslocal.findIndex(i => i.id===boardid);
			boardslocal[index].todos = temptodos;

			this.setState({
				input:'',
				todos: temptodos
			});

			localStorage.setItem('boards',JSON.stringify(boardslocal));
		} else{
			/* eslint-env browser */
			// eslint-disable-next-line no-alert
			window.alert('Duh! Please refrain from adding empty tasks');
		}

	}

	deleteHandler = (todo) => {
		const {todos} = this.state;
		const temptodos = Object.assign([],todos);

		const {board} = this.props;
		const boardid = board.id;
		const boardslocal = JSON.parse(localStorage.getItem('boards'));
		const index = boardslocal.findIndex(i => i.id===boardid);
		boardslocal[index].todos = temptodos.filter(item => item !== todo);

		this.setState({
			todos:temptodos.filter(item => item !== todo)
		})

		localStorage.setItem('boards',JSON.stringify(boardslocal));
	}

	boardTitleHandler = (e) => {
		this.setState({
			title: e.target.value
		}, () => {
			const {title} = this.state;
			const {board} = this.props;
			const boardid = board.id;
			const boardslocal = JSON.parse(localStorage.getItem('boards'));
			const index = boardslocal.findIndex(i => i.id===boardid);
			boardslocal[index].text = title;
			localStorage.setItem('boards',JSON.stringify(boardslocal));
		})
	}

	render(){

		const {input,todos,title} = this.state;
		const {board,deleteboard} = this.props;

		return(
  <div className="Board">
    <header className="board-header">
      <input
        type="text"
        className="board-title"
        onChange={e => this.boardTitleHandler(e)}
        placeholder="Title of your board goes here..."
        value={title}
      />
      <button
        type="button"
        className="remove-board"
        onClick={() => deleteboard(board)}
      >
				X
      </button>
    </header>

    <form className="inputForm" onSubmit={e => this.onSubmitHandler(e)}>
      <input
        className="todoInput"
        type="text"
        value={input}
        placeholder="Enter your task here..."
        onChange={e => this.changeHandler(e)}
      />
      <button className="add-btn" type="submit">
				Add
      </button>
    </form>

    <ul className="output-list">
      {
				Array.from(todos).reverse().map((todo) => (
  				<List key={todo.id} board={board} todo={todo} remove={this.deleteHandler} />
				))
			}
    </ul>
  </div>

		);
	}
}

export default Board;
