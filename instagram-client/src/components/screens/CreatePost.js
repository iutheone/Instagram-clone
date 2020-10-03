import React, { useState,useEffect } from 'react';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom';



export default function CreatePost() {
    const[title,setTitle]=useState("");
    const [body, setBody] = useState("");
    const[image,setImage]=useState("");
    const[url,setUrl]=useState("");
    useEffect(() => {
        if(url){
            fetch('/createpost',{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt") 
                },
                body:JSON.stringify({
                    title,
                    body,
                    url
                    
                })
            })
            .then(res=>res.json())
            .then(data=>{
                
                if(data.error){
                    M.toast({html:data.error});
                }
                else{
                    
                    M.toast({html:"post created"});
                }
            })

        }

    }, [url])
    const postDetails=()=>{
        const data=new FormData();
        data.append("file",image);
        data.append("upload_preset","insta-clone");
        data.append("cloud_name","dowlr5ra0");
        fetch(" https://api.cloudinary.com/v1_1/dowlr5ra0/image/upload",{
            method:'POST',
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url);
            console.log(url);
        })
        .catch(err=>{
            console.log(err); 
        })
    }
    return (
        <div className='card input-field' style={{margin:"10px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}>
            <input type='text' placeholder="Title"value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            <input type='text' placeholder='body'value={body} onChange={(e)=>setBody(e.target.value)}></input>
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                  <button className="btn waves-effect waves-light #42a5f5 blue lighten-1" onClick={()=>postDetails()}>Post </button>

                </div>
            </div>
    </div>
    )
}
