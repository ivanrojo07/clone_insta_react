import { render } from "@testing-library/react";
import React, { useContext } from "react";
import {Link, useHistory} from 'react-router-dom'
import { UserContext } from "../App";

const NavBar = ()=>{
    const {state,dispatch}= useContext(UserContext)
    const history = useHistory()
    const renderList = ()=>{
        if(state){
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Create</Link></li>,
                <li>
                    <button className="btn waves-effect waves-light red darken-3"
                    onClick={()=>{
                        fetch("/logout",{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            data:{}
                        }).then(res=>res.json())
                        .then(result=>{
                            if(result.message){
                                dispatch({type:"CLEAR"})
                                history.push("/login")
                            }
                        })
                        
                    }}>
                        Logout
                    </button>
                </li>
            ]
        }else{
            return [
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    return(
        <nav>
            <div className="nav-wrapper white" style={{color:"black"}}>
                <Link to={state ? "/" : "/login"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderList()}

                </ul>
            </div>
        </nav>
    )
}

export default NavBar