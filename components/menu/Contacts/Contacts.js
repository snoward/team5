import React from 'react';
import { Dropdown } from 'react-chat-elements';

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
                <style jsx>{`
                    .dropdown__menu
                    {
                        position: relative;
                        top: 7px;
                        left: 252px;
                        width: min-content;
                    }
                `}</style>
            </div>
        );
    }
}
