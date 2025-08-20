import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import adminRoutes from './routes/adminRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

const app = express();
 dotenv.config();
// Connect to MongoDB
connectDB();



// Middleware
app.use(cors());
// Parse JSON bodies
app.use(express.json());
 


// Routes
app.get('/', (req, res) => {
  res.send('Hello World!'); 
});

app.use('/api/admin',adminRoutes);
app.use("/api/blog", blogRoutes)



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;