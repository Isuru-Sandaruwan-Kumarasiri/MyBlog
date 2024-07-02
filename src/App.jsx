import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import UserAuthForm from "./Pages/UserAuthForm";
import { createContext, useEffect, useState } from "react";
import { LookInSession } from "./Common/Session";
import Editor from "./Pages/Editor";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import PageNotFound from "./Pages/PageNotFound"




export const UserContext=createContext({})



const App = () => {

    const [userAuth,setUserAuth]=useState({username: '', access_token: null});

    useEffect(()=>{
          
        let userInSession=LookInSession("user");
        userInSession ? setUserAuth(JSON.parse(userInSession)) :setUserAuth({access_token:null})
        console.log(JSON.parse(userInSession))
        
    },[])


    return (
       <UserContext.Provider value={{userAuth,setUserAuth}}>
            <Routes>
                <Route path="/editor" element={<Editor/>}></Route>
                <Route path="/" element={<Navbar/>}>
                   <Route index element={<HomePage/>}/>
                   <Route path="signin" element={<UserAuthForm type="sign-in"/>}></Route>
                   <Route path="signup" element={<UserAuthForm type="sign-up"/>}></Route>
                   <Route path="search/:query" element={<SearchPage/>}/>
                   <Route path="*" element={<PageNotFound/>} />
                </Route>

            </Routes>
       </UserContext.Provider>
    )
}

export default App;