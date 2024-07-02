import { useParams } from "react-router-dom";
import Page_Animation from "../Common/Page_Animation";
import InPageNavigation from "../Components/InPageNavigation";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import NoDataMessage from "../Components/NoDataMessage";
import LoadMoreDataBtn from "../Components/LoadMoreData";
import BlogPostCard from "../Components/BlogPostCard";
import axios from "axios";
import { FilterPaginationData } from "../Common/FilterPagination";


const SearchPage=()=>{

    let {query}=useParams()//get the search cookies

    let [blogs,setBlog]=useState(null);


    const searchBlogs=({page=1,create_new_arr=false})=>{
    
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs",{query,page})
        .then(async({data})=>{
            console.log(data.blogs)
            //setBlog(data.blogs)
           //  console.log(data)
           let formatedData=await FilterPaginationData({
             state:blogs,
             data:data.blogs,
             page,
             countRoute:"/search-blogs-count",
             data_to_send:{query},
             create_new_arr
           })
           console.log(formatedData);
           setBlog(formatedData);
     
         })
         .catch(err=>{
            console.log(err)
         })
    
    }
    useEffect(()=>{
        resetState();
        searchBlogs({page:1 ,create_new_arr:true});
    },[query])


    const resetState=()=>{
        setBlog(null);
    }


    return(
       <section className="h-cover flex justify-center gap-10 ">
           <div className="w-full">
              <InPageNavigation routes={[`Search Result from "${query}"`,"Accounts Matched"]} defaultHidden={["Account Matched"]}>
                  
                  <>
                     {
                          blogs==null ?(
                            <Loader/> 
                            ) :(
                              blogs.results.length ?
                                blogs.results.map((blog,i)=>{
                                  return <Page_Animation transition={{duration:1,delay:i*1}} keyValue={i}>
                                            
                                            <BlogPostCard content={blog} author={blog.author.personal_info}/>

                                        </Page_Animation>
                                })
                                :<NoDataMessage message="No Blogs Published Yet"/>
                              )
                        }
                         <LoadMoreDataBtn state={blogs}  fetchDataFun={searchBlogs}/> 
                     
                  </>

              </InPageNavigation>
           </div>

       </section>
    )
}

export default SearchPage;