import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { profileDataStructure } from "./ProfilePage";
import Page_Animation from "../Common/Page_Animation";
import Loader from "../Components/Loader";
import { Toaster } from "react-hot-toast";
import InputBox from "../Components/InputBox";
import { Link } from "react-router-dom";

const EditProfilePage = () => {

    let profileImgEle=useRef();

    let bioLimit=150;
  let {
    userAuth,
    userAuth: { access_token },
  } = useContext(UserContext);

  const [profile, setProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);
  const [charcterLeft,setCharacterLeft]=useState(bioLimit);

  const {
    personal_info: {
      fullname,
      username: profile_username,
      profile_img,
      email,
      bio,
    },
    social_links,
  } = profile;

  useEffect(() => {
    if (access_token) {
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", {
          username: userAuth.username,
        })
        .then(({ data }) => {
          console.log(data);
          setProfile(data);
          setLoading(false);
        });
    }
  }, [access_token]);

  const handleCharacterChange=(e)=>{

    setCharacterLeft(bioLimit-e.target.value.length)

  }
  const handleImagePreview=(e)=>{
    // console.log(e.target.files[0]);

    let img=e.target.files[0];
    profileImgEle.current.src=URL.createObjectURL(img);
  }

  return (
    <Page_Animation>
      {loading ? (
        <Loader />
      ) : (
        <form action="">
          <Toaster />

          <h1 className="max-md:hidden">Edit Profile</h1>

          <div className="flex flex-col lg:flex-row items-start ppy-10 gap-8 lg:gap-10">
                <div className="max-lg:center mb-5">
                        <label
                            htmlFor="uploadImg"
                            id="profileImgLable"
                            className="relative block w-48 h-48 bg-grey rounded-full overflow-hidden"
                        >
                            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/80 opacity-0 hover:opacity-100 cursor-pointer">
                                Upload Image
                            </div>
                            <img ref={profileImgEle} src={profile_img} alt="" />
                        </label>

                        <input
                            type="file"
                            id="uploadImg"
                            accept="jpeg,.png,.jpeg"
                            hidden
                            onChange={handleImagePreview}
                        />
                        <button className="btn-light mt-5 max-lg:center lg:w-full px-10 ">Upload</button>
                </div>
                <div className="w-full">

                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">

                        <div>
                            <InputBox name="fullname" type="text" value={fullname} placeholder="Full Name" disable={true} icon="fi-rr-user"/>
                        </div>
                        <div>
                            <InputBox name="email" type="email" value={email} placeholder="Email" disable={true} icon="fi-rr-envelope"/>
                        </div>

                    </div>

                    <InputBox type="text" name="username" value={profile_username} icon="fi-rr-at"/>

                    <p className="text-dark-grey -mt-3">Username will use to search user and will be visble to all users</p>

                    <textarea name="bio" id="" maxLength={bioLimit} defaultValue={bio} className="input-box h-64 lg:h-40 resize-none leading-7 mt-5 pl-5"placeholder="Bio" onChange={handleCharacterChange}></textarea>

                    <p className="mt-1 text-dark-grey">{charcterLeft} characters left</p>
                    <p className="my-6 text-dark-grey">Add your social handles below</p>


                    <div className="md:grid md:grid-cols-2 gap-x-6">
                           {
                            Object.keys(social_links).map((key,i)=>{
                                let link =social_links[key];

                                return <InputBox key={i} name={key} type="text" value={link}  placeholder="https://" icon={"fi"+(key !=='website' ? " fi-brands-"+key:" fi-rr-globe")}/>
                               
                            })
                           }
                    </div>
                    
                    <button className="btn-dark w-auto px-10 " type="submit" >Update</button>

                </div>
          </div>
        </form>
      )}
    </Page_Animation>
  );
};
export default EditProfilePage;
