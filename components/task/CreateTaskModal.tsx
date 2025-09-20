import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import {
  Calendar1,
  CloseCircle,
  Flag,
  People,
  Status,
  TaskSquare,
  TickCircle,
} from 'iconsax-reactjs';
import { useState } from 'react';
import { Task } from '../../src/types/task';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Omit<Task, 'id'>) => void;
}

export const CreateTaskModal = ({
  isOpen,
  onClose,
  onCreateTask,
}: CreateTaskModalProps) => {
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState<Task['status']>('todo');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assignees, setAssignees] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('Low');
  const [description, setDescription] = useState('');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAssigneeInput, setShowAssigneeInput] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  const handleCreateTask = () => {
    if (!taskName.trim()) return;

    const newTask: Omit<Task, 'id'> = {
      title: taskName,
      startDate: startDate || new Date().toLocaleDateString('en-GB'),
      endDate: endDate || new Date().toLocaleDateString('en-GB'),
      assignees: assignees
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      priority,
      status,
      description,
    };

    onCreateTask(newTask);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTaskName('');
    setStatus('todo');
    setStartDate('');
    setEndDate('');
    setAssignees('');
    setPriority('Low');
    setDescription('');
    setShowStatusDropdown(false);
    setShowDatePicker(false);
    setShowAssigneeInput(false);
    setShowPriorityDropdown(false);
  };

  const getStatusIcon = (statusType: Task['status']) => {
    switch (statusType) {
      case 'todo':
        return <TaskSquare variant='Bold' size={16} color='#CFB7E8' />;
      case 'inProgress':
        return <Status variant='Bold' size={16} color='#F6BE38' />;
      case 'complete':
        return <TickCircle variant='Bold' size={16} color='#75C5C1' />;
    }
  };

  const getStatusColor = (statusType: Task['status']) => {
    switch (statusType) {
      case 'todo':
        return '#CFB7E8';
      case 'inProgress':
        return '#F6BE38';
      case 'complete':
        return '#75C5C1';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent maxW='500px' borderRadius='16px' p='0'>
        <ModalBody p='0'>
          <VStack spacing='0' align='stretch'>
            <HStack justify='space-between' p='24px' pb='16px'>
              <Text
                fontSize='24px'
                fontWeight='medium'
                color={taskName ? 'black' : '#CBD5E0'}>
                {taskName || 'Task Name'}
              </Text>
              <IconButton
                aria-label='Close'
                icon={<CloseCircle size='24' color='#A0AEC0' />}
                variant='ghost'
                onClick={onClose}
              />
            </HStack>

            <VStack spacing='20px' px='24px' pb='24px' align='stretch'>
              <Input
                placeholder='Task Name'
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                variant='unstyled'
                fontSize='24px'
                fontWeight='medium'
                mb='-16px'
                opacity={0}
                position='absolute'
                top='24px'
                left='24px'
                right='60px'
              />

              <HStack justify='space-between' align='center'>
                <HStack spacing='12px'>
                  <Box color='#718096'>
                    <TaskSquare size='20' />
                  </Box>
                  <Text fontSize='16px' color='#1A202C' fontWeight='medium'>
                    Status
                  </Text>
                </HStack>
                <Box position='relative'>
                  <Button
                    size='sm'
                    bgColor={getStatusColor(status)}
                    color='white'
                    leftIcon={getStatusIcon(status)}
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    fontSize='14px'
                    fontWeight='medium'
                    borderRadius='6px'
                    px='12px'>
                    {status === 'todo'
                      ? 'To Do'
                      : status === 'inProgress'
                      ? 'In Progress'
                      : 'Complete'}
                  </Button>
                  {showStatusDropdown && (
                    <Box
                      position='absolute'
                      top='100%'
                      right='0'
                      mt='4px'
                      bg='white'
                      border='1px'
                      borderColor='gray.200'
                      borderRadius='8px'
                      shadow='md'
                      zIndex='10'
                      minW='140px'>
                      {(['todo', 'inProgress', 'complete'] as const).map(
                        (statusOption) => (
                          <HStack
                            key={statusOption}
                            p='8px 12px'
                            cursor='pointer'
                            _hover={{ bg: 'gray.50' }}
                            onClick={() => {
                              setStatus(statusOption);
                              setShowStatusDropdown(false);
                            }}>
                            {getStatusIcon(statusOption)}
                            <Text fontSize='14px'>
                              {statusOption === 'todo'
                                ? 'To Do'
                                : statusOption === 'inProgress'
                                ? 'In Progress'
                                : 'Complete'}
                            </Text>
                          </HStack>
                        )
                      )}
                    </Box>
                  )}
                </Box>
              </HStack>

              <HStack
                justify='space-between'
                align='center'
                cursor='pointer'
                onClick={() => setShowDatePicker(!showDatePicker)}>
                <HStack spacing='12px'>
                  <Box color='#718096'>
                    <Calendar1 size='20' />
                  </Box>
                  <Text fontSize='16px' color='#1A202C' fontWeight='medium'>
                    Dates
                  </Text>
                </HStack>
                <Text fontSize='14px' color='#A0AEC0'>
                  {startDate && endDate
                    ? `${startDate} - ${endDate}`
                    : '00/00/0000'}
                </Text>
              </HStack>

              {showDatePicker && (
                <HStack spacing='4'>
                  <Input
                    type='date'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    size='sm'
                  />
                  <Text>-</Text>
                  <Input
                    type='date'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    size='sm'
                  />
                </HStack>
              )}

              <HStack
                justify='space-between'
                align='center'
                cursor='pointer'
                onClick={() => setShowAssigneeInput(!showAssigneeInput)}>
                <HStack spacing='12px'>
                  <Box color='#718096'>
                    <People size='20' />
                  </Box>
                  <Text fontSize='16px' color='#1A202C' fontWeight='medium'>
                    Assignees
                  </Text>
                </HStack>
                <Text fontSize='14px' color='#A0AEC0'>
                  {assignees || 'Select Assignee'}
                </Text>
              </HStack>

              {showAssigneeInput && (
                <Input
                  placeholder='Enter names separated by commas'
                  value={assignees}
                  onChange={(e) => setAssignees(e.target.value)}
                  size='sm'
                />
              )}

              <HStack justify='space-between' align='center'>
                <HStack spacing='12px'>
                  <Box color='#718096'>
                    <Flag size='20' />
                  </Box>
                  <Text fontSize='16px' color='#1A202C' fontWeight='medium'>
                    Priority
                  </Text>
                </HStack>
                <Box position='relative'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() =>
                      setShowPriorityDropdown(!showPriorityDropdown)
                    }
                    fontSize='14px'>
                    {priority}
                  </Button>
                  {showPriorityDropdown && (
                    <Box
                      position='absolute'
                      top='100%'
                      right='0'
                      mt='4px'
                      bg='white'
                      border='1px'
                      borderColor='gray.200'
                      borderRadius='8px'
                      shadow='md'
                      zIndex='10'
                      minW='120px'>
                      {(['Low', 'Medium', 'Important', 'Urgent'] as const).map(
                        (priorityOption) => (
                          <Box
                            key={priorityOption}
                            p='8px 12px'
                            cursor='pointer'
                            _hover={{ bg: 'gray.50' }}
                            onClick={() => {
                              setPriority(priorityOption);
                              setShowPriorityDropdown(false);
                            }}>
                            <Text fontSize='14px'>{priorityOption}</Text>
                          </Box>
                        )
                      )}
                    </Box>
                  )}
                </Box>
              </HStack>

              <VStack align='stretch' spacing='8px'>
                <HStack spacing='12px'>
                  <Box color='#718096'>
                    <TaskSquare size='20' />
                  </Box>
                  <Text fontSize='16px' color='#1A202C' fontWeight='medium'>
                    Description
                  </Text>
                </HStack>
                <Textarea
                  placeholder='Write something or type'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  minH='120px'
                  resize='none'
                  border='none'
                  bg='gray.50'
                  borderRadius='8px'
                  fontSize='14px'
                  color='#A0AEC0'
                  _placeholder={{ color: '#A0AEC0' }}
                  _focus={{ border: 'none', outline: 'none' }}
                />
              </VStack>

              <Button
                bgColor='#68D391'
                color='white'
                size='lg'
                fontSize='16px'
                fontWeight='medium'
                borderRadius='12px'
                py='16px'
                mt='24px'
                onClick={handleCreateTask}
                _hover={{ bgColor: '#48BB78' }}>
                Create Task
              </Button>
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
