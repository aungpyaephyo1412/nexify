import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model('Comment', CommentSchema);
