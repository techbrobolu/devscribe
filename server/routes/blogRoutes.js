const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', verifyToken, createBlog);
router.put('/:id', verifyToken, updateBlog);
router.delete('/:id', verifyToken, deleteBlog);

module.exports = router;
