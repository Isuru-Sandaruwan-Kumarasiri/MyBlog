import { useContext } from "react";
import { BlogContext } from "../Pages/BlogPage";

const CommentsWrapper=()=>{

    let {blog :{title},commentsWrapper,setCommentWrapper,totalParentCommentsLoaded,setTotalParentCommentsLoaded}=useContext(BlogContext);

    return(
        <div className={"max-sm:w-full fixed  "+(commentsWrapper ? "top-0 sm:right-0":"top-[100%] sm:right-[-100%]")+"  duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-8 px-16 overflow-y-auto overflow-x-hidden"}>
             
             <div className="relative">
                <h1 className="text-xl font-medium">Comments</h1>
                <p className="text-lg mt-2 w-[70%] text-dark-grey line-clamp-1">{title}</p>

                <button 
                  onClick={()=>setCommentWrapper(preVal=>!preVal)}
                  className="absolute top-0 right-0 flex justify-center items-center w-12 h-12 rounded-full bg-grey">
                    <i className="fi fi-br-cross"></i>    
                </button>
             </div>

             <hr className="border-grey my-8 w-[120%] -ml-10" />

        </div>
    )
}
export default CommentsWrapper;