import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"

const Profile = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
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
    useEffect(()=>{
        if(image){

            const data = new FormData()
            data.append("file",image)
            data.append("upload_preset","insta-clone")
            data.append("cloud_name","de9mcytbc")
            fetch("https://api.cloudinary.com/v1_1/de9mcytbc/image/upload",{
                method:"POST",
                body:data
            })
            .then(res=>res.json())
            .then(data=>{
                setUrl(data.url)
                console.log(data)
                
                
                fetch("/update_pic",{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result)
                    localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                    dispatch({type:"UPDATEPIC",payload:result.pic})
                    // window.location.reload()
                })
                
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
        
        
    }
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
                    src={state?.pic} 
                    alt="Perfil" 
                    style={{width:"160px",height:"160px",borderRadius:"80px"}}/>
                </div>
                <div className="col s8">
                    <h4>{state ? state.name : "Loading"}</h4>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <h5>{mypics ? mypics.length: 0} posts</h5>
                        <h5>{ state.followers ? state.followers.length : 0} followers</h5>
                        <h5>{ state.following ? state.following.length : 0} following</h5>
                    </div>
                </div>
            </div>

            
            <div className="file-field input-field" style={{margin:"10px 0px 10px 52px"}} >
                <div className="btn">
                    <span>Update Pic</span>
                    <input type="file"
                    onChange={(e)=>updatePhoto(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
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