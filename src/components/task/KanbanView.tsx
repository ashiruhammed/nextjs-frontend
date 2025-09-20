import { Badge, Box, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Add } from 'iconsax-reactjs';
import { Column } from '@/types/task';
import { TaskCard } from './TaskCard';

interface KanbanViewProps {
  columns: Column[];
  handleDragEnd: (event: DragEndEvent) => void;
}

interface DroppableColumnProps {
  column: Column;
}

const DroppableColumn = ({ column }: DroppableColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <SortableContext
      items={column.tasks.map((task) => task.id)}
      strategy={verticalListSortingStrategy}>
      <Box flex='1' minW='300px' borderRadius={6}>
        <Flex
          justify='space-between'
          align='center'
          marginBottom={'5px'}
          paddingTop={'5px'}
          paddingBottom={'10px'}
          paddingInline={'5px'}
          bgColor={column.color}
          borderRadius='md'>
          <HStack>
            <HStack bgColor={'white'} padding={'5px'} borderRadius={6}>
              {column.icon}
              <Text fontWeight='medium' fontSize='sm'>
                {column.title}
              </Text>
            </HStack>
            <Badge
              padding={'5px'}
              width={'30px'}
              bgColor={'white'}
              textAlign={'center'}>
              {column.tasks.length}
            </Badge>
          </HStack>
          <IconButton
            aria-label='Add task'
            icon={<Add size='16' />}
            size='xs'
            variant='ghost'
          />
        </Flex>

        <Box
          ref={setNodeRef}
          minH='400px'
          p='2'
          borderRadius='md'
          bg={isOver ? 'blue.50' : 'gray.50'}
          border={isOver ? '3px dashed' : '2px solid'}
          borderColor={isOver ? 'blue.400' : 'gray.200'}
          transition='all 0.2s'
          position='relative'
          _before={
            isOver
              ? {
                  content: '"Drop task here"',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 'lg',
                  fontWeight: 'semibold',
                  color: 'blue.600',
                  pointerEvents: 'none',
                  zIndex: 1,
                  bg: 'white',
                  px: 4,
                  py: 2,
                  borderRadius: 'md',
                  shadow: 'md',
                }
              : undefined
          }>
          {column.tasks.length === 0 && !isOver && (
            <Flex
              align='center'
              justify='center'
              h='200px'
              color='gray.400'
              fontSize='sm'
              textAlign='center'
              flexDirection='column'>
              <Text mb='2'>No tasks yet</Text>
              <Text fontSize='xs'>Drag tasks here or click + to add</Text>
            </Flex>
          )}
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Box>
      </Box>
    </SortableContext>
  );
};

export const KanbanView = ({ columns, handleDragEnd }: KanbanViewProps) => {
  return (
    <Box>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <Flex gap='6' align='flex-start'>
          {columns.map((column) => (
            <DroppableColumn key={column.id} column={column} />
          ))}
        </Flex>
      </DndContext>
    </Box>
  );
};
