import { Fragment } from 'react'
 
const Card = (title, post_by, desc, timestamp, images) => {
 
   return (
       <Fragment>
           <div className='w-1/2 h-72 rounded-xl shadow-lg border border-gray-200'>
               <div className='mt-3 mb-2 mx-4 inline-flex'>
                   <p>creator fullname</p>
                   <p className='ml-4'>timestamp</p>
               </div>
               <div className='text-md font-semibold ml-4'>
                   <p>title</p>
               </div>
               <div className='text-md mt-3 ml-4'>
                   <p>desc</p>
               </div>
           </div>
       </Fragment>
   )
}
 
export default Card