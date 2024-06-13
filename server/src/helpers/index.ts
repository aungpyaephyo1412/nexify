import { faker } from '@faker-js/faker';

export const generateNumberToken = (min: number, max: number) =>
  faker.number.int({ min, max }).toString();

export const stringToObject = (s: string) =>
  JSON.parse(JSON.stringify(s, null, 2));
