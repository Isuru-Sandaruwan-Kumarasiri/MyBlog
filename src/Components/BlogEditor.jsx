import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png';
import Page_Animation from '../Common/Page_Animation';
import defaultBanner from "../imgs/blog_banner.png"
import { UploadImage } from '../Common/AWS';



function BlogEditor() {

    let blogBannerRef=useRef();
   
    const handleBanner=(e)=>{
          console.log(e) // e=>target=>files[0]---->image details

          let img=e.target.files[0];
          console.log("Img==>"+img);

          if(img){
            UploadImage(img).then((url)=>{
            console.log(url)
                if(url){
                    blogBannerRef.current.src=url
                }
            })
          }

          
    }


  return (
    <>
        <nav className='navbar'>
           <Link to='/' className='flex-none w-10 '>
               <img src={logo} alt=""   />
           </Link>
        <p className='max-md:hidden text-black line-clamp-1 w-full'>
            New Blog
        </p>
            <div className='flex gap-4 ml-auto'>
               <button className='btn-dark py-2'>
                   Publish
               </button>
               <button className='btn-light py-2'>
                   Save Draft
               </button>
            </div>
       </nav>


        <Page_Animation>
           <section>


                 <div className='max-auto max-w-[900px] w-full'>

                    <div className='relative aspect-video hover:opacity-80 bg-white border-4 border-grey'>
                        <label htmlFor='uploadBanner'>
                            <img 
                            ref={blogBannerRef}//useRef
                            src={defaultBanner} 
                            alt=""
                            className='z-20'
                             />

                            <input
                                id='uploadBanner'
                                type='file'
                                accept='.png,.jpg,.jpeg'
                                hidden
                                onChange={handleBanner}
                            />
                        </label>

                    </div>


                 </div>

           </section>
        </Page_Animation>
    </>
  )
}

export default BlogEditor