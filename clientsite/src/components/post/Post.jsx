import { Divider } from 'antd'
import './Post.css'
import { BrowserRouter as Route, Link } from 'react-router-dom'

export default function Post({ post }) {
    const pf = "http://localhost:5000/images/";
    return (
        <div className="post">
            {
                post.photo && (
                    <img src={pf + post.photo} alt="" className="postImg" />
                )
            }
            <div className="postInfo">
                <div className="postCategories">
                    {
                        post.categories.map(cat => (
                            <spna key={cat.id} className="postCategory">hi{cat.name}</spna>
                        ))
                    }
                </div>
                <Link to={`/post/${post._id}`} className="postTitle">{post.title}</Link>
                <Divider />
                <span className="postTime">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDescription">{post.desc}</p>
        </div>
    )
}
