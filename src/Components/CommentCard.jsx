import { useContext, useState } from "react";
import { getDay } from "../Common/Date";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import CommentField from "./CommentField";
import { BlogContext } from "../Pages/BlogPage";




const CommentCard=({index,leftVal,commentData})=>{

    let {commented_by:{personal_info:{profile_img,fullname,username}},commentedAt,comment,_id}=commentData;

    let {blog,blog:{comments:{results:commentsArr}},setBlog}=useContext(BlogContext)

    let {userAuth:{access_token}}=useContext(UserContext);

    const [isReplaying,setReplaying]=useState(false);

    const removeCommentsCards=(startingPoint)=>{
                
        if(commentsArr[startingPoint]){

            while(commentsArr[startingPoint].childrenLevel>commentData.childrenLevel){
                commentsArr.splice(startingPoint,1);
                if(!commentsArr[startingPoint]){
                    break;
                }
            }
        }
        setBlog({...blog,comments:{results:commentsArr}})
    }

    const hideReplies=()=>{

        commentData.isReplyLoaded=false;
        removeCommentsCards(index +1);
    }

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

                    {
                        commentData.isReplyLoaded ? 
                            <button className="text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2"
                                    onClick={hideReplies}
                            
                            >
                            <i className="fi fi-rs-comment-dots"></i> Hide Reply
                            </button> :""
                    }
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