'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Input,
  Select,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  VStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { Add } from 'iconsax-react';
import { FiGrid, FiList } from 'react-icons/fi';
import { loadTodos, saveTodos } from '../../app/storage';
import { TodoDraft, TodoItem, TodoPriority, TodoStatus } from '../../app/types';

type ViewMode = 'table' | 'cards';

const priorityColor: Record<TodoPriority, string> = {
  Low: 'gray',
  Medium: 'teal',
  Important: 'yellow',
  Urgent: 'red',
};

const statusTabs: TodoStatus[] = ['To Do', 'In Progress', 'Complete'];

function useTodos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTodos(loadTodos());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) saveTodos(todos);
  }, [todos, loading]);

  function addTodo(d: TodoDraft) {
    const now = Date.now().toString(36);
    const item: TodoItem = {
      id: now,
      name: d.name,
      description: d.description,
      startDate: d.startDate,
      endDate: d.endDate,
      priority: d.priority,
      status: 'To Do',
      assignees: [],
    };
    setTodos((prev) => [item, ...prev]);
  }

  function updateStatus(id: string, status: TodoStatus) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  return { todos, loading, addTodo, updateStatus };
}

function HeaderBar({
  view,
  setView,
}: {
  view: ViewMode;
  setView: (v: ViewMode) => void;
}) {
  return (
    <Flex align='center' mb={6}>
      <Heading size='lg'>Afdeling Kwaliteit</Heading>
      <Spacer />
      <IconButton
        aria-label='Cards'
        icon={<FiGrid />}
        variant={view === 'cards' ? 'solid' : 'ghost'}
        onClick={() => setView('cards')}
        mr={2}
      />
      <IconButton
        aria-label='Table'
        icon={<FiList />}
        variant={view === 'table' ? 'solid' : 'ghost'}
        onClick={() => setView('table')}
      />
    </Flex>
  );
}

function AddTodoBar({ onAdd }: { onAdd: (d: TodoDraft) => void }) {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState<TodoPriority>('Medium');
  const canAdd = name.trim().length > 1;
  return (
    <HStack gap={3} w='full'>
      <Input
        placeholder='Add task name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Select
        w='44'
        value={priority}
        onChange={(e) => setPriority(e.target.value as TodoPriority)}>
        <option value='Low'>Low</option>
        <option value='Medium'>Medium</option>
        <option value='Important'>Important</option>
        <option value='Urgent'>Urgent</option>
      </Select>
      <Button
        leftIcon={<Add size='18' />}
        colorScheme='teal'
        onClick={() => {
          if (!canAdd) return;
          onAdd({ name: name.trim(), priority });
          setName('');
        }}
        isDisabled={!canAdd}>
        Add Task
      </Button>
    </HStack>
  );
}

function TableView({
  data,
  onAdvance,
}: {
  data: TodoItem[];
  onAdvance: (id: string, next: TodoStatus) => void;
}) {
  return (
    <Table
      variant='simple'
      size='md'
      bg='white'
      borderRadius='md'
      overflow='hidden'>
      <Thead bg='gray.50'>
        <Tr>
          <Th>Name</Th>
          <Th>Date</Th>
          <Th>Assignees</Th>
          <Th>Priority</Th>
          <Th isNumeric>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((t) => {
          const dateLabel =
            t.startDate && t.endDate ? `${t.startDate} - ${t.endDate}` : '—';
          const next: TodoStatus =
            t.status === 'To Do' ? 'In Progress' : 'Complete';
          const canAdvance = t.status !== 'Complete';
          return (
            <Tr key={t.id} _hover={{ bg: 'gray.50' }}>
              <Td>{t.name}</Td>
              <Td>{dateLabel}</Td>
              <Td>{t.assignees?.length ? t.assignees.join(', ') : '—'}</Td>
              <Td>
                <Tag colorScheme={priorityColor[t.priority]}>{t.priority}</Tag>
              </Td>
              <Td isNumeric>
                <Button
                  size='sm'
                  colorScheme='teal'
                  variant='ghost'
                  onClick={() => onAdvance(t.id, next)}
                  isDisabled={!canAdvance}>
                  {canAdvance ? `Mark ${next}` : 'Done'}
                </Button>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

function CardGrid({
  data,
  onAdvance,
}: {
  data: TodoItem[];
  onAdvance: (id: string, next: TodoStatus) => void;
}) {
  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
      {data.map((t) => {
        const next: TodoStatus =
          t.status === 'To Do' ? 'In Progress' : 'Complete';
        const canAdvance = t.status !== 'Complete';
        return (
          <GridItem key={t.id}>
            <Card>
              <CardBody>
                <HStack>
                  <Heading size='sm'>{t.name}</Heading>
                  <Spacer />
                  <Tag colorScheme={priorityColor[t.priority]}>
                    {t.priority}
                  </Tag>
                </HStack>
                {t.description && (
                  <Text mt={2} color='gray.600'>
                    {t.description}
                  </Text>
                )}
                <Button
                  mt={4}
                  size='sm'
                  colorScheme='teal'
                  onClick={() => onAdvance(t.id, next)}
                  isDisabled={!canAdvance}>
                  {canAdvance ? `Mark ${next}` : 'Done'}
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        );
      })}
    </Grid>
  );
}

export default function TodoApp() {
  const { todos, loading, addTodo, updateStatus } = useTodos();
  const [view, setView] = useState<ViewMode>('table');
  const [search, setSearch] = useState('');

  const grouped = useMemo(() => {
    const by: Record<TodoStatus, TodoItem[]> = {
      'To Do': [],
      'In Progress': [],
      Complete: [],
    };
    const q = search.trim().toLowerCase();
    todos.forEach((t) => {
      if (q && !t.name.toLowerCase().includes(q)) return;
      by[t.status].push(t);
    });
    return by;
  }, [todos, search]);

  return (
    <Box bg='gray.100' minH='100vh' py={8}>
      <Container maxW='7xl'>
        <HeaderBar view={view} setView={setView} />

        <Card mb={4}>
          <CardBody>
            <VStack align='stretch' gap={4}>
              <HStack>
                <Input
                  placeholder='Search for To-Do'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </HStack>
              <AddTodoBar onAdd={addTodo} />
            </VStack>
          </CardBody>
        </Card>

        <Tabs colorScheme='teal' variant='enclosed' isFitted>
          <TabList>
            {statusTabs.map((s) => (
              <Tab key={s}>
                <HStack>
                  <Text>{s}</Text>
                  <Tag>{grouped[s].length}</Tag>
                </HStack>
              </Tab>
            ))}
          </TabList>
          <TabPanels bg='transparent' mt={2}>
            {statusTabs.map((s) => (
              <TabPanel key={s} px={0}>
                {loading ? (
                  <Text color='gray.500'>Loading...</Text>
                ) : grouped[s].length === 0 ? (
                  <Text color='gray.500'>No items here yet.</Text>
                ) : view === 'table' ? (
                  <TableView
                    data={grouped[s]}
                    onAdvance={(id, next) => updateStatus(id, next)}
                  />
                ) : (
                  <CardGrid
                    data={grouped[s]}
                    onAdvance={(id, next) => updateStatus(id, next)}
                  />
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}
