import React, { createContext, useEffect, useReducer, useContext } from 'react';
import './App.css';
import {BrowserRouter,Route, Switch,useHistory} from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';
import {reducer,initialState} from './reducers/useReducers'
import UserProfile from './components/screens/UserProfile';
export const userContext=createContext()

const Routing=()=>{
  const history=useHistory();
  const{state,dispatch}=useContext(userContext)
  useEffect(() => {
    const user=JSON.parse(localStorage.getItem("user"))

    if(user){
      dispatch({type:"USER",payload:user});
      
    }else{
      history.push("/signin")
    }
  }, [])
  return (
    <Switch>
      <Route exact path='/'><Home/></Route>
      <Route path="/signin"><Login/></Route>
      <Route path="/signup"><Signup/></Route>
      <Route exact path='/profile'><Profile/></Route>
      <Route path='/create'><CreatePost/></Route>
      <Route path="/profile/:userid"><UserProfile/></Route>
    </Switch>

  )
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <userContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar/>
      <Routing/>
    </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
