import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { userContext } from '../../App';

export default function UserProfile() {
    const{userid}=useParams()
    const[UserProfile,setUserProfile]=useState(null);
    const{state,dispatch}=useContext(userContext);
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setUserProfile(result);
        })

    },[])
    return (
        <>
        {UserProfile?
        <div style={{ maxWidth:"550px",margin:"0px auto"}}>
        <div style={{display:"flex",
                    justifyContent:"space-between",
                    margin:"18px 0px",
                    borderBottom:"1px solid grey"
                    }}>
            <div>
                <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
                src="https://images.unsplash.com/photo-1533557188897-ef2bc7257ba3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                />
            </div>
            <div>
                <h4>{UserProfile.user.name}</h4>
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                    <h6>{UserProfile.posts.length } posts</h6>
                    <h6>100 followers</h6>
                    <h6>200 followings</h6>
                </div>
            </div>
        </div>
        <div className='gallery'>
            {
                UserProfile.posts.map(item=>{
                    return(
                        <img key={item._id} className='item' src={item.photo} alt={item.title}/>
                    )
                })
            }
        
        

        </div>
    </div>
        :<h2>Loading...</h2>}
        
        </>
    )
}
