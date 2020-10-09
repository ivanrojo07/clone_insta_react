import React, { useState, useContext } from "react"
import {Link, useHistory} from "react-router-dom"
import {UserContext} from "../../App"
import M from "materialize-css"
const Login = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){// eslint-disable-line
            M.toast({html:"invalid Email", classes:"red darken-3"})
        }
        else{
            fetch("/signin",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email,password
                })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    M.toast({html:data.error,classes:"red darken-3"})
                }
                else{
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    M.toast({html:data.user.name,classes:"green darken-1"})
                    history.push("/")
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
                <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect blue lighten-1" onClick={()=>PostData()}>
                    Login
                </button>
                <h5>
                    <Link to="/signup">Register</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login