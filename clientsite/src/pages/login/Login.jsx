import './Login.css'
import { BrowserRouter as Route, Link} from 'react-router-dom'
import { useContext, useRef, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(false)
    const { user, dispatch, isFetching} = useContext(Context);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch({type: "LOGIN_START"})
        try{
            const res = await axios.post("/auth/login", {
                username: userRef?.current?.value,
                password: passwordRef?.current?.value,
            });
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
        }catch(err){
            setError(true)
        }
    }
    console.log("users", user);
    console.log("users-context", isFetching);


    return (
        <div className="login">
            <spna className="loginTitle">Login</spna>
            {
                error && <span className='err'>Something went wrong!</span>
            }
            <form onSubmit={handleSubmit} className="loginForm">
                <label>User Name</label>
                <input ref={userRef} type="text" placeholder="sohag" />
                <label>Password</label>
                <input ref={passwordRef} type="password" placeholder="***"/>
                <button type="submit" className="loginButton">Login</button>
            </form>
            <Link to="/register" className="loginRegisterButton">Register</Link>
        </div>
    )
}
