/* eslint-disable */
import React from 'react';

import ChatInput from './ChatInput/ChatInput.js';
import AddPersonForm from './AddPersonForm/AddPersonForm.js';
import Participants from './Participants/Participants.js';
import ProfileModal from '../ProfileModal/ProfileModal.js';
import Messages from './Messages/Messages.js';
import io from 'socket.io-client';

import './styles.css';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentAuthor: '',
            showModal: false,
            messages: props.messagesInfo.messages,
            currentUser: props.messagesInfo.currentUser,
            participantsVisible: false
        };

        this.socket = io();

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.showParticipants = this.showParticipants.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.openModalWithItem = this.openModalWithItem.bind(this);
        this.saveElementForScroll = this.saveElementForScroll.bind(this);
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    openModalWithItem(author) {
        this.setState({
            showModal: true,
            currentAuthor: author,
            currentAvatar: `/api/avatar/${author}`
        });
    }

    showParticipants() {
        this.setState({
            participantsVisible: !this.state.participantsVisible
        });
    }

    componentDidMount() {
        this.socket.on(`message_${this.props.messagesInfo.conversationId}`, this.handleMessage);
        this.scrollToBottom();
    }

    componentWillUnmount() {
        this.socket.removeListener(`message_${this.props.messagesInfo.conversationId}`);
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    saveElementForScroll(el) {
        this.el = el;
    }

    scrollToBottom() {
        if (this.el) {
            this.el.scrollIntoView({ behavior: 'instant' });
        }
    }

    handleMessage(message) {
        const newMessages = this.state.messages.slice();
        newMessages.push(message);
        this.setState({
            messages: newMessages
        });
    }

    render() {
        return (
            <div className='chat-container'>
                <ProfileModal
                    showModal={this.state.showModal}
                    handleCloseModal={this.handleCloseModal}
                    username={this.state.currentAuthor}
                    avatarUrl={this.state.currentAvatar}
                />

                <AddPersonForm
                    conversationId={this.props.messagesInfo.conversationId}
                />

                <button className='show-button' onClick={this.showParticipants}>
                    Participants
                </button>

                {this.state.participantsVisible
                    ? <Participants conversationId={this.props.messagesInfo.conversationId}/>
                    : null
                }

                <Messages
                    messages={this.state.messages}
                    currentUser={this.state.currentUser}
                    onMessageTitleClick={this.openModalWithItem}
                    saveElementForScroll={this.saveElementForScroll}
                />

                <ChatInput
                    conversationId={this.props.messagesInfo.conversationId}
                    socket={this.socket} currentUser={this.state.currentUser}
                />
            </div>
        );
    }
}
