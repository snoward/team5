import React, { Component } from 'react';
import './styles.css';
import LoadingSpinner from '../components/LoadingSpinner';
const signInString = 'Войти через Github';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
        this.displaySpinner = this.displaySpinner.bind(this);
    }

    displaySpinner() {
        this.setState({ loading: true });
    }

    render() {
        return (<div className='container'>
            {this.state.loading ? <LoadingSpinner /> : null}
            <div onClick={this.displaySpinner} className='sign-in'>
                <img className='logo' src={'https://i.imgur.com/u3c6Dsf.png'} alt='logo' />
                <a className='sign-in__a' href='/auth'>{signInString}</a>
            </div>
        </div>);
    }
}
