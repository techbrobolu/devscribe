const Blog = require('../models/Blog');
const slugify = require('slugify');

// CREATE
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const slug = slugify(title, { lower: true });

    const newBlog = new Blog({
      title,
      content,
      slug,
      author: req.user.userId
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create blog' });
  }
};

// GET ALL
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
};

// GET ONE BY SLUG
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate('author', 'username');

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching blog' });
  }
};

// UPDATE
exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.slug = slugify(blog.title, { lower: true });

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update blog' });
  }
};

// DELETE
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await blog.remove();
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete blog' });
  }
};
