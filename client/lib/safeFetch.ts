import z, { ZodSchema } from 'zod';
const safeFetch = async <T extends ZodSchema<any>>(
  schema: T,
  url: URL | RequestInfo,
  init?: RequestInit,
): Promise<{ error: string | null; data: z.TypeOf<T> }> => {
  const basePath = process.env.NEXT_PUBLIC_API_URL as string;
  const response = await fetch(`${basePath}${url}`, init);
  if (!response.ok) return { error: response.statusText, data: null };
  const res = await response.json();
  const validateFields = schema.safeParse(res);
  if (!validateFields.success) {
    console.log(validateFields.error.flatten().fieldErrors);
    return {
      error: validateFields.error.message,
      data: null,
    };
  }
  return {
    data: validateFields.data,
    error: null,
  };
};
export default safeFetch;
