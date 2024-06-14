'use client';
import DialogDrawer from '@/components/dialog-drawer';
import EditProfileForm from '@/components/form/edit-profile-form';
import { Button } from '@/components/ui/button';
import { USER_BY_ID } from '@/types/user.types';
import { useState } from 'react';
const EditProfile = ({ user }: { user: USER_BY_ID }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen((p) => !p)} variant={'outline'} className="rounded-full">
        Edit Profile
      </Button>
      <DialogDrawer open={open} setOpen={setOpen}>
        <EditProfileForm setOpen={setOpen} user={user} />
      </DialogDrawer>
    </>
  );
};

export default EditProfile;
