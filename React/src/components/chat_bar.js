import React, { Component } from 'react'; 
import axios from "axios"

export default class ChatBar extends Component { 
	constructor(props){
		super(props);		
		this.state = { message: ""};
	}

	handleKeyPress = (event) => {
 	 	if(event.key == 'Enter'){
    		console.log('sending message: ' + this.state.message);
    		axios.post('http://127.0.0.1:5000/post_message', { 
    			user_name : 'admin', 
    			message : this.state.message 
    		})
    		.then(() => { this.setState({message: ""}) }) //Clear message field
  		}
	}

	render() { 
		return (
			<div className="chat-bar">
				<input
				value={this.state.message}
				onChange={event => this.onInputChange(event.target.value)}
				onKeyPress={this.handleKeyPress} />
			</div>
		);
	}

	onInputChange(message) {
		this.setState({message});
	}
}