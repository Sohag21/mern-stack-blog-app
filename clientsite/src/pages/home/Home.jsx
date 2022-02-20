import { useEffect, useState } from 'react'
import Banner from '../../components/banner/Banner'
import Posts from '../../components/posts/Posts'
import SideBar from '../../components/sidebar/SideBar'
import './Home.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export default function Home() {
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();

    useEffect(() => {
      const fetchPosts = async ()=>{
          const res = await axios.get("/posts" + search);
          setPosts(res.data);
          console.log(res);
      };
      fetchPosts();
    }, [search]);
    
    return (
        <>
        <Banner />
        <div className="home">
            <Posts posts={posts} />
            <SideBar />
        </div>
        </>
    )
}
