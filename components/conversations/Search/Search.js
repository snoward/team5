import React from 'react';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: 'Search',
            inputValue: '',
            disabled: false,
            handleFilteredConversations: props.handleFilteredConversations,
            conversations: this.props.conversations
        };

        this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            conversations: nextProps.conversations
        };
    }

    handleChange(event) {
        const filtered = this.state.conversations.filter(elem => {
            return elem.title.toLowerCase().includes(event.target.value.toLowerCase());
        });
        this.state.handleFilteredConversations(filtered);
        this.setState({ inputValue: event.target.value });
    }

    render() {
        return (
            <form>
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
