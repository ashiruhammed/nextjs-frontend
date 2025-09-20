import { priorityColors } from '@/data/mockData';
import { Task } from '@/types/task';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Flag, ProfileCircle } from 'iconsax-reactjs';
import { MdDragIndicator } from 'react-icons/md';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
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
      bg='white'
      p='4'
      borderRadius='md'
      border='2px'
      borderColor={isDragging ? 'blue.300' : 'gray.200'}
      cursor='grab'
      _active={{ cursor: 'grabbing' }}
      shadow={isDragging ? 'lg' : 'sm'}
      _hover={{
        shadow: 'md',
        borderColor: 'blue.200',
        transform: 'translateY(-2px)',
        transition: 'all 0.2s ease',
      }}
      mb='3'
      position='relative'
      opacity={isDragging ? 0.8 : 1}
      {...attributes}
      {...listeners}>
      <Box
        position='absolute'
        top='2'
        right='2'
        color='gray.400'
        _hover={{ color: 'blue.500' }}
        opacity={0.6}
        _groupHover={{ opacity: 1 }}>
        <Icon as={MdDragIndicator} w={4} h={4} />
      </Box>

      <VStack align='stretch' spacing='3' role='group'>
        <HStack justify='space-between' align='flex-start'>
          <Text fontWeight='medium' fontSize='sm' flex='1' pr='6'>
            {task.title}
          </Text>
        </HStack>
        <Flex align='center' gap='2'>
          <Calendar size='20' color='#BAC1CC' />
          <Text fontSize='xs' color='gray.600'>
            {task.startDate} - {task.endDate}
          </Text>
        </Flex>
        <Flex align='center' gap='2'>
          <ProfileCircle size='20' color='#BAC1CC' />
          <AvatarGroup size='xs' max={3}>
            {task.assignees.map((assignee: string, idx: number) => (
              <Avatar key={idx} name={assignee} size='xs' />
            ))}
          </AvatarGroup>
        </Flex>
        <Flex align='center'>
          <Flag
            color={priorityColors[task.priority]}
            variant='Bold'
            size={18}
          />
          <Badge colorScheme={priorityColors[task.priority]} size='sm'>
            {task.priority}
          </Badge>
        </Flex>
      </VStack>
    </Box>
  );
};
