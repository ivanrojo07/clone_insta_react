import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "../../App"

const Home = ()=>{

    const [data,setData]= useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch("/all_post",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },

        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    const likePost = (id)=>{
        fetch("/like",{
            method:"put",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id === result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{console.log(err)})
    }
    const unlikePost = (id)=>{
        fetch("/unlike",{
            method:"put",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id === result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{console.log(err)})
    }

    const makeComment = (text,postId)=>{
        fetch("/comment",{
            method:"PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                postId:postId,
                text:text
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id === result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)

        })
    }

    const deletePost = (postId)=>{
        fetch(`/deleted_post/${postId}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            },

        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
       <div className="home">
           {
               data.map(item=>{
                   return (
                    <div className="card home-card" key={item._id}>
                        <h5>
                            {item?.postedBy?.name}
                            
                            {
                                item.postedBy._id === state._id &&
                                <i className="material-icons" style={{
                                    float:"right",
                                    cursor:"pointer"
                                }} onClick={()=>{deletePost(item._id)}}>
                                    delete
                                </i> 
                            }
                        </h5>
                        <div className="card-image">
                            <img src={item.photo} alt=""/>
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{color:"red",cursor:"pointer"}} 
                            onClick={()=>{
                                    if(item.likes.includes(state._id)){
                                        unlikePost(item._id)
                                    }
                                    else{
                                        likePost(item._id)
                                    }
                                }}>{item.likes.includes(state._id) ? "favorite" : "favorite_border"}</i>
                            <h6>{item.likes.length} likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            {
                                item.comments.map(comment=>{
                                    return (
                                    <p key={comment._id}><span style={{fontWeight:"500"}}>{comment.postedBy.name}:</span> {comment.text}</p>
                                    )
                                })
                            }
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                                makeComment(e.target[0].value,item._id)
                            }}>
                                <div className="row">
                                    <input type="text" placeholder="add a comment"/>

                                </div>
                            </form>
                        </div>
                    </div>
                
                   )
               })
           }
           
       </div>
    )
}

export default Home