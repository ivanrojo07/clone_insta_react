import React, {useEffect, createContext, useReducer, useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from "./components/screens/Home"
import Login from "./components/screens/Login"
import Profile from "./components/screens/Profile"
import Signup from "./components/screens/Signup"
import CreatePost from "./components/screens/CreatePost"
import UserProfile from "./components/screens/UserProfile"
import SubscribesUserPosts from "./components/screens/SubscribesUserPosts"
import Reset from "./components/screens/Reset"
import NewPassword from "./components/screens/NewPassword"

import {reducer, initialState} from "./reducers/userReducer"

export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      if(!history.location.pathname.startsWith("/reset_password/")){
        history.push("/login")
      }

      
    }
    console.log(user)
  },[])
  return (
    <Switch>
      <Route exact path="/">
          <Home />
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/my_followers_posts">
        <SubscribesUserPosts />
      </Route>
      <Route exact path="/reset_password">
        <Reset />
      </Route>
      <Route path="/reset_password/:token">
        <NewPassword />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] =useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
