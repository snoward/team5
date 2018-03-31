/* eslint-disable */
import React, { Component, Fragment } from 'react';

import ContactList from '../components/contacts';
import Chat from '../components/chat';
import Menu from '../components/menu';

export default class IndexPage extends Component {
    static async getInitialProps() {
        return {
            'messages': [
                {
                    'avatar': 'http://primo.ws/files/Disks/Avatars/Avatar_girl_face.png',
                    'side': 'self',
                    'message': 'how\'s it goin',
                    'time': '04:20'
                },
                {
                    'avatar': 'https://i.imgur.com/DY6gND0.png',
                    'side': 'other',
                    'message': 'kys pls',
                    'time': '08:36'
                },
                {
                    'avatar': 'http://primo.ws/files/Disks/Avatars/Avatar_girl_face.png',
                    'side': 'self',
                    'message': 'life is just meaningless',
                    'time': '20:08'
                },
                {
                    'avatar': 'https://i.imgur.com/I80W1Q0.png',
                    'side': 'other',
                    'message': 'what\'s going on??????',
                    'time': '20:08'
                },
                {
                    'avatar': 'https://i.imgur.com/DY6gND0.png',
                    'side': 'other',
                    'message': 'oh hi mark',
                    'time': '20:09'
                }
            ],
            'contacts': [
                {
                    'name': 'Pavel',
                    'avatar': 'http://primo.ws/files/Disks/Avatars/Avatar_girl_face.png'
                },
                {
                    'name': 'Chris',
                    'avatar': 'https://i.imgur.com/DY6gND0.png'
                },
                {
                    'name': 'Mark',
                    'avatar': 'https://i.imgur.com/I80W1Q0.png'
                },
                {
                    'name': 'Sentchonok',
                    'avatar': 'https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg'
                }
            ],
            'menu': {
                'name': 'Pavel',
                'avatar': 'https://i.imgur.com/DY6gND0.png',
                'time': '18:06'
            }
        };
    }
    render() {
        return (
            <Fragment>
                <ContactList contacts={this.props.contacts} />
                <Chat messages={this.props.messages} />
                <Menu menu={this.props.menu} />
            </Fragment>
        );
    }
}
