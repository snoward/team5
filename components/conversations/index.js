/* eslint-disable */
import React from 'react';
import { ChatList } from 'react-chat-elements';
import io from 'socket.io-client';

import Search from './Search/Search.js';
import CreateConversationModal from './CreateConversationModal/CreateConversationModal.js';
import './styles.css';

export default class Conversations extends React.Component {
    constructor(props) {
        super(props);

        const transformedConversations = this.changeConversationTitles(props.conversations)
        this.state = {
            conversations: transformedConversations,
            shownConversations: transformedConversations,
            isModalOpen: false
        };

        this.handleNewConversation = this.handleNewConversation.bind(this);
        this.setShowedConversations = this.setShowedConversations.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }

    componentDidMount() {
        this.socket = io();
        this.socket.on(`conversationNewUser_${this.props.currentUser}`, this.handleNewConversation);
    }

    handleNewConversation(newConversation) {
        const newConversations = this.state.conversations.slice();

        newConversations.push(this.changeConversationTitle(newConversation));

        this.setState({
            conversations: newConversations,
            shownConversations: newConversations
        });
    }

    setShowedConversations(conversations) {
        this.setState({
            shownConversations: conversations
        });
    }

    handleOpenModal() {
        this.setState({
            isModalOpen: true
        });
    }

    handleCloseModal() {
        this.setState({
            isModalOpen: false
        });
    }

    changeConversationTitles(conversations) {
        return conversations.map(conversation => this.changeConversationTitle(conversation));
    }

    changeConversationTitle(conversation) {
        const title = !conversation.isPrivate
            ? conversation.title
            : conversation.users.filter(user => user !== this.props.currentUser)[0];

        return {
            avatar: `/api/avatar/${title}`,
            title: title,
            id: conversation.id
        };
    }

    render() {
        return (
            <div className='conversations-container'>
                <CreateConversationModal
                    isOpen={this.state.isModalOpen}
                    handleCloseModal={this.handleCloseModal}
                    currentUser={this.props.currentUser}
                />

                <Search
                    conversations={this.state.conversations}
                    handleFilteredConversations={this.setShowedConversations}
                />

                <button onClick={this.handleOpenModal}>+</button>

                <ChatList
                    dataSource={this.state.shownConversations}
                    onClick={this.props.onConversationClick}
                />
            </div>
        );
    }
}
