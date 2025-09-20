'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  VStack,
  Text,
  Avatar,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AvatarGroup,
  Select,
} from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  SearchNormal1,
  Calendar1,
  ArrowDown2,
  Add,
  TableDocument,
  Element4,
  More,
  ExportSquare,
  Filter,
} from 'iconsax-reactjs';

// Types
interface Task {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  assignees: string[];
  priority: 'Low' | 'Medium' | 'Important' | 'Urgent';
  status: 'todo' | 'inProgress' | 'complete';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

// Sample data
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'MKV Intranet V2',
    startDate: '04/06/2024',
    endDate: '16/06/2014',
    assignees: ['John', 'Sarah', 'Mike'],
    priority: 'Medium',
    status: 'todo',
  },
  {
    id: '2',
    title: 'Design System',
    startDate: '23/06/2024',
    endDate: '24/06/2024',
    assignees: ['John', 'Sarah'],
    priority: 'Important',
    status: 'todo',
  },
  {
    id: '3',
    title: 'Medical Appointment',
    startDate: '16/06/2024',
    endDate: '18/06/2024',
    assignees: ['John', 'Sarah'],
    priority: 'Urgent',
    status: 'todo',
  },
  {
    id: '4',
    title: 'Testing Data',
    startDate: '23/06/2024',
    endDate: '24/06/2024',
    assignees: ['John', 'Sarah'],
    priority: 'Urgent',
    status: 'inProgress',
  },
  {
    id: '5',
    title: 'Patient Request',
    startDate: '16/06/2024',
    endDate: '18/06/2024',
    assignees: ['John', 'Sarah'],
    priority: 'Urgent',
    status: 'inProgress',
  },
  {
    id: '6',
    title: 'Patient Meetup',
    startDate: '23/06/2024',
    endDate: '24/06/2024',
    assignees: ['Mike'],
    priority: 'Low',
    status: 'complete',
  },
];

