import SideBar from '../../components/sidebar/SideBar'
import SinglePost from '../../components/SinglePost/SinglePost'
import './PostDetails.css'

export default function PostDetails() {
    return (
        <>
        <div className="postDetails">
            <SinglePost />
            <SideBar />
        </div>  
        </>
    )
}
