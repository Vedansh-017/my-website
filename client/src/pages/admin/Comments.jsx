import React from 'react'
import { comments_data } from '../../assets/assets';
import { useState, useEffect } from 'react';
import CommenttableItem from '../../components/admin/CommenttableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
const Comments = () => {

   const [comments, setComments] = useState([]);
   const [filter, setFilter] = useState('All');

   const {axios} = useAppContext();
   const fetchComments = async  () => {  
      try {
          const {data} = await axios.get('api/admin/comment')
           data.success ? setComments(data.comments) : toast.error(data.message)
      } catch (error) {
        toast.error(error.message)
      }
   }
    useEffect(() => {
        fetchComments();
    }, []);
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
         <div className='flex justify-between items-center max-w-3xl'>
            <h1>Comments</h1>
            <div className='flex gap-4'>
                <button   onClick={() => setFilter('Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Approved' ? 'text-blue-600' : 'text-gray-700'}`}>Apporved</button>

                 <button  onClick={() => setFilter('Not Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === ' Not Approved' ? 'text-blue-600' : 'text-gray-700'}`}>Not Apporved</button>
            </div>
         </div>

         <div className='relative mt-5  h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg mt-4 bg-white scrollbar-hide'>
              <table className='w-full text-sm text-gray-500'>
                   <thead className='text-gray-700 text-xs uppercase text-left'>
                       <tr>
                           <th scope="col" className='px-6 py-3'>BlogTitle & Comments</th>
                           <th scope="col" className='px-6 py-3 max-sm:hidden'>Data</th>
                           <th scope="col" className='px-6 py-3'>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                          {comments.filter((comment) =>{
                            if(filter === "Approved")
                               return comment.isApproved === true;
                              return comment.isApproved === false;
                          }).map((comment, index) => 
                              <CommenttableItem 
                                  key={comment._id} 
                                  comment={comment} 
                                  index={index + 1}
                                  fetchComments={fetchComments}/>
                          )}
                   </tbody>
 
                </table>
         </div>
    </div>
  )
}

export default Comments
