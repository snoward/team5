import React from 'react';
import { Dropdown } from 'react-chat-elements';
import { Button } from 'react-chat-elements';

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
                {this.state.contactList.length
                    ? <Dropdown
                        buttonProps={{ text: 'Контакты' }}
                        items={this.state.contactList}
                    />
                    : <Button
                        text={'Нет контактов' }
                    />}
            </div>
        );
    }
}
