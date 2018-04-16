import React from 'react';
import axios from 'axios';

export default class CreateConversationsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: 'New conversation title',
            inputValue: '',
            disabled: false,
            handleNewConversation: props.handleNewConversation
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ inputValue: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();

        const title = this.state.inputValue;
        this.setState({
            disabled: true,
            inputValue: '',
            placeholder: 'Wait please'
        });

        const res = await axios.post(`api/conversations/${title}`,
            { withCredentials: true, responseType: 'json' });

        this.state.handleNewConversation(res.data);

        this.setState({
            disabled: false,
            placeholder: 'New conversation title'
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    className='conversation-input'
                    placeholder={this.state.placeholder}
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    disabled={this.state.disabled}
                />
            </form>
        );
    }
}
