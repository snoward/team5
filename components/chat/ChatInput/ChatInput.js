import axios from 'axios';
import React from 'react';
import { Picker } from 'emoji-mart';

import './styles.css';
import 'emoji-mart/css/emoji-mart.css';

export default class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageText: '',
            showPicker: false
        };

        this.numberOfRecentEmoji = props.numberOfRecentEmoji || 15;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEmojiSelect = this.onEmojiSelect.bind(this);
        this.onShowPickerButtonClick = this.onShowPickerButtonClick.bind(this);
        this.onInputPressKey = this.onInputPressKey.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
    }

    componentDidMount() {
        this.chatInput.focus();
        // eslint-disable-next-line
        document.addEventListener('keydown', this.handleEscape, false);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.recentEmoji || !prevState.recentEmoji.length) {
            return {
                recentEmoji: nextProps.recentEmoji || []
            };
        }
    }

    componentWillUnmount() {
        // eslint-disable-next-line
        document.removeEventListener('keydown', this.handleEscape, false);
    }

    handleEscape(event) {
        if (event.keyCode === 27) {
            this.setState({ showPicker: false });
        }
    }

    handleChange(event) {
        this.setState({ messageText: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const messageText = this.state.messageText.replace(/\n/g, '\n\n');

        this.props.socket.emit('message', {
            conversationId: this.props.conversationId,
            text: messageText,
            user: this.props.currentUser
        });

        this.requestSaveMessage(messageText);

        this.setState({ messageText: '' });
    }

    onEmojiSelect(emoji) {
        const updatedRecentEmoji = this.state.recentEmoji.filter(el => el !== emoji.id);
        updatedRecentEmoji.unshift(emoji.id);
        updatedRecentEmoji.splice(this.numberOfRecentEmoji);

        this.requestUpdateRecentEmoji(updatedRecentEmoji);

        this.setState({
            messageText: this.state.messageText + emoji.native,
            recentEmoji: updatedRecentEmoji
        });

        this.chatInput.focus();
    }

    onShowPickerButtonClick() {
        this.setState({
            showPicker: !this.state.showPicker
        });
        this.chatInput.focus();
    }

    onInputPressKey(e) {
        if (e.shiftKey && e.charCode === 13) { // shift+enter
            return true;
        }
        if (e.charCode === 13) { // enter
            this.handleSubmit(e);

            return false;
        }
    }

    requestUpdateRecentEmoji(recentEmoji) {
        axios.patch('/api/emoji',
            { recentEmoji }, { withCredentials: true });
    }

    requestSaveMessage(messageText) {
        axios.post(`api/messages/${this.props.conversationId}`,
            { text: messageText },
            { withCredentials: true, responseType: 'json' });
    }

    render() {
        return (
            <div className='chatInput'>
                <textarea
                    type='text'
                    className='chatInput__textarea'
                    placeholder="Введите новое сообщение"
                    value={this.state.messageText}
                    onChange={this.handleChange}
                    ref={input => {
                        this.chatInput = input;
                    }}
                    onKeyPress={this.onInputPressKey}
                />

                {this.state.showPicker
                    ? <Picker
                        recent={this.state.recentEmoji.length
                            ? this.state.recentEmoji
                            : ['smiley']
                        }
                        onClick={this.onEmojiSelect}
                        showPreview={false}
                        color='lightsalmon'
                        set='emojione'
                        style={{
                            position: 'fixed',
                            width: '19%',
                            bottom: '100px',
                            right: '2%',
                            zIndex: 101
                        }}
                        i18n={{ categories: { recent: 'Last used' } }}
                    />
                    : null
                }

                <div className="chatInput__show-picker-button"
                    onClick={this.onShowPickerButtonClick}
                >&#9786;</div>
            </div>
        );
    }
}
