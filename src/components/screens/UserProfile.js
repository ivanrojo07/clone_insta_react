import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../App"

const UserProfile = ()=>{
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

    const followUser = ()=>{
        fetch("/follow",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({followId:userid})
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return({
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                })
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    const unfollowUser = ()=>{
        fetch("/unfollow",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({followId:userid})
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return({
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers.splice(prevState.user.followers.indexOf(data._id),1)]
                    }
                })
            })
            
        }).catch(err=>{
            console.log(err)
        })
    }
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
                        src={userProfile.user.pic}
                        alt="Perfil" 
                        style={{width:"160px",height:"160px",borderRadius:"80px"}}/>
                    </div>
                    <div className="col s8">
                        <h4>{userProfile.user.name}</h4>
                        <button className="btn waves-effect waves-light blue darken-3" onClick={
                                userProfile.user.followers.includes(state._id) ?
                                ()=>unfollowUser()
                                :
                                ()=>followUser()
                            }>{ userProfile.user.followers.includes(state._id) ? "Unfollow" : "Follow"}</button>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <h5>{userProfile.posts.length} posts</h5>
                            <h5>{userProfile.user.followers?.length} followers</h5>
                            <h5>{userProfile.user.following?.length} following </h5>
                            
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

export default UserProfile