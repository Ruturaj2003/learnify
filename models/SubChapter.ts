import mongoose from 'mongoose';

const subChapterSchema = new mongoose.Schema({
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapters',
    required: true,
  },
  chapterName: {
    type: String,
    required: true,
  },
  chapterNumber: Number,
  originalText: {
    type: String,
    required: true,
  },
  simpleExplanation: {
    type: String,
    default: '',
  },
  detailedExplanation: {
    type: String,
    default: '',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  pdfBuffer: {
    type: Buffer, // Store the PDF as a binary buffer
    // required: true,
    default: null,
  },
  quiz: {
    attempted: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    knowledgeScore: { type: Number, default: 0 },
    lastAttemptedAt: { type: Date },
  },
});

const SubChapters =
  mongoose.models.SubChapters ||
  mongoose.model('SubChapters', subChapterSchema);
export default SubChapters;
