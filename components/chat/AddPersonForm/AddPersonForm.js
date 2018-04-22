import axios from 'axios';
import React from 'react';
import io from 'socket.io-client';

import './styles.css';

export default class AddPersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            placeholder: 'Add user to conversation',
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
            placeholder: 'Wait please',
            inputValue: ''
        });

        const res = await axios.patch(`api/conversations/${this.props.conversationId}`,
            { username: userToAdd },
            {
                withCredentials: true,
                responseType: 'json',
                validateStatus: () => true
            });

        if (res.status === 201) {
            this.handleGoodResponse(res, userToAdd);
        } else {
            this.handleBadResponse(res);
        }
    }

    handleGoodResponse(res, userToAdd) {
        this.socket.emit('conversationNewUser', {
            addedUser: userToAdd,
            conversation: res.data
        });
        this.setState({
            inputValue: '',
            placeholder: 'Add user to conversation',
            disabled: false
        });
    }

    handleBadResponse() {
        this.setState({
            inputValue: '',
            placeholder: 'User not found',
            disabled: false
        });
    }

    render() {
        return (
            <div>
                <form className='add-person-form' onSubmit={this.handleSubmit}>
                    <input className='add-person-input' type='text'
                        placeholder={this.state.placeholder}
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                        disabled={this.state.disabled}/>
                </form>
            </div>
        );
    }
}
