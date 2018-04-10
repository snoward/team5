import React from 'react';
import SignIn from '../components/signin';
const signInString = 'Войти';

export default class SignInPage extends React.Component {
    render() {
        return (
            <SignIn signInString={signInString} />
        );
    }
}
