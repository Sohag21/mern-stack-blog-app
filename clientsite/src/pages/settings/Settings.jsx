import SideBar from '../../components/sidebar/SideBar'
import './Settings.css'
import { IoMdPersonAdd } from 'react-icons/io'
import { Context } from '../../context/Context'
import { useContext, useState } from 'react';
import axios from 'axios';

export default function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const {user, dispatch} = useContext(Context);
    const pf = "http://localhost:5000/images/"

    const handlesubmit = async (e)=>{
        e.preventDefault();
        dispatch({ type: "UPDATE_START" })
        const updateUser = {
            userId: user._id,
            username,
            email,
            password
        };
        if(file){
            const data =new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updateUser.profilePic = filename;
            
            try {
             await axios.post("/upload", data);
            } catch (err) {
                console.log("err from file",err)
            }
        };
        try{
            const res = await axios.put("/users/"+user._id, updateUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
        }catch(err){
            dispatch({ type: "UPDATE_FAILURRE"})
        };
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/users/${user._id}`, {data:{ userId: user._id }});
            dispatch({ type: "LOGOUT" });
            window.location.replace("/");
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span onClick={handleDelete} className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form onSubmit={handlesubmit} className="settingsForm">
                    <label>Profile Picture</label>
                    <div className="settingsPp">
                        <img src={ file? URL.createObjectURL(file) : pf+user.profilePic} alt="" className="settingsUser" />
                        <label htmlFor="settingsPpInput">
                            <IoMdPersonAdd className="settingsAddPpIcon" />
                        </label>
                        <input onChange={(e)=>setFile(e.target.files[0])} type="file" id="settingsPpInput" style={{display:"none"}} />
                    </div>
                    <label>User Name</label>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder={user.username} />
                    <label>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder={user.email} />
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" />
                    {
                        success && <p style={{margin:"10px 0px", textAlign: "center", color: "green"}}>User has been updated!</p>
                    }
                    <button type='submit' className="settingsSubmit">Submit</button>
                </form>
            </div>
            <SideBar />
        </div>
    )
}
