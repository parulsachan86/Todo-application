import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env

import express from "express";
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express();
const PORT = process.env.PORT || 8000;


// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)
// Get the directory name from the file path
const __dirname = dirname(__filename)

// Middleware => Use to parse json
app.use(express.json())

// Serves the HTML file from the /public directory
// Tells express to serve all files from the public folder as static assets / file. Any requests for the css files will be resolved to the public directory.
app.use(express.static(path.join(__dirname, '../public')))


// Serving up the HTML file from the /public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Routes
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)

// // Adding a test route
// app.get('/', (req, res) => {
//   res.send('Hello, your server is working!');
// });

app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Explicitly exit with failure code
  } else {
    console.log(`Server started at port ${PORT}`);
  }
});

