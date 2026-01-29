import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [200, 'Title cannot be more than 200 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug'],
    unique: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt'],
    maxlength: [300, 'Excerpt cannot be more than 300 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
  },
  tags: [{
    type: String,
    maxlength: [50, 'Tag cannot be more than 50 characters'],
  }],
  published: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    default: 'Bryan Steven Taco',
  },
  readTime: {
    type: Number, // in minutes
    default: 5,
  },
});

// Update the updatedAt field on save
BlogSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
