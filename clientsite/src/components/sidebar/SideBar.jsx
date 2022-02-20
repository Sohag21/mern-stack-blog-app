import './SideBar.css'
import { RiFacebookCircleLine, RiInstagramLine, RiPinterestLine } from 'react-icons/ri'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function SideBar() {
    const [cats, setCats] = useState([]);
    const {user} = useContext(Context)
    const pf = "http://localhost:5000/images/"

    useEffect(() => {
      const getCats = async ()=>{
          const res = await axios.get("/categories");
          setCats(res.data)
      };
      getCats();
    }, []);
    
    return (
        <div className="sideBar">
            {user && (
                <div className="sideBarItem">
                <span className="sideBarTitle">About me</span>
                <img src={pf+user?.profilePic} alt="" className="sideBarImg" />
                <p className="sideBarText">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo accusamus tenetur quibusdam explicabo ducimus veritatis inventore dolorem, reprehenderit error fugiat.</p>
                </div>
            )}

            <div className="sideBarItem">
                <div className="sideBarCats">
                <span className="sideBarTitle">categories</span>
                <ul className="sideBarList">
                    {cats.map(cat=>(
                        <Link to={`/?cat=${cat.name}`}><li className="sideBarListItem">{cat.name}</li></Link>
                    ))}
                   
                </ul>
                </div>
            </div>

            <div className="sideBarItem">
                <span className="sideBarTitle">follow us</span>
                <ul className="sideBarListSocial">
                    <li className="sideBarListItem"><RiFacebookCircleLine /></li>
                    <li className="sideBarListItem"><RiInstagramLine /></li>
                    <li className="sideBarListItem"><RiPinterestLine /></li>
                    <li className="sideBarListItem"><AiFillTwitterCircle /></li>
                </ul>
            </div>
        </div>
    )
}
