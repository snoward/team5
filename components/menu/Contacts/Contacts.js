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
            <div className='dropdown__menu'>
                <Dropdown
                    buttonProps={{ text: 'Contacts' }}
                    items={this.state.contactList.map((elem) => {
                        return elem.username;
                    })}
                />
            </div>
        );
    }
}
