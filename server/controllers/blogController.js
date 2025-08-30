import express from 'express';
import fs from 'fs';
import path from 'path';
import Blog from '../models/Blog.js';
import imagekit from '../configs/imagekit.js';
import Comment from '../models/comment.js';
import { create } from 'domain';
import main from '../configs/gemini.js';
 
// admin  use krega 
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    // Upload image to ImageKit
    const response = await imagekit.upload({
      file: fs.createReadStream(imageFile.path), // read stream instead of buffer
      fileName: imageFile.originalname,
      folder: '/blogs'
    });

    // Optimize the image URL
    const optimizedImageUrl = imagekit.url({
      src: response.url,
      transformation: [
        { quality: 'auto' }, // ✅ fixed typo
        { format: 'webp' },
        { width: 1200 }
      ]
    });

    // Save blog to DB
    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished
    });

    res.status(201).json({
      success: true,
      message: "Blog added successfully",
      blog
    });

  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// user use karega
export const getAllBlogs = async (req,res)=>{
    try{
        const blogs =await Blog.find({isPublished :true})
          res.json({success:true ,blogs})
    }catch(error){
           res.json({success : false , message :error.message})   
    }
}

//user use karega jab woh kisi blog pr click karega toh ye wala fn call hoga or woh uski saari jankari laka dega 
export const getBlogById = async(req,res) => {
    try{
       const  {blogId}  =req.params;
       const blog =await Blog.findById(blogId);
       if(!blog){
        return res.json({success : false ,  message : 'Blog not found'});
       }
        res.json({success:true ,blog})
    } catch(error){
        res.json({success : false , message :error.message})   
    }
}

// ye admin use karega agr usko blog delete krna h toh
export const deleteBlogById = async(req,res) =>{
     try{
        const { id } = req.body; 
       await Blog.findByIdAndDelete(id);

       // delete all 
      await Comment.deleteMany({blog : id})
       
        res.json({success:true ,message : 'Blogs deleted successfully'})
    } catch(error){
        res.json({success : false , message :error.message})   
    }
}

/// ye admin use karega agr usko koi publihsed blog ko unpubliash krna h nd vice versa
export const togglePublish = async (req, res) =>{
    try{
          const  {id}  =req.params;
           const blog =await Blog.findById(id);
           blog.isPublished = !blog.isPublished 
           await blog.save();
          res.json({success:true ,message : 'Blogs status Updated'})
    }catch(error){
        res.json({success : false , message :error.message})   
    }
}

// ye user use karega agr usko kisi blog me acomemnt add krna h 
export const addComment = async (req,res) =>{
   try{
          const {blog,name,content} =req.body;
          await Comment.create({blog,name,content})
          res.json({success :true , message : "comment added for review"})
   }
   catch(error){
      res.json({success : false , message :error.message})
   }
}

// ye kisi bhi blog pr comment show krne ke liye which have been approved by admin
export const getBlogComments = async(req,res) =>{
    try{
      const {blogId} =req.body;

      const comments = await Comment.find({blog:blogId , isApproved : true}).sort
      ({createdAt : -1 });
      res.json({success : true, comments})
    } catch(error){
        res.json({success : false, message : error.message})
    }
}


// ye jab admin add blog krte time add generate with AI karega 
// tab ye fn gemini ki api use krke content lake frontend ko de dega
export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({ success: false, message: "Prompt is required" });
    }

    // Call Gemini with a refined prompt
    const content = await main(
      `${prompt}. Generate a blog article on this topic in simple text format.`
    );

    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

