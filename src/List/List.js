import React,{ Component } from 'react';
import './List.css';

class List extends Component{

	state={
		isChecked: false
	}

	componentDidMount = () => {
		const {board,todo} = this.props;

		const boardid = board.id;
		const todoid = todo.id;

		/* eslint-env browser */

		const boardslocal = JSON.parse(localStorage.getItem('boards'));
		const index = boardslocal.findIndex(i => i.id===boardid);

		const localtodos = boardslocal[index].todos;
		const ind = localtodos.findIndex(i => i.id===todoid);

		this.setState({
			isChecked: localtodos[ind].checked
		})

	}

	checkboxHandler = () => {
		const {isChecked} = this.state;
		const {board,todo} = this.props;

		const boardid = board.id;
		const todoid = todo.id;

		const boardslocal = JSON.parse(localStorage.getItem('boards'));
		const index = boardslocal.findIndex(i => i.id===boardid);

		const localtodos = boardslocal[index].todos;
		const ind = localtodos.findIndex(i => i.id===todoid);

		localtodos[ind].checked = !isChecked;
		boardslocal[index].todos = localtodos;

		this.setState({isChecked: !isChecked});

		localStorage.setItem('boards',JSON.stringify(boardslocal));
	}

	render(){
		const listSyles = {
			listStyle: 'none',
		};

		const {isChecked} = this.state;
		const {todo,remove} = this.props;
		const listclass = (isChecked) ? 'checked' : 'unchecked';
		const textclass = (isChecked) ? 'text-checked' : 'text-unchecked';

		return(
  <li
    style={listSyles}
    id={todo.id}
    className={`output ${listclass}`}
  >
    <div className="check-wrapper">
      <input
        type="checkbox"
        className="check-todo"
        onChange={() => this.checkboxHandler()}
        checked={isChecked}
      />
      <span className={`todo-text ${textclass}`}>{todo.todotext}</span>
    </div>

    <button type="button" onClick={() => remove(todo)} className="remove-btn">
				Delete
    </button>
  </li>
		);
	}

}

export default List;
