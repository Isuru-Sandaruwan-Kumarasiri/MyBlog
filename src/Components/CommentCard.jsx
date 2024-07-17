import { useContext, useState } from "react";
import { getDay } from "../Common/Date";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import CommentField from "./CommentField";

const CommentCard=({index,leftVal,commentData})=>{

    let {commented_by:{personal_info:{profile_img,fullname,username}},commentedAt,comment,_id}=commentData;

    let {userAuth:{access_token}}=useContext(UserContext);

    const [isReplaying,setReplaying]=useState(false);

    const handleReply=()=>{
        if(!access_token){
            return toast.error("Login first to leave a reply")
        }
        setReplaying(preVal=>!preVal);


    }

    return(
        
        <div className="w-full " style={{paddingLeft:`${leftVal*10}px`}}>
            

            <div className="my-5 p-6 rounded-md border border-grey">
                  <div className="flex gap-3 items-center mb-8">
                      <img src={profile_img} alt=""  className="w-6 h-6  rounded-full"/>
                      <p className="line-clamp-1">{fullname}@{username}</p>
                      <p className="min-w-fit ">{getDay(commentedAt)}</p>
                  </div>

                  <p className="font-gelasio text-xl ml-3">{comment}</p>

                  <div className="flex gap-5 items-center mt-5">
                    <button 
                        className="underline"
                        onClick={handleReply}
                        >Reply
                        </button>
                  </div>
                  {
                    isReplaying ?
                    <div className="mt-8">
                          <CommentField action="reply" index={index} replyingTo={_id} setReplying={setReplaying}/>
                    </div>
                    :""
                  }
            </div>

        </div>
    )
}

export default CommentCard;