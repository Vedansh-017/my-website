import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import assets, { blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import moment from 'moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
const Blog = () => {
  const { id } = useParams();

   const {axios} = useAppContext()

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
const [commentText, setCommentText] = useState("");

const handleAddComment = () => {
  if (!name.trim() || !commentText.trim()) return;

  const newComment = {
    name,
    content: commentText,
    createdAt: new Date().toISOString(),
  };

  setComments([newComment, ...comments]);
  setName("");
  setCommentText("");
};



  const fetchBlogData = async () => {
    try{
     const {data} = await axios.get(`/api/blog/${id}`)
     data.success ? setData(data.blog) : toast.error(data.message)
    }catch(error){
        toast.error(error.message)
    }
  };

const fetchComments = async () => {
  try {
    const { data } = await axios.post('/api/blog/comments', { blogId: id });
    data.success ? setComments(data.comments) : toast.error(data.message);
  } catch (error) {
    toast.error(error.message);
  }
};

const addComment = async (e) => {
  e.preventDefault();

  if (!name.trim() || !commentText.trim()) {
    toast.error("Both fields are required");
    return;
  }

  try {
    const { data } = await axios.post('/api/blog/add-comment', {
      blog: id,
      name,
      content: commentText,
    });

    if (data.success) {
      toast.success(data.message);

      // Add the new comment instantly in frontend
      const newComment = {
        name,
        content: commentText,
        createdAt: new Date().toISOString(),
      };
      setComments([newComment, ...comments]);

      // Clear fields
      setName("");
      setCommentText("");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  return data ? (
    <div className='relative'>
      <img
        src={assets.gradientBackground}
        alt=""
        className='absolute -top-40 -z-10 opacity-50'
      />
      <Navbar />
      <div className='text-center mt-20 text-gray-600'>
        <p className='text-blue-600 py-4 font-medium'>
          Published on : {moment(data.createdAt).format('MMM Do YYYY')}
        </p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
          {data.title}
        </h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block text-blue-500 py-1 px-4 rounded-full text-sm font-medium mb-6 border bg-blue-600/5 border-blue-500/25'>
          Michael Brown
        </p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="" className='rounded-3xl mb-5' />
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className='rich-text max-w-3xl mx-auto'
        ></div>

        {/* Comments Section */}
<div className='mt-14 mb-10 max-w-3xl mx-auto'>
  <p className='text-lg font-semibold mb-4'>
    Comments ({comments.length})
  </p>
  <div className='flex flex-col gap-4 w-120'>
    {comments.map((item, index) => (
      <div
        key={index}
        className='relative bg-gray-50 border border-gray-200 p-4 rounded-lg text-gray-700 shadow-sm'
      >
        <div className='flex items-center gap-3 mb-2'>
          <img
            src={assets.user_icon}
            alt=""
            className='w-8 h-8 rounded-full border border-gray-300'
          />
          <p className='font-semibold text-gray-800'>{item.name}</p>
        </div>
        <p className='text-sm ml-11 mb-1 leading-snug text-gray-700'>
          {item.content}
        </p>
        <div className='text-xs ml-11 text-gray-500 text-right'>
          {moment(item.createdAt).fromNow()}
        </div>
      </div>
    ))}
  </div>
</div>

    <div className="w-full max-w-md mx-32 mt-16">
  <p className="text-lg font-semibold mb-3">Add your comment</p>
  <input
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <textarea
    placeholder="Comment"
    value={commentText}
    onChange={(e) => setCommentText(e.target.value)}
    rows="4"
    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
  />
  <button
  onClick={addComment}
  className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
>
  Submit
</button>

</div>
      <div className='my-24 max-w-3xl mx-auto'>
           <p className='font-semibold my-4'>
              Share this article on social media: 
           </p>
              <div className='flex'>
                <img src={assets.facebook_icon}  width={50} alt="" />
                <img src={assets.twitter_icon}  width={50} alt="" />
                <img src={assets.googleplus_icon}  width={50} alt="" />

              </div>
      </div>
      </div>

      <Footer />
    </div>
  ) : (
    // <div className='text-center p-10 text-gray-600'>Loading...</div>
    <Loader/>
  );
};

export default Blog;
