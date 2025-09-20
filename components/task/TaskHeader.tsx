import { Button, Flex, Heading, HStack, IconButton } from '@chakra-ui/react';
import {
  AddCircle,
  CalendarEdit,
  ExportCurve,
  Filter,
  TickSquare,
} from 'iconsax-reactjs';

interface TaskHeaderProps {
  onAddTask: () => void;
}

export const TaskHeader = ({ onAddTask }: TaskHeaderProps) => {
  return (
    <Flex justify='space-between' align='center'>
      <Heading size='lg' color='gray.700'>
        Afdeling Kwaliteit
      </Heading>
      <HStack spacing='3'>
        <IconButton
          aria-label='Select all'
          icon={<TickSquare size='20' />}
          variant={'outline'}
          size='sm'
          bgColor={'#F7F7F7'}
        />
        <IconButton
          aria-label='Filter'
          icon={<Filter size='20' />}
          variant='outline'
          bgColor={'#F7F7F7'}
          size='sm'
        />
        <IconButton
          aria-label='Calendar'
          icon={<CalendarEdit size='20' />}
          variant='outline'
          bgColor={'#F7F7F7'}
          size='sm'
        />

        <Button
          size='sm'
          bgColor={'purple.500'}
          color={'white'}
          leftIcon={<ExportCurve size='16' />}>
          Export xlsx
        </Button>
        <Button
          size='sm'
          colorScheme='teal'
          leftIcon={<AddCircle size='16' />}
          onClick={onAddTask}>
          Add task
        </Button>
      </HStack>
    </Flex>
  );
};
