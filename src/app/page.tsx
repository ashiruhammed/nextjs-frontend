'use client';

import { Box, useColorModeValue, VStack } from '@chakra-ui/react';
import { DragEndEvent } from '@dnd-kit/core';
import { Status, TaskSquare, TickCircle } from 'iconsax-reactjs';
import { useMemo, useState } from 'react';
import { TaskHeader } from '../../components/task/TaskHeader';
import { SearchBar } from '../../components/task/SearchBar';
import { KanbanView } from '../../components/task/KanbanView';
import { ListView } from '../../components/task/ListView';
import { Task, Column } from '../types/task';
import { initialTasks } from '../data/mockData';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<
    'all' | 'todo' | 'inProgress' | 'complete'
  >('todo');

  const bg = useColorModeValue('gray.50', 'gray.900');

  const columns: Column[] = useMemo(
    () => [
      {
        id: 'todo',
        title: 'To Do',
        tasks: tasks.filter((task) => task.status === 'todo'),
        color: '#F9F3FF',
        icon: <TaskSquare variant='Bold' size={20} color={'#CFB7E8'} />,
      },
      {
        id: 'inProgress',
        title: 'In Progress',
        tasks: tasks.filter((task) => task.status === 'inProgress'),
        color: '#FBF4E4',
        icon: <Status variant='Bold' size={20} color={'#F6BE38'} />,
      },
      {
        id: 'complete',
        title: 'Complete',
        tasks: tasks.filter((task) => task.status === 'complete'),
        color: '#E9F5F7',
        icon: <TickCircle variant='Bold' size={20} color={'#75C5C1'} />,
      },
    ],
    [tasks]
  );

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

    const activeTask = tasks.find((task) => task.id === activeId);
    if (!activeTask) return;

    let newStatus: Task['status'] = activeTask.status;
    if (overId === 'todo' || overId.startsWith('todo-')) newStatus = 'todo';
    else if (overId === 'inProgress' || overId.startsWith('inProgress-'))
      newStatus = 'inProgress';
    else if (overId === 'complete' || overId.startsWith('complete-'))
      newStatus = 'complete';

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === activeId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <Box bg={bg} minH='100vh' p='6' bgColor={'white'} borderRadius={8}>
      <VStack spacing='10px' align='stretch'>
        <TaskHeader />
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        {viewMode === 'kanban' ? (
          <KanbanView columns={columns} handleDragEnd={handleDragEnd} />
        ) : (
          <ListView
            filteredTasks={filteredTasks}
            selectedStatusFilter={selectedStatusFilter}
            setSelectedStatusFilter={setSelectedStatusFilter}
            columns={columns}
            tasks={tasks}
          />
        )}
      </VStack>
    </Box>
  );
}
