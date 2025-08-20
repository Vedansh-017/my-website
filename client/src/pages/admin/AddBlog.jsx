import React, { use } from 'react'
import assets, { blogCategories } from '../../assets/assets'
import { useState } from 'react';
import Quill from 'quill'
import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
 import {parse} from 'marked'
const AddBlog = () => {
  const {axios} = useAppContext();
  const [isAdding, setIsAdding] =  useState(false)
  const [loading , setLoading] =  useState(false)
  const quillRef = React.useRef(null);
  const editorRef = React.useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);
  const [subTitle, setSubTitle] = useState('');
  const generateContent = async () => {
      if(!title)
          return toast.error('Please enter a title')
        try {
          setLoading(true);
          const {data} = await axios.post('/api/blog/generate' ,{prompt :title})
           if(data.success){
            quillRef.current.root.innerHTML = parse(data.content)
           }else{
            toast.error(data.message);
           }
        } catch (error) {
          toast.error(error.message);
        }finally{
          setLoading(false)
        }

  }

  const onSubmiHandler = async (e) => {
  e.preventDefault();
  setIsAdding(true);

  try {
    const blog = {
      title,
      subTitle,
      description: quillRef.current.root.innerHTML,
      category,
      isPublished
    }

    const formData = new FormData();
    formData.append('blog', JSON.stringify(blog));
    formData.append('image', image);

    const { data } = await axios.post('/api/blog/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (data.success) {
      toast.success(data.message);
      setImage(false);
      setTitle('');
      quillRef.current.root.innerHTML = '';
      setCategory('Startup');
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  } finally {
    setIsAdding(false);
  }
};


  useEffect(() => {
    if (!quillRef.current && editorRef.current){
          quillRef.current = new Quill(editorRef.current, {theme: 'snow'});
    }
  }, []);

  return (
    <form 
  className='flex-1 text-gray-600 h-full bg-blue-50/50 overflow-scroll'
  onSubmit={onSubmiHandler}  // ✅ added submit handler
>
  <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 rounded shadow'>
    <p>Upload Thumbnail</p>
    <label htmlFor="image">
      <img 
        src={!image ? assets.upload_area : URL.createObjectURL(image)} 
        alt="" 
        className='mt-2 h-16 rounded cursor-pointer' 
      />
      <input 
        onChange={(e)=> setImage(e.target.files[0])} 
        type="file" id='image' hidden required
      />
    </label>

    <p className='mt-4'> Blog title</p>
    <input 
      type='text' 
      value={title} 
      onChange={(e) => setTitle(e.target.value)} 
      className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' 
      placeholder='Enter blog title' 
      required
    />

    <p className='mt-5'> Subtitle</p>
    <input 
      type='text' 
      value={subTitle} 
      onChange={(e) => setSubTitle(e.target.value)} // ✅ fixed
      className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' 
      placeholder='Type here' 
      required
    />

    <p className='mt-5'> Blog description</p>  
    <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
      <div ref={editorRef}></div>
      <button 
        type='button' 
        disabled ={loading}
        onClick={generateContent}
        className='absolute bottom-1 right-2 ml-2 text-us text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'
      >
        Generate with AI
      </button>
    </div>          

    <p className='mt-4'>Blog category</p>
    <select 
      name='category' 
      value={category} // ✅ add controlled select
      onChange={(e) => setCategory(e.target.value)} 
      className='mt-2 px-3 py-2 border border-gray-300 outline-none rounded'
    >
      <option value="">Select Category</option>
      {blogCategories.map((item,index) => (
        <option key={index} value={item}>{item}</option>
      ))}
    </select>

    <div className='flex gap-2 mt-4'>
      <p>Publish Now</p>
      <input 
        type="checkbox" 
        checked={isPublished} 
        className='scale-125 cursor-pointer'  
        onChange={(e) => setIsPublished(e.target.checked)} 
      />
    </div>

    <button 
      disabled={isAdding} 
      type='submit' 
      className='mt-8 w-40 h-10 bg-blue-600 text-white rounded cursor-pointer text-sm'
    >
      {isAdding ? 'Adding.....' : 'Add Blog'} {/* ✅ fixed button text */}
    </button>
  </div>
</form>

  )
}

export default AddBlog