// Priority colors
const priorityColors = {
  Low: 'gray',
  Medium: 'teal',
  Important: 'yellow',
  Urgent: 'red',
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchTerm, setSearchTerm] = useState('');

  const bg = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Group tasks by status
  const columns: Column[] = useMemo(
    () => [
      {
        id: 'todo',
        title: 'To Do',
        tasks: tasks.filter((task) => task.status === 'todo'),
        color: 'purple',
      },
      {
        id: 'inProgress',
        title: 'In Progress',
        tasks: tasks.filter((task) => task.status === 'inProgress'),
        color: 'orange',
      },
      {
        id: 'complete',
        title: 'Complete',
        tasks: tasks.filter((task) => task.status === 'complete'),
        color: 'teal',
      },
    ],
    [tasks]
  );

  // Filter tasks based on search
  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [tasks, searchTerm]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the task being moved
    const activeTask = tasks.find((task) => task.id === activeId);
    if (!activeTask) return;

    // Determine new status based on drop target
    let newStatus: Task['status'] = activeTask.status;
    if (overId === 'todo' || overId.startsWith('todo-')) newStatus = 'todo';
    else if (overId === 'inProgress' || overId.startsWith('inProgress-'))
      newStatus = 'inProgress';
    else if (overId === 'complete' || overId.startsWith('complete-'))
      newStatus = 'complete';

    // Update task status
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === activeId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Task Card Component (for Kanban view)
  const TaskCard = ({ task }: { task: Task }) => {
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
              {task.assignees.map((assignee, idx) => (
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

  return (
    <Box bg={bg} minH='100vh' p='6'>
      <VStack spacing='6' align='stretch'>
        {/* Header */}
        <Flex justify='space-between' align='center'>
          <Heading size='lg' color='gray.700'>
            Afdeling Kwaliteit
          </Heading>
          <HStack spacing='3'>
            <Button
              size='sm'
              colorScheme='purple'
              leftIcon={<ExportSquare size='16' />}>
              Export xlsx
            </Button>
            <Button size='sm' colorScheme='teal' leftIcon={<Add size='16' />}>
              Add task
            </Button>
          </HStack>
        </Flex>

        {/* Search and View Controls */}
        <Flex justify='space-between' align='center' gap='4'>
          <InputGroup maxW='300px'>
            <InputLeftElement>
              <SearchNormal1 size='16' color='#A0AEC0' />
            </InputLeftElement>
            <Input
              placeholder='Search for To-Do...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg='white'
            />
          </InputGroup>

          <HStack spacing='2'>
            <IconButton
              aria-label='List view'
              icon={<TableDocument size='20' />}
              variant={viewMode === 'list' ? 'solid' : 'ghost'}
              colorScheme='teal'
              onClick={() => setViewMode('list')}
            />
            <IconButton
              aria-label='Kanban view'
              icon={<Element4 size='20' />}
              variant={viewMode === 'kanban' ? 'solid' : 'ghost'}
              colorScheme='teal'
              onClick={() => setViewMode('kanban')}
            />
          </HStack>
        </Flex>

        {/* Content Area */}
        {viewMode === 'kanban' ? (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <Flex gap='6' align='flex-start'>
              {columns.map((column) => (
                <SortableContext
                  key={column.id}
                  items={column.tasks.map((task) => task.id)}
                  strategy={verticalListSortingStrategy}>
                  <Box flex='1' minW='300px'>
                    <Flex
                      justify='space-between'
                      align='center'
                      mb='4'
                      p='3'
                      bg={cardBg}
                      borderRadius='md'
                      border='1px'
                      borderColor='gray.200'>
                      <HStack>
                        <Box
                          w='8px'
                          h='8px'
                          borderRadius='full'
                          bg={`${column.color}.400`}
                        />
                        <Text fontWeight='medium' fontSize='sm'>
                          {column.title}
                        </Text>
                        <Badge variant='subtle' colorScheme={column.color}>
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
        ) : (
          /* List View */
          <Box
            bg='white'
            borderRadius='md'
            overflow='hidden'
            border='1px'
            borderColor='gray.200'>
            {/* List Header */}
            <Flex
              justify='space-between'
              align='center'
              p='4'
              borderBottom='1px'
              borderColor='gray.200'
              bg='gray.50'>
              <HStack spacing='6'>
                {columns.map((column) => (
                  <HStack key={column.id}>
                    <Box
                      w='8px'
                      h='8px'
                      borderRadius='full'
                      bg={`${column.color}.400`}
                    />
                    <Text fontSize='sm' fontWeight='medium'>
                      {column.title}
                    </Text>
                    <Badge variant='subtle' colorScheme={column.color}>
                      ({column.tasks.length})
                    </Badge>
                  </HStack>
                ))}
              </HStack>
              <Select size='sm' maxW='120px' defaultValue='10'>
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
              </Select>
            </Flex>

            {/* Table */}
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Date</Th>
                  <Th>Assignee</Th>
                  <Th>Priority</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredTasks.map((task) => (
                  <Tr key={task.id}>
                    <Td fontWeight='medium'>{task.title}</Td>
                    <Td>
                      {task.startDate} - {task.endDate}
                    </Td>
                    <Td>
                      <AvatarGroup size='sm' max={2}>
                        {task.assignees.map((assignee, idx) => (
                          <Avatar key={idx} name={assignee} size='sm' />
                        ))}
                      </AvatarGroup>
                    </Td>
                    <Td>
                      <Badge colorScheme={priorityColors[task.priority]}>
                        {task.priority}
                      </Badge>
                    </Td>
                    <Td>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<More size='16' />}
                          variant='ghost'
                          size='sm'
                        />
                        <MenuList>
                          <MenuItem>Edit</MenuItem>
                          <MenuItem>Delete</MenuItem>
                          <MenuItem>Duplicate</MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {/* Pagination */}
            <Flex
              justify='space-between'
              align='center'
              p='4'
              borderTop='1px'
              borderColor='gray.200'>
              <Text fontSize='sm' color='gray.600'>
                Rows Per page: 10
              </Text>
              <HStack spacing='2'>
                <Button size='sm' variant='ghost'>
                  1
                </Button>
                <Button size='sm' variant='ghost'>
                  2
                </Button>
                <Button size='sm' variant='ghost'>
                  3
                </Button>
                <Text fontSize='sm' color='gray.600'>
                  ...
                </Text>
                <Button size='sm' variant='ghost'>
                  100
                </Button>
              </HStack>
            </Flex>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
