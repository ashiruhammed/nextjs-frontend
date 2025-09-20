import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar1 } from 'iconsax-reactjs';
import { Task } from '../../src/types/task';
import { priorityColors } from '../../src/data/mockData';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      bg='white'
      p='4'
      borderRadius='md'
      border='1px'
      borderColor='gray.200'
      cursor='grab'
      _active={{ cursor: 'grabbing' }}
      shadow='sm'
      _hover={{ shadow: 'md' }}
      mb='3'>
      <VStack align='stretch' spacing='3'>
        <Text fontWeight='medium' fontSize='sm'>
          {task.title}
        </Text>
        <Flex align='center' gap='2'>
          <Calendar1 size='14' color='#666' />
          <Text fontSize='xs' color='gray.600'>
            {task.startDate} - {task.endDate}
          </Text>
        </Flex>
        <Flex justify='space-between' align='center'>
          <AvatarGroup size='xs' max={3}>
            {task.assignees.map((assignee: string, idx: number) => (
              <Avatar key={idx} name={assignee} size='xs' />
            ))}
          </AvatarGroup>
          <Badge colorScheme={priorityColors[task.priority]} size='sm'>
            {task.priority}
          </Badge>
        </Flex>
      </VStack>
    </Box>
  );
};
