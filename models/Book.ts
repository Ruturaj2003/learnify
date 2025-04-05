import mongoose, { Schema, Types } from 'mongoose';

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    fileUrl: { type: String, required: true },
    uploadedBy: { type: Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
