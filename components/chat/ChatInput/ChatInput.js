import axios from 'axios';
import React from 'react';
import { Input } from 'react-chat-elements';

import './styles.css';

export default class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value.split('\n').join('\n\n') });
    }

    async handleSubmit(event) {
        const self = this;

        this.props.socket.emit('message', {
            conversationId: this.props.conversationId,
            text: self.state.value,
            user: this.props.currentUser
        });

        event.preventDefault();

        axios.post(`api/messages/${this.props.conversationId}`,
            { 'text': self.state.value },
            { withCredentials: true, responseType: 'json' });

        this.setState({ value: '' });
    }

    render() {
        return (
            <div>
                <Input
                    className='chatInput'
                    placeholder="Введите новое сообщение"
                    ref='input'
                    defaultValue={this.state.value}
                    multiline={true}
                    onKeyPress={async (e) => {
                        if (e.shiftKey && e.charCode === 13) {

                            return true;
                        }
                        if (e.charCode === 13) {
                            await this.handleChange(e);
                            await this.handleSubmit(e);
                            this.refs.input.clear();
                            e.persist();

                            return false;
                        }
                    }}
                />
            </div>
        );
    }
}
