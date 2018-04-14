import axios from 'axios';
import React from 'react';

export default class AddToContactsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            placeholder: 'Add user to contacts'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ inputValue: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();

        const res = await axios.post(`api/contacts/${this.state.inputValue}`, {},
            {
                withCredentials: true,
                responseType: 'json',
                validateStatus: () => true
            });

        if (res.status === 201) {
            this.handleGoodResponse(res);
        } else {
            this.handleBadResponse();
        }
    }

    handleGoodResponse(res) {
        this.setState({
            inputValue: '',
            placeholder: 'Add user to contacts'
        });
        this.props.handleNewContact(res.data);
    }

    handleBadResponse() {
        this.setState({
            inputValue: '',
            placeholder: 'Error occured'
        });
    }

    render() {
        return (
            <div>
                <form className='add-contact-form' onSubmit={this.handleSubmit}>
                    <input className='add-contact-input' type='text'
                        placeholder={this.state.placeholder}
                        value={this.state.inputValue}
                        onChange={this.handleChange} />
                    <style jsx>
                        {`
                            .add-contact-form
                            {
                                display: inline-block;
                                position: absolute;
                                left: 330px;
                                top: 6px;
                                border: none;
                            }

                            .add-contact-input
                            {
                                border: none;                                
                                padding-left: 10px;
                                border: 1px solid #c7c7bf;
                                border-radius: 4px;                              
                            }

                            .add-contact-form, .add-contact-input
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
