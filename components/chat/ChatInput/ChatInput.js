import axios from 'axios';
import React from 'react';

import './styles.css';

export default class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.handleSubmit(e).then(this.setState({ value: '' })); // eslint-disable-line no-invalid-this, max-len
        }
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
                <form onSubmit={this.handleSubmit}>
                    <textarea className='chatInput' type="text" value={this.state.value}
                        onKeyDown={this.onEnterPress} onChange={this.handleChange} />
                </form>
            </div>
        );
    }
}
