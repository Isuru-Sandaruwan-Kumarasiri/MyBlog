import React, { useContext } from 'react'
import { EditorContext } from '../Pages/Editor'

function Tag({tag,tagIndex}) {

    let {blog,blog:{tags},setBlog}=useContext(EditorContext);

    const handleTagDelete=()=>{
        tags=tags.filter(t=>t!=tag);

        setBlog({...blog,tags:tags})
    }


    const handleTagEdit=(e)=>{
        if(e.keycode==13 || e.keycode==188){

          e.preventDefault();

          //let currentTag=e.target.value;//tag text are not e.target.value .it is innerHtmlText
          let currentTag=e.target.innerText;


          tags[tagIndex]=currentTag;
          setBlog({...blog.tags})
          console.log(tags)

          e.target.setAttribute("contentEditable",false);


        }

    }
    const handleEditableEvent=(e)=>{
        e.target.setAttribute("contentEditable",true);
        e.target.focus();
    }



  return (
       <div className='relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10'>
            <p className='outline-none '
            onKeyDown={handleTagEdit} 
            onClick={handleEditableEvent}
             >
                {tag}
            </p>
           <button
              className='mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2' 
              onClick={handleTagDelete}
           >
              <i className='fi fi-br-cross text-sm pointer-events-none'></i>
           </button>
       </div>
  )
}

export default Tag