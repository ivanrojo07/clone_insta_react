import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../App"

const Profile = ()=>{
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setProfile(result)
        })
    },[userid])
    return (
        <>
            {userProfile ? 
            
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
                        <h4>{userProfile.user.name}</h4>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <h5>{userProfile.posts.length} posts</h5>
                            <h5>42 followers</h5>
                            <h5>42 following</h5>
                        </div>
                    </div>
                </div>
                <div className="gallery">
                    {
                        userProfile.posts.map(item=>{
                            return (
                                <img key={item._id} className="item"  src={item.photo} alt={item.title}/>
                            )
                        })
                        
                    }
                </div>
            </div>
            
            : <h2>Loading...!</h2>}
            
        </>
    )
}

export default Profile