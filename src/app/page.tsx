'use client';

import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Add,
  AddCircle,
  Calendar1,
  CalendarEdit,
  ExportCurve,
  Filter,
  More,
  RowHorizontal,
  RowVertical,
  SearchNormal1,
  Status,
  TaskSquare,
  TickCircle,
  TickSquare,
} from 'iconsax-reactjs';
import { useMemo, useState } from 'react';

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
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<
    'all' | 'todo' | 'inProgress' | 'complete'
  >('todo');

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

  // Filter tasks based on search and status
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedStatusFilter !== 'all') {
      filtered = filtered.filter(
        (task) => task.status === selectedStatusFilter
      );
    }

    return filtered;
  }, [tasks, searchTerm, selectedStatusFilter]);

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
    <Box bg={bg} minH='100vh' p='6' bgColor={'white'} borderRadius={8}>
      <VStack spacing='10px' align='stretch'>
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
              leftIcon={<AddCircle size='16' />}>
              Add task
            </Button>
          </HStack>
        </Flex>
        <Flex
          justify='space-between'
          align='center'
          padding={'8px'}
          borderRadius={8}
          bgColor={'grey.50'}
          gap='4'>
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

          <HStack
            spacing='2'
            bgColor={'white'}
            padding={'6px'}
            borderRadius={8}>
            <IconButton
              width={'32px'}
              height={'28px'}
              aria-label='List view'
              icon={
                <RowHorizontal
                  size='20'
                  color={viewMode !== 'list' ? '#7988A9' : '#FFF'}
                />
              }
              bgColor={viewMode === 'list' ? 'grey.100' : 'lightGrey.50'}
              variant={viewMode === 'list' ? 'solid' : 'ghost'}
              onClick={() => setViewMode('list')}
            />
            <IconButton
              width={'32px'}
              height={'28px'}
              aria-label='Kanban view'
              icon={
                <RowVertical
                  size='20'
                  color={viewMode !== 'kanban' ? '#7988A9' : '#FFF'}
                />
              }
              bgColor={viewMode === 'kanban' ? 'grey.100' : 'lightGrey.50'}
              variant={viewMode === 'kanban' ? 'solid' : 'ghost'}
              onClick={() => setViewMode('kanban')}
            />
          </HStack>
        </Flex>{' '}
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
          <Box bg='white'>
            <Flex
              justify='space-between'
              align='center'
              // p='4'
              padding={'10px'}
              bg='lightGrey.50'>
              <HStack spacing='6'>
                <Button
                  variant={selectedStatusFilter === 'todo' ? 'solid' : 'ghost'}
                  size='sm'
                  padding={'4px'}
                  paddingLeft={'12px'}
                  color={selectedStatusFilter === 'todo' ? 'white' : 'brown.50'}
                  bgColor={
                    selectedStatusFilter === 'todo' ? '#CFB7E8' : 'white'
                  }
                  leftIcon={
                    <TaskSquare
                      variant='Bold'
                      color={
                        selectedStatusFilter === 'todo' ? 'white' : '#CFB7E8'
                      }
                    />
                  }
                  onClick={() => setSelectedStatusFilter('todo')}>
                  Todo
                  <Badge
                    ml='12'
                    borderRadius={4}
                    variant='subtle'
                    bgColor={'#F9F3FF'}
                    paddingBlock={'4px'}
                    paddingInline={'10px'}>
                    {tasks.length}
                  </Badge>
                </Button>

                <Button
                  variant={
                    selectedStatusFilter === 'inProgress' ? 'solid' : 'ghost'
                  }
                  size='sm'
                  padding={'4px'}
                  paddingLeft={'12px'}
                  leftIcon={
                    <Status
                      variant='Bold'
                      color={
                        selectedStatusFilter === 'inProgress'
                          ? 'white'
                          : '#F6BE38'
                      }
                    />
                  }
                  color={
                    selectedStatusFilter === 'inProgress' ? 'white' : 'brown.50'
                  }
                  bgColor={
                    selectedStatusFilter === 'inProgress'
                      ? 'priority.important'
                      : 'white'
                  }
                  onClick={() => setSelectedStatusFilter('inProgress')}>
                  In Progress
                  <Badge
                    ml='12'
                    paddingBlock={'4px'}
                    paddingInline={'10px'}
                    bgColor={'#FBF4E4'}
                    borderRadius={4}
                    variant='subtle'>
                    ({columns.find((c) => c.id === 'todo')?.tasks.length || 0})
                  </Badge>
                </Button>
                <Button
                  variant={
                    selectedStatusFilter === 'complete' ? 'solid' : 'ghost'
                  }
                  size='sm'
                  padding={'4px'}
                  paddingLeft={'12px'}
                  leftIcon={
                    <TickCircle
                      variant='Bold'
                      color={
                        selectedStatusFilter === 'complete'
                          ? 'white'
                          : '#75C5C1'
                      }
                    />
                  }
                  color={
                    selectedStatusFilter === 'complete' ? 'white' : 'brown.50'
                  }
                  bgColor={
                    selectedStatusFilter === 'complete' ? '#75C5C1' : 'white'
                  }
                  onClick={() => setSelectedStatusFilter('complete')}>
                  In Progress
                  <Badge
                    ml='12'
                    paddingBlock={'4px'}
                    paddingInline={'10px'}
                    bgColor={'#E9F5F7'}
                    borderRadius={4}
                    variant='subtle'>
                    (
                    {columns.find((c) => c.id === 'complete')?.tasks.length ||
                      0}
                    )
                  </Badge>
                </Button>
              </HStack>
            </Flex>
            <Box
              borderRadius='md'
              overflow='hidden'
              border='1px'
              marginTop={'10px'}
              borderColor='gray.200'>
              <Table variant='simple'>
                <Thead bgColor={'lightGrey.50'}>
                  <Tr>
                    {['Name', 'Date', 'Assignee', 'Priority', ''].map(
                      (header) => (
                        <Th
                          key={header}
                          color={'#1A1C1E'}
                          fontSize={14}
                          borderLeft={
                            header !== 'Name' && header !== '' ? '2px' : '0'
                          }
                          fontWeight={'bold'}
                          sx={{
                            borderColor: '#E2E8F0',
                          }}>
                          {header}
                        </Th>
                      )
                    )}
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
            </Box>

            <Flex
              justify='space-between'
              align='center'
              p='4'
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
