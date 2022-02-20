import './TopBar.css'
import { RiFacebookCircleLine, RiInstagramLine, RiPinterestLine } from 'react-icons/ri'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { Avatar } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import {
    BrowserRouter as Route,
    Link
  } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../../context/Context';


export default function TopBar() {
    const {user, dispatch} = useContext(Context);
    const pf = "http://localhost:5000/images/"

    const handleLogout = () =>{
        dispatch({ type: "LOGOUT" });
    };
    return (
        <div className="topBar">
            <div className="topLeft">
                <ul className="socialList">
                    <li><RiFacebookCircleLine /></li>
                    <li><RiInstagramLine /></li>
                    <li><AiFillTwitterCircle /></li>
                    <li><RiPinterestLine /></li>
                </ul>
            </div>
            <div className="topCenter">
                <ul className="navList">
                    <li className="navItem"><Link className="active" to="/">Home</Link></li>
                    <li className="navItem">About us</li>
                    <li className="navItem">Contact us</li>
                    <li className="navItem"><Link to="/create-post">Create Post</Link></li>
                    <li className="navItem" onClick={handleLogout}>
                        { user && "Logout"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {
                    user ? (
                        <>
                        <Link to="/settings">
                            <img className='profilePic' src={ pf+user.profilePic} alt="" />
                        </Link>
                        <SearchOutlined />
                        </>
                    ): (
                        <ul className="navList">
                            <li className="navItem">
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/register">
                                    Register
                                </Link>
                            </li>
                            <li className="navItem">
                                <SearchOutlined />
                            </li>
                        </ul>
                    )
                }
            </div>
        </div>
    )
}
