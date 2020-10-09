import React, { useState, useEffect } from "react"

const Home = ()=>{

    const [data,setData]= useState([])
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
    return (
       <div className="home">
           {
               data.map(item=>{
                   return (
                    <div className="card home-card" key={item._id}>
                        <h5>{item?.postedBy?.name}</h5>
                        <div className="card-image">
                            <img src={item.photo} alt=""/>
                        </div>
                        <div className="card-content">
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            <input type="text" placeholder="add a comment"/>
                        </div>
                    </div>
                
                   )
               })
           }
           
       </div>
    )
}

export default Home