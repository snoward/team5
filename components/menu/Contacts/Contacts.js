import React from 'react';
import { Dropdown } from 'react-chat-elements';

import './styles.css';

export default class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            contactList: nextProps.contactList
        };
    }

    render() {
        return (
            <div className='contacts'>
                <Dropdown
                    buttonProps={{ text: 'Контакты' }}
                    items={this.state.contactList || 'Добавь друзей в контакты'}
                />
            </div>
        );
    }
}
