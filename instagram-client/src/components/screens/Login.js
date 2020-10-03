import React,{useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import M from "materialize-css"
import {userContext} from '../../App'
export default function Login() {
    const{state,dispatch}=useContext(userContext);
    const history=useHistory()
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const postData=()=>{
        fetch('/signin',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
                
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.error){
                M.toast({html:data.error});
            }
            else{
                localStorage.setItem("jwt",data.token);
                localStorage.setItem('user',JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user});
                console.log(state);
                M.toast({html:"signIn successfully"});
                history.push("/"); 
            }
        })
     }
    return (
        <div className='mycard'>
            <div className='card auth-card'>
                <h2>Instagram</h2>
                <input type='text' placeholder='email' value={email} onChange={(e)=>setemail(e.target.value)}/>
                <input type='text' placeholder='password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #42a5f5 blue lighten-1" onClick={()=>postData()}>Login </button>
                <h5><Link to='/signup'>New to Instagram</Link></h5>

            </div>
        </div>
    )
}
