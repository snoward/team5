import React from 'react';
import io from 'socket.io-client';

import { createContact } from '../../../lib/apiRequests/contacts';
import { createPrivateConversation } from '../../../lib/apiRequests/conversations';

import './styles.css';

export default class AddToContactsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            placeholder: 'Добавить новый контакт',
            disabled: false
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

        const contactName = this.state.inputValue;
        this.setState({
            disabled: true,
            placeholder: 'Запрос обрабатывается',
            inputValue: ''
        });

        const [contactRes, conversationRes] = await Promise.all([
            createContact(contactName),
            createPrivateConversation(this.props.currentUser, contactName)
        ]);

        if (!contactRes.data.error) {
            this.handleGoodResponse(contactRes);
        } else {
            this.handleBadResponse(contactRes.data.error);
        }

        if (!conversationRes.data.error) {
            this.socket.emit('newConversation', conversationRes.data);
        }
    }

    handleGoodResponse(contactRes) {
        this.setState({
            inputValue: '',
            placeholder: 'Добавить новый контакт',
            disabled: false
        });

        this.props.handleNewContact(contactRes.data);
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
            <form className='add-contact-form' onSubmit={this.handleSubmit}>
                <input className='add-contact-form__input' type='text'
                    placeholder={this.state.placeholder}
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    disabled={this.state.disabled}/>
            </form>
        );
    }
}
