'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Props {
  onChange: (d: Date) => void;
  date: Date | null;
  title?: string;
}
const DatePicker = ({ onChange, date, title }: Props) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm capitalize">{title || 'Date of Birth'}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? moment(date!.toISOString()).format('LL') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full" align="end">
          <Calendar
            selectRange={false}
            value={date}
            onChange={(value) => {
              if (value) onChange(new Date(value?.toString()));
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
