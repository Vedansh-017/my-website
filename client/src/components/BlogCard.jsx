import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className='cursor-pointer w-full overflow-hidden bg-white rounded-lg shadow hover:scale-105 transition-transform duration-300'
    >
      <img src={image} alt={title} className='aspect-video w-full object-cover' />
      <span className='ml-5 px-3 mt-4 py-1 inline-block bg-blue-100 rounded-full text-blue-600 text-xs'>
        {category}
      </span>
      <div className='p-5'>
        <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
        <p
          className='mb-2 text-xs text-gray-600'
          dangerouslySetInnerHTML={{ __html: description.slice(0, 80) + '...' }}
        ></p>
      </div>
    </div>
  );
};

export default BlogCard;
