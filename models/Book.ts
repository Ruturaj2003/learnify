import mongoose, { Schema, Types } from 'mongoose';

const bookSchema = new mongoose.Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: Date.now },
});

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default Book;
