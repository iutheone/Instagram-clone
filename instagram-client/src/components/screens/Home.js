import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { userContext } from '../../App';


export default function Home() {
    const{state,dispatch}=useContext(userContext);

    const[data,setData]=useState([]);
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            
            setData(result.posts);
        })
       

    },[])
    const likePost=(id)=>{
        fetch('/like',{
            method:"PUT",
            headers:{
                'Content-type':"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })

        })
        .then(res=>res.json())
            .then(result=>{
                console.log(result);
            })
    }
    const unlikePost=(id)=>{
        fetch('/unlike',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })

        })
        .then(res=>res.json())
            .then(result=>{
                console.log(result);
            })
    }
    const makeComment=(text,postId)=>{
        fetch("/comments",{
            method:"put",
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result);
            const newData=data.map(item=>{
                if(item._id===result._id){
                    return result
                }
                else{
                    return item
                }
            })
            

        })

    }
    
    return (
        <div className='home'>
            {
                data.map(item=>{
                    return(
                        <div className='card home-card' key={item._id}>
                        <h5><Link to={item.postedBy._id!== state._id? "/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name}</Link>
                        </h5>

                        <div className='card-image'>
                            <img src={item.photo}/>
                        </div>
                        <div className="card-content">
                            <i className="material-icons">favorite</i>
                            <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}
                            >thumb_up</i>
                            <i className="material-icons" onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
                            <h6>{item.likes.length} likes</h6>
                            <h4>{item.title}</h4>
                            <p>{item.body}</p>
                            {
                                item.comments.map((record)=>{
                                    return(
                                    <h3>{record.postedBy.name}</h3>
                                    )
                                })
                            }
                           
                            <form onSubmit={(e)=>
                                {
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }
                                }>
                                <input type='text' placeholder="comment"/>
                            </form>

                        </div>
                        </div>
                    )
                })
                }
            
        </div>
    )
}
