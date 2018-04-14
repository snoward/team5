/* eslint-disable */
import React, { Component } from 'react';
import Modal from 'react-modal';
import { Avatar } from 'react-chat-elements';
import { MessageList } from 'react-chat-elements';
import { Input } from 'react-chat-elements';
import { MessageBox } from 'react-chat-elements';
import { Button } from 'react-chat-elements';

import NameForm from './NameForm.js';
import AddPersonForm from './AddPersonForm.js';
import Participants from './Participants.js';
import io from "socket.io-client";

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.socket = io();
        this.state = {
            currentAuthor: '',
            showModal: false,
            messages: props.messagesInfo.messages.map(elem => JSON.parse(elem)),
            currentUser: props.messagesInfo.currentUser,
            participantsVisible: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.showParticipants = this.showParticipants.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }
    openModalWithItem(elem) {
        this.setState({
            showModal: true,
            currentAuthor: elem.author,
            currentAvatar: `/api/avatar/${elem.author}`
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
    }

    handleMessage(message) {
        const newMessages = this.state.messages.slice();
        newMessages.push(message);
        this.setState({
            messages: newMessages
        })
    }

    render() {
        let side = '';
        let email =  'https://github.com/'+this.state.currentAuthor;
        return <div className='chat-container'>
            <Modal
                isOpen={this.state.showModal}
                onRequestClose={this.handleCloseModal}
                shouldCloseOnOverlayClick={true}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        justifyContent: 'center',
                        zIndex: 1000
                    },
                    content: {
                        backgroundColor: 'rgba(0,0,0,0.0)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        margin: 'auto',
                        width: 400,
                        height: 220,
                        border: null
                    }
                }}>
                <div>
                    <div className="card">
                        <div className="avatar">
                            <img src={this.state.currentAvatar} alt='Avatar' />
                        </div>
                        <div className="container">
                            <a className="user__link" href={email}>
                                {this.state.currentAuthor}</a>
                        </div>
                    </div>
                    <button className="close" onClick={this.handleCloseModal}>close</button>
                </div>
            </Modal>
            <div className='add-person-form'>
                <AddPersonForm conversationId={this.props.messagesInfo.conversationId}/>
            </div>
            <button className='show-button' onClick={this.showParticipants}>Participants</button>
            {this.state.participantsVisible ?
                <Participants conversationId={this.props.messagesInfo.conversationId}></Participants> : null}
            <ol className='chat'>
                {this.state.messages.map((elem, idx) => {
                    elem.author === this.state.currentUser ? side = 'right' : side = 'left';

                    return <div ref={el => { this.el = el; }}>
                        <MessageBox
                        key={idx}
                        position={side}
                        avatar={`/api/avatar/${elem.author}`}
                        title={elem.author}
                        onTitleClick={() => this.openModalWithItem(elem)}
                        type={'text'}
                        text={elem.text}
                        forwarded={true}
                        date={new Date(elem.date)}
                        data={{
                            uri: 'https://facebook.github.io/react/img/logo.svg',
                            status: {
                                click: true,
                                loading: 0
                            }
                        }}
                    />
                    </div>;
                }
                )}

            </ol>
            <div className='textarea-decorator'>
                <NameForm conversationId={this.props.messagesInfo.conversationId}
                    socket={this.socket} currentUser={this.state.currentUser}/>
            </div>
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

               .user__link
                {
                  margin-top: 15px;
                  color: black;
                }
               .close
                {
                    position:relative;
                    left: 44%;
                    top: 10px;
                    background-color: coral;
                    border: none;
                    padding: 10px;
                }

                 .close:hover
                {
                    background-color: white;
                    color: black;

                }

                .card, .card *{
                 outline: none !important;
                 }

                .card {
                    outline: none;
                    width: 100%
                    hight: 100%;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    font-family: 'Lato', sans-serif;
                    box-shadow: 0 4px 8px 0 rgba(255,160,122,0.5);
                    transition: 0.3s;
                    background: white;
                }

                /* On mouse-over, add a deeper shadow */
                .card:hover {
                    box-shadow: 0 8px 6px 0 rgba(255,160,122,0.5);
                }

                /* Add some padding inside the card container */
                .container {
                    text-align: center;
                    padding: 20px;
                }

                .avatar
                {
                    align-self:center;
                }
                img
                {
                    width: 100px;
                    height: 100px;
                    border-radius: 60%;
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
                .chat
                {
                    margin-top: 60px;
                    margin-bottom: 100px;
                }
                .chat li
                {
                    padding: 7px;
                    overflow: hidden;
                    display: flex;
                }
                .chat .avatar
                {
                    width: 40px;
                    height: 40px;
                    margin: 10px;
                    position: relative;
                    display: block;
                    z-index: 2;
                    border-radius: 100%;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    -ms-border-radius: 100%;
                    background-color: rgba(255,255,255,0.9);
                }
                .chat .avatar img
                {
                    width: 40px;
                    height: 40px;
                    border-radius: 100%;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    -ms-border-radius: 100%;
                    background-color: rgba(255,255,255,0.9);
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                }
                .chat .day
                {
                    position: relative;
                    display: block;
                    text-align: center;
                    color: #c0c0c0;
                    height: 20px;
                    text-shadow: 7px 0px 0px #e5e5e5, 6px 0px 0px #e5e5e5, 5px 0px 0px #e5e5e5, 4px 0px 0px #e5e5e5, 3px 0px 0px #e5e5e5, 2px 0px 0px #e5e5e5, 1px 0px 0px #e5e5e5, 1px 0px 0px #e5e5e5, 0px 0px 0px #e5e5e5, -1px 0px 0px #e5e5e5, -2px 0px 0px #e5e5e5, -3px 0px 0px #e5e5e5, -4px 0px 0px #e5e5e5, -5px 0px 0px #e5e5e5, -6px 0px 0px #e5e5e5, -7px 0px 0px #e5e5e5;
                    box-shadow: inset 20px 0px 0px #e5e5e5, inset -20px 0px 0px #e5e5e5, inset 0px -2px 0px #d7d7d7;
                    line-height: 38px;
                    margin-top: 5px;
                    margin-bottom: 20px;
                    cursor: default;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
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
        </div>;
    }
}
