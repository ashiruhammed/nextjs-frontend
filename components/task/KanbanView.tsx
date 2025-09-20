import { Badge, Box, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Add } from 'iconsax-reactjs';
import { Column } from '../../src/types/task';
import { TaskCard } from './TaskCard';

interface KanbanViewProps {
  columns: Column[];
  handleDragEnd: (event: DragEndEvent) => void;
}

export const KanbanView = ({ columns, handleDragEnd }: KanbanViewProps) => {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Flex gap='6' align='flex-start'>
        {columns.map((column) => (
          <SortableContext
            key={column.id}
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
                id={column.id}
                minH='400px'
                p='2'
                borderRadius='md'
                bg='gray.50'>
                {column.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </Box>
            </Box>
          </SortableContext>
        ))}
      </Flex>
    </DndContext>
  );
};
