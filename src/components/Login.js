import React from 'react';
import WhatsAppLogo from '../images/whatsapp-logo.png';
import './Login.css';
import {Button} from '@material-ui/core';
import {auth,provider} from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

const Login = () => {

    const [{},dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
            .catch(err => console.log(err.message))
    };


    return (
        <div className="login">

            <div className="login__container">
                <img src={WhatsAppLogo} alt=""/>

                
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>Sign in with Google</Button>
            </div>


        </div>
    )
}

export default Login
