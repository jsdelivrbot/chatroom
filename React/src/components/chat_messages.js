import React, { Component } from 'react';
import axios from "axios"

export default class ChatMessages extends Component {
	constructor(props){
		super(props);
		this.state = {
			chatMessages : []
		};
		this.interval = setInterval(() => this.getMessages(), 100);
	}

	renderMessages(m) {
		return (
			<div>
				{m.user_name + ": " + m.message}
			</div>
		)			
	}

	getMessages(){
		axios.get('http://127.0.0.1:5000/get_recent_messages')
		.then(response => this.handleResponse(response));
	}

	handleResponse(response){
		console.log(response.data);
		this.setState({ chatMessages: response.data });
	}

	render(){
		return(
			<div>
				<div className="chat-messages">
					<div className="messages">
						{this.state.chatMessages.map((m) => this.renderMessages(m))} 
					</div>
				</div>
			</div>
		);
	}
}