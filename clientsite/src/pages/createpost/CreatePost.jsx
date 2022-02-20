import { useContext, useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md'
import './CreatePost.css'
import {Context} from '../../context/Context'
import axios from 'axios'

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const {user} = useContext(Context)

    const handlesubmit = async (e)=>{
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc
        };
        if(file){
            const data =new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            
            try {
             await axios.post("/upload", data);
            } catch (err) {
                
            }
        };
        try{
            const res = await axios.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        }catch(err){

        };
    };
    return (
        <>
        <div className="createPost">
            {
                file && (
                <img src={URL.createObjectURL(file)} alt="" className="createPostCoverImg" />
                )
            }
            <form onSubmit={handlesubmit} className="createPostForm">
                <div className="createPostFormGrp">
                    <label htmlFor="createPostFormFileInput">
                        <MdAddAPhoto className="createPostFormImgIcon" />
                    </label>
                    <input onChange={(e)=>setFile(e.target.files[0])} type="file" id="createPostFormFileInput" style={{display:"none"}} />
                    <input autoFocus={true} onChange={e=>setTitle(e.target.value)} type="text" placeholder="Title" className="createPostFormInputText" />
                </div>
                <div className="createPostFormGrp">
                    <textarea onChange={e=>setDesc(e.target.value)} placeholder="Aa..." rows="3" className="createPostFormInputText createPostFormTextarea"></textarea>
                </div>
                <button type='submit' className="createPostFormPost">Post</button>
            </form>
        </div>
        </>
    )
}
