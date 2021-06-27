import React, { FC, useContext, useState } from 'react'
import { Context } from '../index'

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { store } = useContext(Context)

    return (
        <form>
            <label>Email:</label>
            <br />
            <input
                name='email'
                type='text'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <br />
            <label>Password:</label>
            <br />
            <input
                name='password'
                type='text'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <br />
            <button onClick={() => store.login(email, password)}>Login</button>
            <button onClick={() => store.registration(email, password)}>Register</button>
        </form>
    );
}

export default LoginForm;