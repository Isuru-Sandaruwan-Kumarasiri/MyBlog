import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import UserAuthForm from "./Pages/UserAuthForm";
import { createContext, useEffect, useState } from "react";
import { LookInSession } from "./Common/Session";




export const UserContext=createContext({})



const App = () => {

    const [userAuth,setUserAuth]=useState({});

    useEffect(()=>{
          
        let userInSession=LookInSession("user");
        userInSession ? setUserAuth(JSON.parse(userInSession)) :setUserAuth({access_token:null})
        
    },[])


    return (
       <UserContext.Provider value={{userAuth,setUserAuth}}>
            <Routes>
                <Route path="/" element={<Navbar/>}>
                   <Route path="signin" element={<UserAuthForm type="sign-in"/>}></Route>
                   <Route path="signup" element={<UserAuthForm type="sign-up"/>}></Route>
                </Route>

            </Routes>
       </UserContext.Provider>
    )
}

export default App;