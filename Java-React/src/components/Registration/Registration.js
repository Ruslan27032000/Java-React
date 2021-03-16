import React, {useState} from 'react'
import styles from "../Login/Login.module.css"
import {useDispatch} from "react-redux";
import {LoginAction} from "../../redux/Auth/AuthActions";
import {useHistory} from "react-router-dom";


export default function Registration() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repass, setRepass] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()

    const Registration = () => {
        if (password === repass && password.length >= 8 && repass.length >= 8) {
            const promise = new Promise((resolve, reject) => {
                dispatch(LoginAction.onReg(email, password,resolve,reject))
            })
            promise
                .then(() => {
                    history.push('/auth')
                })
                .catch(()=>{

                })
        } else if (password !== repass) {
            alert("Passwords doesn't equals")
        } else {
            alert("Password should be more that 8 sybmols")
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.loginForm}>
                <input
                    type={"text"}
                    placeholder={"Enter your username"}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    placeholder={"Enter your password"}
                    type={"password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    placeholder={"Re-Enter your password"}
                    type={"password"}
                    value={repass}
                    onChange={e => setRepass(e.target.value)}
                />
                <button onClick={Registration}>Registration</button>
            </div>
        </div>
    )
}
