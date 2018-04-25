import './styles.css';
const signInString = 'Войти через Github';

export default function SignIn() {
    return <div className='sign-in'>
        <img className='logo' src={'https://i.imgur.com/u3c6Dsf.png'} alt='logo' />
        <a className='sign-in__a' href='/auth'>{ signInString }</a>
    </div>;
}
