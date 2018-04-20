import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';

export default class CreateConversationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleCloseModal: props.handleCloseModal,
            inputValue: '',
            disabled: false,
            placeholder: 'Conversation name'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.socket = io();
    }

    handleChange(event) {
        this.setState({ inputValue: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();

        const conversationName = this.state.inputValue;
        this.setState({
            disabled: true,
            inputValue: '',
            placeholder: 'Wait please'
        });

        const res = await axios.post(`api/conversations/${conversationName}`,
            { users: [this.props.currentUser], isPrivate: false },
            {
                withCredentials: true,
                responseType: 'json'
            });

        this.socket.emit('newConversation', res.data);

        this.state.handleCloseModal();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <header>Create conversation</header>
                <input
                    type='text'
                    placeholder={this.state.placeholder}
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    disabled={this.state.disabled}
                />
            </form>
        );
    }
}
