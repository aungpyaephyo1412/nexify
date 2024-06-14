'use client';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ReactNode, useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

interface Props {
  open: boolean;
  setOpen: (b: boolean) => void;
  children: ReactNode;
}
const DialogDrawer = ({ setOpen, children, open }: Props) => {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="px-0">
          <ScrollArea className="h-[90dvh]">{children}</ScrollArea>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-w-screen-sm mx-auto">
        <ScrollArea className="h-[90dvh] mb-5">{children}</ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default DialogDrawer;
