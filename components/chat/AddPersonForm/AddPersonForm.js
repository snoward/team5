import React from 'react';
import io from 'socket.io-client';

import { addUserToConversation } from '../../../lib/apiRequests/conversations';

import './styles.css';

export default class AddPersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            placeholder: 'Добавить пользователя в беседу',
            disabled: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.socket = io();
    }

    handleChange(event) {
        this.setState({ inputValue: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();

        const userToAdd = this.state.inputValue;
        this.setState({
            disabled: true,
            placeholder: 'Запрос обрабатывается',
            inputValue: ''
        });

        const res = await addUserToConversation(this.props.conversationId, userToAdd);

        if (!res.data.error) {
            this.handleGoodResponse(res, userToAdd);
        } else {
            this.handleBadResponse(res.data.error);
        }
    }

    handleGoodResponse(res, userToAdd) {
        this.socket.emit('conversationNewUser', {
            addedUser: userToAdd,
            conversation: res.data
        });

        this.setState({
            inputValue: '',
            placeholder: 'Добавить пользователя в беседу',
            disabled: false
        });
    }

    handleBadResponse(error) {
        this.setState({
            inputValue: '',
            placeholder: error.message,
            disabled: false
        });
    }

    render() {
        return (
            <form className='add-to-chat-form' onSubmit={this.handleSubmit}>
                <input className='add-to-chat-form__input' type='text'
                    placeholder={this.state.placeholder}
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    disabled={this.state.disabled}/>
            </form>
        );
    }
}
