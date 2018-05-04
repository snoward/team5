import React from 'react';
import io from 'socket.io-client';

import { createNotPrivateConversation } from '../../../../lib/apiRequests/conversations';

import './styles.css';

import LoadingSpinner from '../../../LoadingSpinner';

export default class CreateConversationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleCloseModal: props.handleCloseModal,
            inputValue: '',
            disabled: false,
            placeholder: 'Название беседы'
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
            placeholder: 'Запрос обрабатывается'
        });

        const res = await createNotPrivateConversation(conversationName, [this.props.currentUser]);

        this.socket.emit('newConversation', res.data);

        this.state.handleCloseModal();
    }

    render() {
        return (
            <div className='create-conversation'>
                {this.state.disabled ? <LoadingSpinner /> : null}
                <form onSubmit={this.handleSubmit}>
                    <header className='create-conversation__header'>Создать беседу</header>
                    <input
                        type='text'
                        className='create-conversation__input'
                        placeholder={this.state.placeholder}
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                        disabled={this.state.disabled}
                        autoFocus
                    />
                </form>
            </div>
        );
    }
}
