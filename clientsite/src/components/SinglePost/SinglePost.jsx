import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import './SinglePost.css'
import { Context } from '../../context/Context'

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false)
    const { user } = useContext(Context);
    const pf = "http://localhost:5000/images/";

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [path]);


    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, { data: { username: user.username } });
            window.location.replace("/")
        } catch (err) {
            console.log(err)
        }
    };

    const handleUpdate = async () =>{
        try {
            await axios.put(`/posts/${post._id}`, { username: user.username, title, desc});
            setUpdateMode(false);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {
                    post.photo && (
                        <img src={pf + post.photo} alt="" className="singlePostImg" />
                    )
                }
                {updateMode ? <input onChange={(e)=>setTitle(e.target.value)} autoFocus value={title} type="text" className='singlePostTitleInput' /> : (
                    <h2 className="singlePostTitle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <FaEdit onClick={() => setUpdateMode(true)} className="edit" />
                                <AiOutlineDelete onClick={handleDelete} className="dlt" />
                            </div>
                        )}
                    </h2>
                )
                }

                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link to={`/?user=${post.username}`}> <b>{post.username}</b></Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? <textarea onChange={(e)=>setDesc(e.target.value)} className='singlePostDescTextarea' >{desc}</textarea> : (
                    <p className="singlePostDesc">{desc}</p>
                )
                }

                {updateMode && (
                    <button type="submit" className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    )
}
