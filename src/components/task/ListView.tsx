import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
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
  Badge,
} from '@chakra-ui/react';
import { Flag, More, Status, TaskSquare, TickCircle } from 'iconsax-reactjs';
import { Column, Task } from '@/types/task';
import { priorityColors } from '@/data/mockData';

interface ListViewProps {
  filteredTasks: Task[];
  selectedStatusFilter: 'all' | 'todo' | 'inProgress' | 'complete';
  setSelectedStatusFilter: (
    filter: 'all' | 'todo' | 'inProgress' | 'complete'
  ) => void;
  columns: Column[];
  tasks: Task[];
}

export const ListView = ({
  filteredTasks,
  selectedStatusFilter,
  setSelectedStatusFilter,
  columns,
  tasks,
}: ListViewProps) => {
  return (
    <Box bg='white'>
      <Flex
        justify='space-between'
        align='center'
        padding={'10px'}
        bg='lightGrey.50'>
        <HStack spacing='6'>
          <Button
            variant={selectedStatusFilter === 'todo' ? 'solid' : 'ghost'}
            size='sm'
            padding={'4px'}
            paddingLeft={'12px'}
            color={selectedStatusFilter === 'todo' ? 'white' : 'brown.50'}
            bgColor={selectedStatusFilter === 'todo' ? '#CFB7E8' : 'white'}
            leftIcon={
              <TaskSquare
                variant='Bold'
                color={selectedStatusFilter === 'todo' ? 'white' : '#CFB7E8'}
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
            variant={selectedStatusFilter === 'inProgress' ? 'solid' : 'ghost'}
            size='sm'
            padding={'4px'}
            paddingLeft={'12px'}
            leftIcon={
              <Status
                variant='Bold'
                color={
                  selectedStatusFilter === 'inProgress' ? 'white' : '#F6BE38'
                }
              />
            }
            color={selectedStatusFilter === 'inProgress' ? 'white' : 'brown.50'}
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
            variant={selectedStatusFilter === 'complete' ? 'solid' : 'ghost'}
            size='sm'
            padding={'4px'}
            paddingLeft={'12px'}
            leftIcon={
              <TickCircle
                variant='Bold'
                color={
                  selectedStatusFilter === 'complete' ? 'white' : '#75C5C1'
                }
              />
            }
            color={selectedStatusFilter === 'complete' ? 'white' : 'brown.50'}
            bgColor={selectedStatusFilter === 'complete' ? '#75C5C1' : 'white'}
            onClick={() => setSelectedStatusFilter('complete')}>
            In Progress
            <Badge
              ml='12'
              paddingBlock={'4px'}
              paddingInline={'10px'}
              bgColor={'#E9F5F7'}
              borderRadius={4}
              variant='subtle'>
              ({columns.find((c) => c.id === 'complete')?.tasks.length || 0})
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
              {['Name', 'Date', 'Assignee', 'Priority', ''].map((header) => (
                <Th
                  key={header}
                  color={'#1A1C1E'}
                  fontSize={14}
                  borderLeft={header !== 'Name' && header !== '' ? '2px' : '0'}
                  fontWeight={'bold'}
                  sx={{
                    borderColor: '#E2E8F0',
                  }}>
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {filteredTasks.map((task) => (
              <Tr key={task.id}>
                <Td fontSize={'14px'} fontWeight='semibold'>
                  {task.title}
                </Td>
                <Td fontSize={'14px'}>
                  {task.startDate} - {task.endDate}
                </Td>
                <Td fontSize={'14px'} fontWeight='semibold'>
                  <AvatarGroup size='xs' max={2}>
                    {task.assignees.map((assignee: string, idx: number) => (
                      <Avatar key={idx} name={assignee} size='xs' />
                    ))}
                  </AvatarGroup>
                </Td>
                <Td fontSize={'14px'}>
                  <Box display={'flex'} alignItems={'center'} gap={2}>
                    <Flag
                      color={priorityColors[task.priority]}
                      variant='Bold'
                      size={18}
                    />
                    {task.priority}
                  </Box>
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

      <Flex justify='space-between' align='center' p='4' borderColor='gray.200'>
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
  );
};
