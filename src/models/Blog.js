import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String },
    excerpt: { type: String },
    date: { type: String },
    author: { type: String },
    category: { type: String },
    image: { type: String },

    // SEO Fields
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: [{ type: String }],

    // Rich HTML body from WYSIWYG editor
    htmlContent: { type: String },

    // Legacy block-based content (kept for backward compat)
    content: [{ type: mongoose.Schema.Types.Mixed }],
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
