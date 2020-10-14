import { render } from "@testing-library/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import {Link, useHistory} from 'react-router-dom'
import { UserContext } from "../App";
import M from "materialize-css"
const NavBar = ()=>{
    const searchModal = useRef(null)
    const {state,dispatch}= useContext(UserContext)
    const history = useHistory()
    const [search,setSearch] = useState("")
    const [userDetails,setUserDetails] = useState([])

    useEffect(()=>{
        M.Modal.init(searchModal.current)
    },[])
    
    const renderList = ()=>{
        if(state){
            return [
                <li key="1"><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black",cursor:"pointer"}}>search</i></li>,
                <li key="2"><Link to="/profile">Profile</Link></li>,
                <li key="3"><Link to="/create">Create</Link></li>,
                <li key="4"><Link to="/my_followers_posts">My Following Posts </Link></li>,
                <li key="5">
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
                <li key="6"><Link to="/login">Login</Link></li>,
                <li key="7"><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    const fetchUsers = (query)=>{
        setSearch(query)
        fetch("/search-users",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                query:query
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setUserDetails(result.user)
        })
    }

    return(
        <nav>
            <div className="nav-wrapper white" >
                <Link to={state ? "/" : "/login"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderList()}

                </ul>
            </div>
            <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
                <div className="modal-content">
                    <input 
                    type="text"
                    placeholder="Search user"
                    value={search}
                    onChange={(e)=>fetchUsers(e.target.value)}
                    />
                    <div className="collection">
                        {
                            userDetails ?
                            userDetails.map(user=>{
                                return(
                                    <Link to={state._id === user._id ? "/profile/" : "/profile/"+user._id} className="collection-item" onClick={()=>{
                                        M.Modal.getInstance(searchModal.current).close()
                                    }}>{user.name+" / "+user.email}</Link>
                                )
                            })
                            : "No results"
                        }
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={()=>{
                        setSearch("")
                    }}>Close</a>
                </div>
            </div>
        </nav>

    )
}

export default NavBar