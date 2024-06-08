import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

const UserSchema = new Schema(
  {
    username: { type: String, default: uuidv4(), required: true, unique: true },
    name: { type: String, default: faker.person.fullName() },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
    resetToken: { type: String },
    expiredToken: { type: Date },
    rememberToken: { type: String },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', UserSchema);
