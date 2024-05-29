import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import UserAuthForm from "./Pages/UserAuthForm";



const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navbar/>}>
                <Route path="signin" element={<UserAuthForm type="sign-in"/>}></Route>
                <Route path="signup" element={<UserAuthForm type="sign-up"/>}></Route>
            </Route>

        </Routes>
    )
}

export default App;