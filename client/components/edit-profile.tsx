'use client';
import { revalidateP, revalidateT } from '@/app/_action';
import DatePicker from '@/components/date-picker';
import FileInput from '@/components/file-input';
import Message from '@/components/message';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import ValidationInput from '@/components/validation-input';
import safeFetch from '@/lib/safeFetch';
import supabase from '@/lib/supabase';
import { generateBearerToken } from '@/lib/utils';
import { DEFAULT_RETURN_SCHEMA } from '@/types/default';
import { USER_BY_ID, USER_UPDATE_SCHEMA } from '@/types/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useForm } from 'react-hook-form';
const EditProfile = ({ user }: { user: USER_BY_ID }) => {
  const [date, setDate] = useState<Date | null>(
    user.data.dateOfBirth ? new Date(user.data.dateOfBirth) : null,
  );
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<null | string>();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(USER_UPDATE_SCHEMA),
  });
  const image = watch('image');
  useEffect(() => {
    if (image) {
      image.length > 0 && setImageUrl(URL.createObjectURL(image[0]));
    }
  }, [image]);
  const session = useSession({ required: true });
  return (
    <Drawer open={open}>
      <DrawerTrigger asChild>
        <Button onClick={() => setOpen((p) => !p)} variant={'outline'} className="rounded-full">
          Edit Profile
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-screen-sm mx-auto">
        <ScrollArea className="h-[90dvh]">
          <DrawerHeader>
            <DrawerTitle>Edit profile</DrawerTitle>
          </DrawerHeader>
          <form
            id="editProfile"
            onSubmit={handleSubmit(async (data) => {
              const userProfile = user.data.profilePicture;
              let supabaseUrl;
              if (data.image && data.image.length > 0) {
                if (userProfile) {
                  await supabase.storage.from('loopfeed').remove([userProfile]);
                }
                const file = data.image[0];
                const { data: d, error } = await supabase.storage
                  .from('loopfeed')
                  .upload(`avatars/${Date.now()}-----${file.name}`, file, {
                    cacheControl: '3600',
                    upsert: false,
                  });
                if (error) return null;
                supabaseUrl = d?.path;
              }
              const { error } = await safeFetch(DEFAULT_RETURN_SCHEMA, `/users/${user.data.id}`, {
                method: 'PUT',
                cache: 'no-store',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: generateBearerToken(session.data?.user.jwt),
                },
                body: JSON.stringify({
                  name: data.name,
                  ...(date && { dateOfBirth: new Date(date).toISOString() }),
                  ...(data.bio && { bio: data.bio }),
                  ...(supabaseUrl && { profilePicture: supabaseUrl }),
                }),
              });
              if (!error) {
                await session.update({
                  user: {
                    isVerified: true,
                    profilePicture: supabaseUrl,
                    name: data.name,
                    bio: data.bio,
                  },
                });
                await revalidateT(`profile-${user.data.username}`);
                await revalidateP(`/${user.data.username}`);
                setOpen((p) => !p);
                return;
              }
              setError('root', { message: 'Something went wrong!' });
            })}
            className="screen-padding space-y-5"
          >
            {errors.root && <Message message={'Something went wrong!'} type={'error'} />}
            <FileInput
              {...register('image')}
              imageUrl={imageUrl}
              defaultImage={user.data.profilePicture}
            />
            <ValidationInput
              id="name"
              title="name"
              isError={!!errors?.name?.message}
              errorMessage={errors?.name?.message as string}
              {...register('name')}
              placeholder={'Enter name '}
              defaultValue={user.data.name}
            />
            <ValidationInput
              id="bio"
              title="bio"
              isError={!!errors?.bio?.message}
              errorMessage={errors?.bio?.message as string}
              {...register('bio')}
              placeholder={'Enter bio '}
              defaultValue={user.data.bio || ''}
            />
            <DatePicker onChange={setDate} date={date} />
          </form>
          <DrawerFooter>
            <div className="grid grid-cols-2 gap-5">
              <DrawerClose asChild>
                <Button onClick={() => setOpen((p) => !p)} variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
              <SubmitButton form={'editProfile'} isLoading={isSubmitting} name={'Update Profile'} />
            </div>
          </DrawerFooter>
          <ScrollBar orientation={'vertical'} />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default EditProfile;
