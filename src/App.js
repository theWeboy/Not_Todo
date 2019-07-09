/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import './App.css';
import uuid from 'uuid';
import Board from './Board/Board';

class App extends Component {

	constructor(){
		super();
		this.state = {
			boards: [],
			counter: 0
		}
	}

	componentDidMount = () => {
		const boards = localStorage.getItem('boards');
		if(boards){
			const localboards = JSON.parse(boards);
			this.setState({
				boards: localboards
			})
		} else {
			console.log('No boards!!');
		}
	}

	addBoardHandler =  () => {
		const {counter,boards} = this.state;
		const id = uuid();
		const text = '';

		const newboard = Object.assign({},{id,text,todos:[]});
		const tempBoard = Object.assign([],boards);
		tempBoard.push(newboard);

		/* eslint-env browser */

		this.setState({
			counter: counter+1,
			boards: tempBoard
		})

		localStorage.setItem('boards',JSON.stringify(tempBoard));
	}

	deleteBoardHandler = async (board) => {
		const {boards} = this.state;
		const tempboards = Object.assign([],boards).filter(i => i.id!==board.id);

		await this.setState({
			boards: tempboards
		});

		localStorage.setItem('boards',JSON.stringify(tempboards));
	}

	render(){
		const {boards} = this.state;

		return (
  		<div className="App">
    		<h1>Not-TODO</h1>
        <button
          type="button"
          className="btn-primary"
          onClick={this.addBoardHandler}
        >
          Add new board
        </button>

        <div className="todo-wrapper">
          {
          Array.from(boards).map((board) => (
          <Board
            key={board.id}
            board={board}
            deleteboard={this.deleteBoardHandler}
            addBoard={this.addBoardHandler}
            text={board.text}
          />
		    ))
		    }
      </div>
    </div>
		);
	}
}

export default App;
