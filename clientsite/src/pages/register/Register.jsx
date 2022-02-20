import './Register.css'
import { BrowserRouter as Route, Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);
    console.log(err);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setErr(false);
        try{
            const res = await axios.post("/auth/register", {
                username,
                email,
                password
            });
            res.data && window.location.replace("/login");
        }catch(err){
            setErr(true);
        }
    };
    return (
        <div className="register">
            <spna className="registerTitle">Register</spna>
            {
                err && <span className='err'>Something went wrong!</span>
            }
            <form onSubmit={handleSubmit} className="registerForm">
                <label>User Name</label>
                <input onChange={e=>setUsername(e.target.value)} type="text" placeholder="user name" />

                <label>Email</label>
                <input onChange={e=>setEmail(e.target.value)} type="email" placeholder="example@mail.com" />

                <label>Password</label>
                <input onChange={e=>setPassword(e.target.value)} type="password" placeholder="password"/>
                <button type="submit" className="registerButton">Register</button>
            </form>
            <Link to="/login" className="registerLoginButton">Login</Link>
        </div>
    )
}
