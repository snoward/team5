import React from 'react';
import { Dropdown } from 'react-chat-elements';
import Modal from 'react-modal';

import TimeWatch from './TimeWatch.js';
import AddToContactsForm from './AddToContactsForm.js';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarIcon: props.menu.avatar,
            name: props.menu.name,
            contactList: props.contacts.map(elem => JSON.parse(elem)),
            link: props.menu.link,
            registered: props.menu.registered
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleNewContact(contact) {
        const newContacts = this.state.contactList.slice();
        newContacts.push(contact);

        this.setState({
            contactList: newContacts
        });
    }

    render() {

        return <div className='menu'>
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
                        height: 230,
                        border: null
                    }
                }}>
                <div>
                    <div className="card">
                        <div className="avatar">
                            <img src={this.state.avatarIcon} alt='Avatar' />
                        </div>
                        <div className="container">
                            <a className="user__link" href={this.state.link}>{this.state.name}</a>
                            <div className ="reg__date">member since:
                                {this.state.registered.substring(0, 10)}</div>
                        </div>
                    </div>
                    <button className="close" onClick={this.handleCloseModal}>close</button>
                </div>
            </Modal>
            <div className='back'>
                <img src={this.state.avatarIcon} onClick={this.handleOpenModal} draggable='false'/>
            </div>
            <div className='name'>{this.state.name}</div>
            <TimeWatch/>
            <div className='dropdown__menu'>
                <Dropdown
                    buttonProps={{
                        text: 'Contacts'
                    }}
                    items={this.state.contactList.map((elem) => {
                        return elem.username;
                    })}
                />
            </div>
            <AddToContactsForm handleNewContact={this.handleNewContact.bind(this)}/>
            <style jsx>{`
                @import url(https://fonts.googleapis.com/css?family=Lato:100,300,400,700);
                @import url(https://fonts.googleapis.com/css?family=Lato:100,300,400,700);
                @import url(https://fonts.googleapis.com/css?family=Lato:100,300,400,700);
                @import
                url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);

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
                    box-shadow: inset 0px 0px 0px #e5e5e5, inset 0px 0px 0px #e5e5e5,
                    inset 0px -2px 0px #d7d7d7;
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
                
                .dropdown__menu
                {
                    position: relative;
                    top: 7px;
                    left: 252px;
                    width: min-content;
                }
                .menu
                {
                    position: fixed;
                    top: 0;
                    left: 0px;
                    right: 0px;
                    width: 100%;
                    height: 50px;
                    background: coral;
                    z-index: 100;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                }
                .back
                {
                    position: absolute;
                    width: 90px;
                    height: 50px;
                    top: 0px;
                    left: 0px;
                    color: #fff;
                    line-height: 50px;
                    font-size: 30px;
                    padding-left: 10px;
                    cursor: pointer;
                }
                .back img
                {
                    position: absolute;
                    top: 5px;
                    left: 30px;
                    width: 40px;
                    height: 40px;
                    background-color: rgba(255,255,255,0.98);
                    border-radius: 100%;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    -ms-border-radius: 100%;
                    margin-left: 15px;
                }
                .back:active
                {
                    background: rgba(255,255,255,0.2);
                }
                .name
                {
                    position: absolute;
                    top: 3px;
                    left: 110px;
                    font-family: 'Lato';
                    font-size: 25px;
                    font-weight: 300;
                    color: rgba(255,255,255,0.98);
                    cursor: default;
                }
                .last
                {
                    position: absolute;
                    top: 30px;
                    left: 115px;
                    font-family: 'Lato';
                    font-size: 11px;
                    font-weight: 400;
                    color: rgba(255,255,255,0.6);
                    cursor: default;
                }
                a
                {
                    color: rgba(82,179,217,0.9);
                }
                `}</style>
        </div>;
    }
}
