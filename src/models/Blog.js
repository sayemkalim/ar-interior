import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    type: { type: String }, // "h2", "p", "ul", etc.
    text: { type: String }, // for headings & paragraphs
    items: [{ type: String }], // for lists
  },
  { _id: false }
);

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

    // Content Array → supports Strings + Objects
    content: [
      {
        type: mongoose.Schema.Types.Mixed, // allows string or object
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
