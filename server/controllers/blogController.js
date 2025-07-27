const Blog = require('../models/Blog');
const slugify = require('../utils/slugify');

// CREATE
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const slug = generateSlug(title);

    // Check if slug already exists
    const existing = await Blog.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: 'A post with this title already exists.' });
    }

    const newBlog = new Blog({
      title,
      content,
      slug,
      author: req.user.id
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

    if(title){
      blog.title = title;
      blog.content = content;
      blog.slug = slugify(title);
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
