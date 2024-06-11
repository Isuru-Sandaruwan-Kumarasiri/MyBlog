import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png';
import Page_Animation from '../Common/Page_Animation';
import defaultBanner from "../imgs/blog_banner.png"
import { UploadImage } from '../Common/AWS';
import { EditorContext } from '../Pages/Editor';



function BlogEditor() {

    let blogBannerRef=useRef();

    let {blog:{title,banner,content,tags,des},setBlog}=useContext(EditorContext)

   
    const handleBanner=(e)=>{
        //   console.log(e) // e=>target=>files[0]---->image details

          let img=e.target.files[0];
        //   console.log("Img==>"+img);

          if(img){
            UploadImage(img).then((url)=>{
            // console.log(url)
                if(url){
                    blogBannerRef.current.src=url
                }
            })
          }

          
    }

    const handleTitleKeyDown=(e)=>{
        console.log(e)

        if(e.keyCode==13){
            e.preventDefault();
        }
    }

    const handleTitleChange=(e)=>{
        console.log(e)              //get the console value
        let input=e.target;

        console.log(input.scrollHeight)//you can see height

        input.style.height='auto';
        input.style.height=input.scrollHeight+"px"  //change titile hegith accoeding to the scrolling


        setBlog({...blog})
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

                    <textarea
                       placeholder='Blog Title'
                       className='text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40'
                       onKeyDown={handleTitleKeyDown}
                       onChange={handleTitleChange}
                    >

                    </textarea>


                 </div>

           </section>
        </Page_Animation>
    </>
  )
}

export default BlogEditor