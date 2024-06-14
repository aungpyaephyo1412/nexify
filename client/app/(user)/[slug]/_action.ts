'use server';

import { action } from '@/lib/utils';
import { USER_UPDATE_SCHEMA } from '@/types/user.types';

export const updateProfile = action(USER_UPDATE_SCHEMA, async (parsedInput) => {
  console.log('action fired');
  console.log(parsedInput);
  return parsedInput;
});
