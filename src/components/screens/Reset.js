import React, { useState } from "react"
import {Link, useHistory} from "react-router-dom"
import M from "materialize-css"
const Reset = ()=>{
    const history = useHistory()
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){// eslint-disable-line
            M.toast({html:"invalid Email", classes:"red darken-3"})
        }
        else{
            fetch("/reset-password",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email
                })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    M.toast({html:data.error,classes:"red darken-3"})
                }
                else{
                    
                    M.toast({html:data.message,classes:"green darken-1"})
                    history.push("/login")

                    
                }
            })
            .catch(err=>{
                console.error(err)
            })
        }
    }
    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input 
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <button className="btn waves-effect blue lighten-1" onClick={()=>PostData()}>
                    Reset Password
                </button>
                <h5>
                    <Link to="/signup">Register</Link>
                </h5>
            </div>
        </div>
    )
}

export default Reset