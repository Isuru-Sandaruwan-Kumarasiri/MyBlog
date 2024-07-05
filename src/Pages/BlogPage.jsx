import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Page_Animation from "../Common/Page_Animation";
import Loader from "../Components/Loader";
import { getDay } from "../Common/Date";
import BlogInteraction from "../Components/BlogInteraction";
import BlogPostCard from "../Components/BlogPostCard";


export const blogStructure={
    title:'',
    des:'',
    content:[],
    author:{personal_info:{ }},
    banner:"",
    publishedAt:'',
}

export const BlogContext =createContext({});

const BlogPage=()=>{
     
    let {blog_id}=useParams();

    const [blog,setBlog]=useState(blogStructure);
    const [loading,setLoading]=useState(true);
    const [similerBlogs,setSimilerBlogs]=useState(null);

    let {title,content,banner,author:{personal_info:{ fullname,username:author_username,profile_img}},publishedAt}=blog;

    const fetchBlog=()=>{

        axios.post(import.meta.env.VITE_SERVER_DOMAIN +"/get-blog",{blog_id})
        .then(({data:{blog}})=>{

            axios.post(import.meta.env.VITE_SERVER_DOMAIN +"/search-blogs",{tag:blog.tags[0],limit:6,eliminate_blog:blog_id})//dant tiyena blog id eka natuwa tag[0] blog ekak seveema
            .then(({data})=>{
                 setSimilerBlogs(data.blogs)
                 console.log(data.blogs)
            })

            //console.log(blog)
            setBlog(blog);//
            setLoading(false);

        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{

        resetStates();
        fetchBlog();
    },[blog_id])


    const resetStates=()=>{
        setBlog(blogStructure);
        setSimilerBlogs(null);
        setLoading(true);
    }

      return(
        <Page_Animation>
            {
                loading ? <Loader/>
                :
                <BlogContext.Provider value={{blog,setBlog}}>

                    <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
                        
                        <img src={banner} alt="" className="aspect-vedio" />

                        <div className="mt-12">
                            <h2>{title}</h2>

                            <div className="flex max-sm:flex-col justify-between my-8">
                                <div className="flex gap-5 items-start">
                                    <img src={profile_img} alt="" className="w-12 h-12 rounded-full" />

                                    <p>
                                        {fullname}
                                        <br />
                                        <Link to={`/user/${author_username}`}className="underline" >@{author_username}</Link>
                                    </p>
                                </div>

                                <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">Published on {getDay(publishedAt)}</p>

                            </div>
                        </div>

                        <BlogInteraction/>

                        {/* Blog content will go over here */}

                        <BlogInteraction/>
                        {
                            similerBlogs!==null && similerBlogs.length?
                            <>
                               <h1 className="text-2xl mt-14 mb-10 font-medium">Similar Blogs</h1>
                               {
                                similerBlogs.map((blog,i)=>{
                                    let {author :{personal_info}}=blog;

                                    return <Page_Animation key={i} transition={{duration:1,delay:i*0.08}}>
                                              
                                               <BlogPostCard content={blog} author={personal_info}/>

                                           </Page_Animation>
                                })
                               }
                            </>
                            :""
                        }

                    </div>

                </BlogContext.Provider>
                
            }
        </Page_Animation>
      )
}
export default BlogPage;