import express from 'express';
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from '../controllers/adminControllers.js';
import auth from '../middleware/auth.js'

const adminRoutes = express.Router();

adminRoutes.post('/login', adminLogin);
adminRoutes.get('/comment',auth, getAllComments);
adminRoutes.get('/blogs',auth, getAllBlogsAdmin);
adminRoutes.post('/delete-comment',auth, deleteCommentById);
adminRoutes.post('/approve-comment',auth, approveCommentById);
adminRoutes.get('/dashboard',auth, getDashboard);

export default adminRoutes;