import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import M from "materialize-css"

const CreatePost = ()=>{
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const history = useHistory()
    useEffect(()=>{
        if(url){
            fetch("/create_post",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    title:title,
                    body:body,
                    url:url
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    M.toast({html:data.error,classes:"red darken-3"})
                }
                else{
                    M.toast({html:"Photo upload", classes:"green darken-1"})
                    history.push("/")
                }
            })
            .catch(error=>{console.log(error)})
        }
    },[url])

    const postDetails = ()=>{
        if(!title || !body || !image){
            M.toast({html:"Please add all the fields", classes:"red darken-3"})
        }
        else{
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
            })
            .catch(err=>{
                console.log(err)
            })
            
            
        }
    }

    return (
        <div className="card input-field"
            style={{
                margin:"30px auto",
                maxWidth:"500px",
                padding:"20px",
                textAlign:"center"
            }}>
            <input type="text" placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <input type="text" placeholder="body"
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file"
                    onChange={(e)=>setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect blue darken-1" onClick={()=>postDetails()}>
                Submit
            </button>
        </div>
    )
}

export default CreatePost