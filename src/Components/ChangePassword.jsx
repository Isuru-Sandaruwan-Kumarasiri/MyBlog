import React, { useContext, useRef } from "react";
import Page_Animation from "../Common/Page_Animation";
import InputBox from "./InputBox";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../App";


const ChangePassword = () => {

    let {userAuth:{access_token}}=useContext(UserContext);

    let ChangePasswordForm=useRef();//get the form tag reference
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

   const handleSubmit=(e)=>{

    e.preventDefault();

    let form=new FormData(ChangePasswordForm.current);//ChangePasswordForm.current - element tag access
    //console.log(ChangePasswordForm)

    let formData={};

    for(let [key,value] of form.entries()){
        formData[key]=value;
    }
    console.log(formData)

    let {currentPassword ,newPassword}=formData;

    if(!currentPassword.length || !newPassword.length){
        return toast.error("Fill all the inputs");
    }
    if(!passwordRegex.test(currentPassword) || !passwordRegex.test(newPassword)){
        return toast.error("password should be 6 to 20 charchters long with a numeric ,1 lowercase and 1 upercase letters");
    }

    e.target.setAttribute("disabled",true);

    let loadingToast=toast.loading("Updating.....");

    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/change-password",formData,{
        headers:{
            'Authorization':`Bearer ${access_token}`
        }
    })
    .then(()=>{
        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        return toast.success("Password Updated");
    })
    .catch(({response})=>{
        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        return toast.error(response.data.error);
        
    })


    



   }

  return (
    <Page_Animation>
        <Toaster/>
      <form action="" ref={ChangePasswordForm}>
        <h1 className="max-md:hidden ">Change Password</h1>

        <div className="py-10 w-full md:max-w-[400px]">
          <InputBox
            name="currentPassword"
            type="password"
            className="profile-edit-input"
            placeholder="Current Password"
            icon="fi-rr-unlock"
          />
          <InputBox
            name="newPassword"
            type="password"
            className="profile-edit-input"
            placeholder="Current Password"
            icon="fi-rr-unlock"
          />

          <button className="btn-dark px-10" 
                  type="submit"
                  onClick={handleSubmit}
        >
            Change Password
          </button>
        </div>
      </form>
    </Page_Animation>
  );
};

export default ChangePassword;
