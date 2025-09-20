import {
  Box,
  Button,
  Grid,
  HStack,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-reactjs';
import { useState } from 'react';

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

export const DatePicker = ({
  value,
  onChange,
  placeholder = 'DD/MM/YYYY',
}: DatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return placeholder;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const selectDate = (date: Date) => {
    onChange(formatDate(date));
  };

  const getQuickDateOptions = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekend = new Date(today);
    const daysUntilSaturday = 6 - today.getDay();
    nextWeekend.setDate(today.getDate() + daysUntilSaturday);

    return [
      { label: 'Today', date: today, shortLabel: 'Thu' },
      { label: 'Tomorrow', date: tomorrow, shortLabel: 'Fri' },
      { label: 'This Weekend', date: nextWeekend, shortLabel: 'Sat' },
      { label: 'Next Week', date: nextWeek, shortLabel: 'Mon' },
    ];
  };

  const days = getDaysInMonth(currentMonth);
  const quickOptions = getQuickDateOptions();

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant='ghost'
          size='sm'
          fontSize='14px'
          color='#A0AEC0'
          fontWeight='normal'>
          {formatDisplayDate(value || '')}
        </Button>
      </PopoverTrigger>
      <PopoverContent w='350px'>
        <PopoverBody p='4'>
          <VStack spacing='4' align='stretch'>
            <VStack spacing='2' align='stretch'>
              {quickOptions.map((option, index) => (
                <HStack
                  key={index}
                  justify='space-between'
                  cursor='pointer'
                  onClick={() => selectDate(option.date)}
                  _hover={{ bg: 'gray.50' }}
                  p='2'
                  borderRadius='md'>
                  <Text fontSize='14px'>{option.label}</Text>
                  <Text fontSize='14px' color='gray.500'>
                    {option.shortLabel}
                  </Text>
                </HStack>
              ))}
            </VStack>

            <Box h='1px' bg='gray.200' />

            <VStack spacing='3' align='stretch'>
              <HStack justify='space-between' align='center'>
                <IconButton
                  aria-label='Previous month'
                  icon={<ArrowLeft2 size='16' />}
                  size='sm'
                  variant='ghost'
                  onClick={() => navigateMonth('prev')}
                />
                <Text fontWeight='medium' fontSize='16px'>
                  {currentMonth.toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>
                <IconButton
                  aria-label='Next month'
                  icon={<ArrowRight2 size='16' />}
                  size='sm'
                  variant='ghost'
                  onClick={() => navigateMonth('next')}
                />
              </HStack>

              <Grid templateColumns='repeat(7, 1fr)' gap='1'>
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(
                  (day) => (
                    <Text
                      key={day}
                      textAlign='center'
                      fontSize='12px'
                      fontWeight='medium'
                      color='gray.500'
                      py='2'>
                      {day}
                    </Text>
                  )
                )}
              </Grid>

              <Grid templateColumns='repeat(7, 1fr)' gap='1'>
                {days.map((day, index) => (
                  <Box
                    key={index}
                    minH='32px'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'>
                    {day && (
                      <Button
                        size='sm'
                        variant='ghost'
                        fontSize='14px'
                        minW='32px'
                        h='32px'
                        onClick={() => selectDate(day)}
                        bg={
                          value === formatDate(day) ? 'blue.500' : 'transparent'
                        }
                        color={value === formatDate(day) ? 'white' : 'inherit'}
                        _hover={{
                          bg:
                            value === formatDate(day) ? 'blue.600' : 'gray.100',
                        }}>
                        {day.getDate()}
                      </Button>
                    )}
                  </Box>
                ))}
              </Grid>
            </VStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
