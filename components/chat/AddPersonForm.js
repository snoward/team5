import axios from 'axios';
import React from 'react';
import io from 'socket.io-client';

export default class AddPersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPerson: '',
            placeholder: 'Add user to conversation'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.socket = io();
    }

    handleChange(event) {
        this.setState({ currentPerson: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();

        const res = await axios.patch(`api/conversations/${this.props.conversationId}`,
            { username: this.state.currentPerson },
            {
                withCredentials: true,
                responseType: 'json',
                validateStatus: () => true
            });

        if (res.status === 201) {
            this.handleGoodResponse(res);
        } else {
            this.handleBadResponse(res);
        }
    }

    handleGoodResponse(res) {
        this.socket.emit('conversation', {
            addedUser: this.state.currentPerson,
            conversation: res.data
        });
        this.setState({
            currentPerson: '',
            placeholder: 'Add user to conversation'
        });
    }

    handleBadResponse() {
        this.setState({
            currentPerson: '',
            placeholder: 'Error occured'
        });
    }

    render() {
        return (
            <div>
                <form className='add-person-form' onSubmit={this.handleSubmit}>
                    <input className='add-person-input' type='text'
                        placeholder={this.state.placeholder}
                        value={this.state.currentPerson}
                        onChange={this.handleChange} />
                    <style jsx>
                        {`
                            .add-person-form
                            {
                                margin-top: 50px;
                                width: 95%;
                                border: none;
                            }

                            .add-person-input
                            {
                                border: none;                                
                                width: 100%;
                                padding-left: 10px;
                                border: 1px solid #c7c7bf;
                                border-radius: 4px;                              
                            }

                            .add-person-form, .add-person-input
                            {
                                height: 30px;
                            }
                        `}
                    </style>
                </form>
            </div>
        );
    }
}
