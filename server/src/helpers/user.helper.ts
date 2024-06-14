import { prisma } from '../utils';

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const LOGIN_USER_DTO = {
  id: true,
  bio: true,
  name: true,
  email: true,
  gender: true,
  isAdmin: true,
  password: true,
  username: true,
  isBlocked: true,
  createdAt: true,
  isVerified: true,
  dateOfBirth: true,
  profilePicture: true,
};
export const USER_DTO = {
  id: true,
  bio: true,
  name: true,
  email: true,
  gender: true,
  isAdmin: true,
  password: true,
  username: true,
  isBlocked: true,
  createdAt: true,
  isVerified: true,
  dateOfBirth: true,
  profilePicture: true,
  _count: {
    select: {
      Followers: true,
      Following: true,
      Post: true,
    },
  },
};
export const USER_BY_ID_DTO = {
  id: true,
  bio: true,
  name: true,
  email: true,
  gender: true,
  isAdmin: true,
  username: true,
  isBlocked: true,
  createdAt: true,
  isVerified: true,
  dateOfBirth: true,
  profilePicture: true,
  Followers: {
    select: {
      id: true,
      followerId: true,
      followingId: true,
    },
  },
  Following: {
    select: {
      id: true,
      followerId: true,
      followingId: true,
    },
  },
  _count: {
    select: {
      Followers: true,
      Following: true,
      Post: true,
    },
  },
};
