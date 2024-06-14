import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { InputProps } from '@/components/ui/input';
import { fullImagePath } from '@/lib/utils';
import Image from 'next/image';
import { forwardRef } from 'react';
interface Props extends InputProps {
  isError?: boolean;
  errorMessage?: string;
  defaultImage?: string | null;
  imageUrl?: string | null;
}
const FileInput = forwardRef<HTMLInputElement, Props>(
  ({ isError, errorMessage, defaultImage, imageUrl, ...props }, ref) => {
    return (
      <div className="flex items-center justify-center w-full mb-4">
        <label
          htmlFor="dropzone-file"
          className="relative overflow-hidden flex flex-col items-center justify-center w-full h-[200px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {imageUrl && <Image src={imageUrl} alt={''} fill priority />}
          {defaultImage && !imageUrl && (
            <Avatar className="rounded-none absolute inset-0 size-full ">
              <AvatarImage
                className="rounded-none absolute inset-0 size-full "
                src={fullImagePath(defaultImage)}
              />
            </Avatar>
          )}
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 5MB)</p>
          </div>
          <input
            ref={ref}
            id="dropzone-file"
            multiple={false}
            accept={'image/jpeg,image/jpg,image/png'}
            type="file"
            className="hidden"
            {...props}
          />
        </label>
      </div>
    );
  },
);
FileInput.displayName = 'FileInput';

export default FileInput;
