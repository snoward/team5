import './styles.css';

export default function SignIn({ signInString }) {
    return <div className="sign-in">
        <a className="sign-in__a" href="/auth">{ signInString }</a>
    </div>;
}
