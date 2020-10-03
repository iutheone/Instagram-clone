import React, { useContext } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { userContext } from '../App'

export default function Navbar() {
    const history=useHistory();
    const{state,dispatch}=useContext(userContext);
    const renderList=()=>{
        if(state){
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Create post</Link></li>,
                <li>
                    <button className="btn waves-effect waves-light blue"
                    onClick={()=>{
                        localStorage.clear();
                        dispatch({type:"CLEAR"});
                        history.push("/signin")
                    }}
                    >logout </button>
                </li>
                
            ]
        }else{
            return [
                <li><Link to="/signin">Signin</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return (
    <nav>
        <div className="nav-wrapper white">
        <Link to="/" className="brand-logo">Instagram</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            {
                renderList()
            }
            
            
        </ul>
    </div>
  </nav>
    )
}
