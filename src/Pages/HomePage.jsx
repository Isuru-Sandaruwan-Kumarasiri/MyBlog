import React from 'react'
import Page_Animation from '../Common/Page_Animation'
import InPageNavigation from '../Components/InPageNavigation'

function HomePage() {
  return (
    <Page_Animation>
        <section className='h-cover flex justify-center gap-10'>

            {/* Latest Blogs */}
             <div  className='w-full'>

                <InPageNavigation  routes={["home","trending blogs"]} defaultHidden={["trending blogs"]} >
                          <h1>Latest blog Here</h1>

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