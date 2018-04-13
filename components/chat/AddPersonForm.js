import axios from 'axios';
import React from 'react';

export default class AddPersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentPerson: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ currentPerson: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        await axios.patch(`api/conversations/${this.props.conversationId}`,
            { username: this.state.currentPerson },
            { withCredentials: true, responseType: 'json' });
        this.setState({ currentPerson: '' });
    }

    render() {
        return (
            <div>
                <form className='add-person-form' onSubmit={this.handleSubmit}>
                    <input className='add-person-input' type='text'
                        placeholder='Add user to conversation'
                        value={this.state.currentPerson}
                        onChange={this.handleChange} />
                    <style jsx>
                        {`
                            .add-person-form
                            {
                                margin-top: 50px;
                                width: 95%;
                                border: none;
                            }

                            .add-person-input
                            {
                                border: none;                                
                                width: 100%;
                                padding-left: 10px;
                                border: 1px solid #c7c7bf;
                                border-radius: 4px;                              
                            }

                            .add-person-form, .add-person-input
                            {
                                height: 30px;
                            }
                        `}
                    </style>
                </form>
            </div>
        );
    }
}
