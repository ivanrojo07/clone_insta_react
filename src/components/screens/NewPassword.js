import React, { useState, useContext } from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import M from "materialize-css"
const NewPassword = ()=>{
    const history = useHistory()
    const [password,setPassword] = useState("")
    const {token} = useParams()
    console.log(token)
    const PostData = ()=>{
        fetch("/new-password",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                password,
                token
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
    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input 
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect blue lighten-1" onClick={()=>PostData()}>
                    Login
                </button>
                <h5>
                    <Link to="/signup">Register</Link>
                </h5>
                <h5>
                    <Link to="/reset_password">Forgot you password?</Link>
                </h5>
            </div>
        </div>
    )
}

export default NewPassword