import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"

const Profile = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    console.log(state)
    useEffect(()=>{
        fetch("/my_post",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setPics(result.posts)
        }).catch(err=>console.log(err))
    },[])
    return (
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px",
                borderBottom:"1px solid grey"
            }} className="row">
                <div className="col s4">
                    <img 
                    src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160&q=80" 
                    alt="Perfil" 
                    style={{width:"160px",height:"160px",borderRadius:"80px"}}/>
                </div>
                <div className="col s8">
                    <h4>{state ? state.name : "Loading"}</h4>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <h5>{mypics ? mypics.length: 0} posts</h5>
                        <h5>42 followers</h5>
                        <h5>42 following</h5>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return (
                            <img key={item._id} className="item"  src={item.photo} alt={item.title}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile