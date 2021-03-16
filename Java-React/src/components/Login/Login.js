import React, {useEffect, useState} from 'react'
import styles from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {LoginAction} from "../../redux/Auth/AuthActions";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {isLogin} = useSelector(state => state.authReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isLogin) {

        }
    }, [])

    const onLogin = () => {
        dispatch(LoginAction.onLogin(email, password))
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            dispatch(LoginAction.onLogin(email, password))
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginForm}>
                <input
                    type={"text"}
                    placeholder={"Enter your email"}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type={"password"}
                    placeholder={"Enter your password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {/*<button><i className="fa fa-refresh fa-spin fa-3x fa-fw"/></button>*/}
                <button onClick={onLogin}>Sign in</button>
            </div>
        </div>
    )
}
