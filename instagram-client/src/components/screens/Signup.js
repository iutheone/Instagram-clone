import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from "materialize-css"

export default function Signup() {
    const history=useHistory()
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const postData=()=>{
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            {
                M.toast({html:"Invalid email"})
                return (true)
            }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })

        }
        ).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error})
            }else{
                M.toast({html:data.message});
                history.push("/signin");
            }
        }).catch(err=>{
            console.log(err);
        }) 
    }
    return (
        <div className='mycard'>
            <div className='card auth-card'>
                <h2>Instagram</h2>
                <input type='text' placeholder='name' value={name} onChange={e=>setname(e.target.value)}/>
                <input type='text' placeholder='email' value={email} onChange={e=>setemail(e.target.value)} />
                <input type='text' placeholder='password' value={password} onChange={e=>setpassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #42a5f5 blue lighten-1" onClick={()=>postData()}>Signup </button>
                <h5><Link to="/signin">Already have an account</Link></h5>

            </div>
        </div>
    )
}

