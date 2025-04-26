import mongoose, { Schema, model, models, Document } from 'mongoose';

interface Chapter extends Document {
  book: mongoose.Types.ObjectId;
  chapterName: string;
  chapterNumber: number;
}

const chaptersSchema = new Schema<Chapter>(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Books',
      required: true,
    },
    chapterName: { type: String, required: true },
    chapterNumber: { type: Number, required: true },
  },
  {
    timestamps: true, // Optional: Adds createdAt and updatedAt fields
  }
);

const Chapter = models.Chapters || model('Chapters', chaptersSchema);
export default Chapter;
