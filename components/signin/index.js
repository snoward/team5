import './styles.css';

export default function SignIn({ signInString }) {
    return <div className='sign-in'>
        <img className='logo' src={'https://i.imgur.com/u3c6Dsf.png'} alt='logo' />
        <a className='sign-in__a' href='/auth'>{ signInString }</a>
    </div>;
}
