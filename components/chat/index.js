/* eslint-disable */
import React, { Component } from 'react';
import { Avatar } from 'react-chat-elements';
import { MessageList } from 'react-chat-elements';
import { Input } from 'react-chat-elements';
import { Button } from 'react-chat-elements';

import ChatInput from './ChatInput/ChatInput.js';
import AddPersonForm from './AddPersonForm/AddPersonForm.js';
import Participants from './Participants/Participants.js';
import ProfileModal from '../ProfileModal/ProfileModal.js';
import Messages from './Messages/Messages.js';
import io from "socket.io-client";

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.socket = io();
        
        this.state = {
            currentAuthor: '',
            showModal: false,
            messages: props.messagesInfo.messages,
            currentUser: props.messagesInfo.currentUser,
            participantsVisible: false
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.showParticipants = this.showParticipants.bind(this);
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    openModalWithItem(author) {
        this.setState({
            showModal: true,
            currentAuthor: author,
            currentAvatar: `/api/avatar/${author}`
        })
    }

    componentWillReceiveProps(nextProps) {
        this.socket.removeListener(`message_${this.props.messagesInfo.conversationId}`);
        this.setState({
            messages: nextProps.messagesInfo.messages.map(elem => JSON.parse(elem)),
            currentUser: nextProps.messagesInfo.currentUser
        });
    }

    showParticipants() {
        this.setState({ participantsVisible: !this.state.participantsVisible });
    }

    componentDidMount() {
        this.socket.on(`message_${this.props.messagesInfo.conversationId}`, 
            this.handleMessage.bind(this));
            this.scrollToBottom();

    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    saveElementForScroll(el) {
        this.el = el;
    }

    scrollToBottom() {
        if (this.el){
            this.el.scrollIntoView({behavior: 'instant'});
        }
    }

    handleMessage(message) {
        const newMessages = this.state.messages.slice();
        newMessages.push(message);
        this.setState({
            messages: newMessages
        })
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

                {this.state.participantsVisible ?
                    <Participants 
                        conversationId={this.props.messagesInfo.conversationId}
                    /> : 
                    null
                }

                <Messages
                    messages={this.state.messages}
                    currentUser={this.state.currentUser}
                    onMessageTitleClick={this.openModalWithItem.bind(this)}
                    saveElementForScroll={this.saveElementForScroll.bind(this)}
                />

                <ChatInput 
                    conversationId={this.props.messagesInfo.conversationId}
                    socket={this.socket} currentUser={this.state.currentUser}
                />

                <style jsx>{`
                    @import 
                    url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
                    @import
                    url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
                    @import
                    url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
                    @import url(https://fonts.googleapis.com/css?family=Lato:100,300,400,700);
                    @import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);

                    .reg__date
                {
                    margin-top: 15px;
                    font-size: 10px;
                }



                    .contact-container
                    {
                        position: fixed;
                        overflow-y: auto;
                        margin-top: 70px;
                        margin-left: 20px;
                        margin-bottom: 100px;
                        float: left;
                        width: 40%;
                        height: 80%;
                    }
                    .contact
                    {
                        margin-top: 10px;
                        width: 90%;
                        height: 100px;
                        background-color: rgba(255,255,255,0.9);
                        box-shadow: inset 0px 0px 0px #e5e5e5, inset 0px 0px 0px #e5e5e5, inset 0px -2px 0px #d7d7d7;
                    }

                    .avatar-container img
                    {
                        margin-left: 10px;
                        margin-top: -5px;
                        width: 100px;
                        height: 100px;
                        border-radius: 60%;
                    }

                    .contact-name
                    {
                        text-align: center;
                        margin-top: -50px;
                        margin-left: 20px;
                        font-family: Arial, serif;
                        font-size: 20px;
                    }

                    a
                    {
                        color: rgba(82,179,217,0.9);
                    }
                    .chat-container
                    {
                        margin-bottom: 100px;
                        float:right;
                        width: 50%;
                    }
                    .other .msg
                    {
                        order: 1;
                        border-top-left-radius: 0px;
                        box-shadow: -1px 2px 0px #D4D4D4;
                    }
                    .other:before
                    {
                        content: "";
                        position: relative;
                        top: 0px;
                        right: 0px;
                        left: 40px;
                        width: 0px;
                        height: 0px;
                        border: 5px solid #fff;
                        border-left-color: transparent;
                        border-bottom-color: transparent;
                    }
                    .self
                    {
                        justify-content: flex-end;
                        align-items: flex-end;
                    }
                    .self .msg
                    {
                        order: 1;
                        border-bottom-right-radius: 0px;
                        box-shadow: 1px 2px 0px #D4D4D4;
                    }
                    .self .avatar
                    {
                        order: 2;
                    }
                    .self .avatar:after
                    {
                        content: "";
                        position: relative;
                        display: inline-block;
                        bottom: 19px;
                        right: 0px;
                        width: 0px;
                        height: 0px;
                        // border: 5px solid #fff;
                        border-right-color: transparent;
                        border-top-color: transparent;
                        box-shadow: 0px 2px 0px #D4D4D4;
                    }
                    .msg
                    {
                        background: white;
                        min-width: 50px;
                        padding: 10px;
                        border-radius: 2px;
                        box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.07);
                    }
                    .msg p
                    {
                        font-size: 0.8rem;
                        margin: 0 0 0.2rem 0;
                        color: #777;
                    }
                    .msg img
                    {
                        position: relative;
                        display: block;
                        width: 450px;
                        border-radius: 5px;
                        box-shadow: 0px 0px 3px #eee;
                        transition: all .4s cubic-bezier(0.565, -0.260, 0.255, 1.410);
                        cursor: default;
                        -webkit-touch-callout: none;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                    }
                    @media screen and (max-width: 800px)
                    {
                        .msg img {
                            width: 300px;
                        }
                    }
                    @media screen and (max-width: 550px)
                    {
                        .msg img {
                            width: 200px;
                        }
                    }
                    .msg time
                    {
                        font-size: 0.7rem;
                        color: #ccc;
                        margin-top: 3px;
                        float: right;
                        cursor: default;
                        -webkit-touch-callout: none;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                    }
                    .msg time:before
                    {
                        content:"\f017";
                        color: #ddd;
                        font-family: FontAwesome, serif;
                        display: inline-block;
                        margin-right: 4px;
                    }
                    input.textarea
                    {
                        position: fixed;
                        bottom: 0px;
                        left: 53.6%;
                        width: 40.5%;
                        height: 16%;
                        z-index: 99;
                        background: white;
                        outline: none;
                        padding-left: 5px;
                        padding-right: 55px;
                        color: #666;
                        font-weight: 400;
                        resize: none;
                        overflow-y: scroll;
                        border: solid 5px lightsalmon;
                    }
                    a
                    {
                        color: rgba(82,179,217,0.9);
                    }
                    .show-button
                    {
                        height: 30px;
                        border: none;
                        border-radius: 8px;
                        background-color: #ff7f50;
                        float: left;
                    }
                    `}</style>
            </div>
        );
    }
}
