import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    caption: { type: String },
    imageUrl: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

export const PostModel = mongoose.model('Post', PostSchema);
