import mongoose, { Schema, Types } from 'mongoose';

const SegmentSchema = new Schema(
  {
    book: { type: Types.ObjectId, ref: 'Book', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    order: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.Segment ||
  mongoose.model('Segment', SegmentSchema);
