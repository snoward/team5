export default function SignIn({ signInString }) {
    return <div className="sign-in">
        <a className="sign-in__a" href="/auth">{ signInString }</a>
        <style jsx>{`
            .sign-in__a,
            .sign-in__a:link,
            .sign-in__a:visited
            {
                text-decoration: none;
                font-family: sans-serif;
                font-size: 24px;
                line-height: 40px;
                height: 40px;
                position: absolute;
                margin: auto;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                padding: 20px 40px;
                display: block;
                border: 1px solid #bda095;
                width: 140px;
                text-align: center;
                border-radius: 3px;
                background-color: #FF7F50;
                color: #000;
            }
        `}</style>
    </div>;
}
