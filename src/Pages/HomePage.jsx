import React, { useEffect, useState } from 'react'
import Page_Animation from '../Common/Page_Animation'
import InPageNavigation, { activeTabRef } from '../Components/InPageNavigation'
import axios from 'axios';
import Loader from '../Components/Loader';
import BlogPostCard from '../Components/BlogPostCard';
import MinimalBlogPostCard from '../Components/MinimalBlogPostCard';
import NoDataMessage from '../Components/NoDataMessage';

function HomePage() {

  let [blogs,setBlog]=useState(null);
  let [trendingBlogs,setTrendingBlog]=useState(null);
  let [pageState,setPageState]=useState("home");

  let categories=["Java","Python","Javascript","React","Node Js","Next Js","tailwindcss"]


  const fetchlatestBlogs=()=>{

    axios.get(import.meta.env.VITE_SERVER_DOMAIN +"/latest-blogs")
    .then(({data})=>{
       //console.log(data.blogs)
       setBlog(data.blogs)

    })
    .catch(err=>{
       console.log(err)
    })
  }

  const fetchTrendingBlogs=()=>{

    axios.get(import.meta.env.VITE_SERVER_DOMAIN +"/latest-blogs")
    .then(({data})=>{
       //console.log(data.blogs)
       setTrendingBlog(data.blogs)

    })
    .catch(err=>{
       console.log(err)
    })
  }

  const fetchBlogsByCategory=()=>{

    axios.post(import.meta.env.VITE_SERVER_DOMAIN +"/search-blogs",{tag:pageState})
    .then(({data})=>{
       //console.log(data.blogs)
       setBlog(data.blogs)

    })
    .catch(err=>{
       console.log(err)
    })

  }

  useEffect(()=>{
   

    activeTabRef.current.click();
    

    if(pageState==="home"){
      fetchlatestBlogs();
    }else{
       fetchBlogsByCategory();
    }

    if (!trendingBlogs){
      fetchTrendingBlogs();
    }
    

  },[pageState])

  const loadBlogBycategory=(e)=>{

    let category=e.target.innerText.toLowerCase();

    setBlog(null);

    if(pageState===category){
      setPageState("home");
      return
    }

    setPageState(category);

  }




  return (
    <Page_Animation>
        <section className='h-cover flex justify-center gap-10'>

            {/* Latest Blogs */}
             <div  className='w-full'>

                <InPageNavigation  routes={[pageState,"trending blogs"]} defaultHidden={["trending blogs"]} >
                          <>
                            {

                                blogs==null ?(
                                <Loader/> 
                                ) :(
                                  blogs.length ?
                                    blogs.map((blog,i)=>{
                                      return <Page_Animation transition={{duration:1,delay:i*1}} keyValue={i}>
                                                
                                                <BlogPostCard content={blog} author={blog.author.personal_info}/>

                                            </Page_Animation>
                                    })
                                    :<NoDataMessage message="No Blogs Published Yet"/>
                                  )
                            }
                          </>

                          {
                            trendingBlogs==null ?
                            <Loader/> 
                            :
                             (
                              trendingBlogs.length?
                                  trendingBlogs.map((blog,i)=>{
                                    return <Page_Animation transition={{duration:1,delay:i*1}} keyValue={i}>
                                              
                                              <MinimalBlogPostCard blog={blog} index={i} />

                                          </Page_Animation>
                                  })
                                :
                                <NoDataMessage message="No TrendingBlogs"/>
                              )
                          }
                </InPageNavigation>
                        

             </div>

            {/* Filter and Trending Blogs */}
            <div className='min-w-[40%] lg:min-w-[400px] max-w-min border-l-4 border-grey pl-8 pt-3 mx-md:hidden ' >  

                <div className='flex flex-col gap-10'>
                      <div>
                          <h1 className='font-medium text-xl mb-8'>Storis from all interests</h1>

                          <div className='flex gap-3 flex-wrap'> 
                              {
                                categories.map((category,i)=>{
                                  return (
                                   <button onClick={loadBlogBycategory} className={`tag ${pageState === category ? 'bg-black text-white' : ''}`}  key={i}>
                                    {category}
                                  </button> 
                                  );                 
                                  
                                })
                              }
                          </div>
                      </div>
                

                      <div>
                          <h1 className='font-medium text-xl mb-8'>Trending<i className='fi fi-rr-arrow-trend-up'></i></h1>
                          {
                                    trendingBlogs==null ?<Loader/> :
                                    trendingBlogs.map((blog,i)=>{
                                      return <Page_Animation transition={{duration:1,delay:i*1}} keyValue={i}>
                                                  
                                                  <MinimalBlogPostCard blog={blog} index={i} />

                                              </Page_Animation>
                                    })
                            }
                      </div>
              </div>
            </div>
        </section>
    </Page_Animation>
  )
}

export default HomePage