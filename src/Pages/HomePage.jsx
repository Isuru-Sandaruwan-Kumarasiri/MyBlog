import React, { useEffect, useState } from 'react'
import Page_Animation from '../Common/Page_Animation'
import InPageNavigation from '../Components/InPageNavigation'
import axios from 'axios';
import Loader from '../Components/Loader';

function HomePage() {

  let [blogs,setBlog]=useState(null);

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

  useEffect(()=>{

    fetchlatestBlogs();

  },[])




  return (
    <Page_Animation>
        <section className='h-cover flex justify-center gap-10'>

            {/* Latest Blogs */}
             <div  className='w-full'>

                <InPageNavigation  routes={["home","trending blogs"]} defaultHidden={["trending blogs"]} >
                          <>
                            {
                              blogs==null ?<Loader/> :
                              blogs.map((blog,i)=>{
                                return <h1 key={i}> {blog.title}</h1>
                              })
                            }
                          </>

                          <h1>Trending Blogs Heres</h1>
                </InPageNavigation>

             </div>

            {/* Filter and Trending Blogs */}
             <div>


             </div>
        </section>
    </Page_Animation>
  )
}

export default HomePage