import React from 'react'

function InPageNavigation({routes}) {
  return (
    <>
       <div className='relative mb-8 bg-white border-b flex flex-nowrap overflow-hidden'>

        {
            routes.map((route,i)=>{
                return route;
            })
        }

       </div>

      

    </>
  )
}

export default InPageNavigation