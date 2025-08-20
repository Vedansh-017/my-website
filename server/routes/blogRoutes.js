import express from 'express';
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish }    from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js'

const blogRoutes = express.Router();


blogRoutes.post('/add', upload.single('image') ,auth, addBlog);
blogRoutes.get('/all', getAllBlogs);
blogRoutes.get('/:blogId', getBlogById);
blogRoutes.post('/delete' , auth , deleteBlogById);
blogRoutes.post('/toggle-publish' , auth , togglePublish);
blogRoutes.post('/add-comment' , addComment)
blogRoutes.post('/comments' , getBlogComments)
blogRoutes.post('/generate' , auth , generateContent)


export default blogRoutes;
