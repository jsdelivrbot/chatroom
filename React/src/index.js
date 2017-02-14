import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ChatMessages from './components/chat_messages';
import ChatBar from './components/chat_bar';

class App extends Component {
	
	render(){
		return (
			<div>
				<ChatMessages />			
				<ChatBar />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));
