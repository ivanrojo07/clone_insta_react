import React, { useState } from "react"
import {Link, useHistory} from "react-router-dom"
import M from "materialize-css"

const Signup = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){// eslint-disable-line
            M.toast({html:"invalid Email", classes:"red darken-3"})
        }
        else{
            fetch("/signup",{
                method : "POST",
                headers : {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name:name,
                    password:password,
                    email:email
                })
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html:data.error, classes:"red darken-3"})
                }
                else{
                    M.toast({html:data.message, classes:"green darken-3"})
                    history.push("/login")
                }
                console.log(data)
            })

        }
    }
    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input 
                type="text"
                placeholder="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input 
                type="email"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect blue lighten-1" onClick={()=>PostData()}>
                    Signup
                </button>
                <h5>
                    <Link to="/login">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup