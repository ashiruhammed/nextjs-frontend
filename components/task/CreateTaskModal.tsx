import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Controller, useForm } from 'react-hook-form';
import { mockUsers } from '../../src/data/mockUsers';
import {
  CreateTaskFormData,
  createTaskSchema,
} from '../../src/schemas/taskSchema';
import { Task } from '../../src/types/task';
import { DatePicker } from '../ui/DatePicker';

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
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      status: 'todo',
      startDate: '',
      endDate: '',
      assignees: [],
      priority: 'Low',
      description: '',
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: CreateTaskFormData) => {
    try {
      const taskData: Omit<Task, 'id'> = {
        title: data.title,
        status: data.status,
        startDate: data.startDate || new Date().toISOString().split('T')[0],
        endDate: data.endDate || new Date().toISOString().split('T')[0],
        assignees: data.assignees,
        priority: data.priority,
        description: data.description,
      };

      onCreateTask(taskData);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const resetForm = () => {
    reset();
    setShowStatusDropdown(false);
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

  const getStatusLabel = (statusType: Task['status']) => {
    switch (statusType) {
      case 'todo':
        return 'To Do';
      case 'inProgress':
        return 'In Progress';
      case 'complete':
        return 'Complete';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent maxW='500px' borderRadius='16px' p='0'>
        <ModalBody p='0'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing='0' align='stretch'>
              <HStack justify='space-between' p='24px' pb='16px'>
                <Input
                  placeholder='Task Name'
                  variant='unstyled'
                  onChange={(e) => setValue('title', e.target.value)}
                  fontSize='24px'
                  fontWeight='medium'
                />
                <IconButton
                  aria-label='Close'
                  icon={<CloseCircle size='24' color='#A0AEC0' />}
                  variant='ghost'
                  onClick={onClose}
                />
              </HStack>

              <VStack spacing='20px' px='24px' pb='24px' align='stretch'>
                <FormControl isInvalid={!!errors.title}>
                  <Controller
                    name='title'
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder='Task Name'
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
                    )}
                  />
                  <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                </FormControl>

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
                      bgColor={getStatusColor(watchedValues.status)}
                      color='white'
                      leftIcon={getStatusIcon(watchedValues.status)}
                      onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                      fontSize='14px'
                      fontWeight='medium'
                      borderRadius='6px'
                      px='12px'>
                      {getStatusLabel(watchedValues.status)}
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
                                setValue('status', statusOption);
                                setShowStatusDropdown(false);
                              }}>
                              {getStatusIcon(statusOption)}
                              <Text fontSize='14px'>
                                {getStatusLabel(statusOption)}
                              </Text>
                            </HStack>
                          )
                        )}
                      </Box>
                    )}
                  </Box>
                </HStack>

                <HStack justify='space-between' align='center'>
                  <HStack spacing='12px'>
                    <Box color='#718096'>
                      <Calendar1 size='20' />
                    </Box>
                    <Text fontSize='16px' color='#1A202C' fontWeight='medium'>
                      Dates
                    </Text>
                  </HStack>
                  <HStack spacing='2'>
                    <Controller
                      name='startDate'
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          placeholder='Start Date'
                        />
                      )}
                    />
                    <Text fontSize='14px' color='#A0AEC0'>
                      -
                    </Text>
                    <Controller
                      name='endDate'
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          placeholder='End Date'
                        />
                      )}
                    />
                  </HStack>
                </HStack>

                <HStack justify='space-between' align='center'>
                  <HStack spacing='12px'>
                    <Box color='#718096'>
                      <People size='20' />
                    </Box>
                    <Text fontSize='16px' color='#1A202C' fontWeight='medium'>
                      Assignees
                    </Text>
                  </HStack>
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        size='sm'
                        variant='outline'
                        fontSize='14px'
                        rightIcon={
                          watchedValues.assignees.length > 0 ? (
                            <Badge
                              colorScheme='blue'
                              borderRadius='full'
                              fontSize='xs'>
                              {watchedValues.assignees.length}
                            </Badge>
                          ) : undefined
                        }>
                        {watchedValues.assignees.length > 0
                          ? `${watchedValues.assignees.length} selected`
                          : 'Select Assignees'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent w='250px'>
                      <PopoverBody>
                        <VStack align='stretch' spacing='2'>
                          {mockUsers.map((user) => (
                            <HStack key={user} spacing='3'>
                              <Controller
                                name='assignees'
                                control={control}
                                render={({ field }) => (
                                  <Checkbox
                                    isChecked={field.value.includes(user)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        field.onChange([...field.value, user]);
                                      } else {
                                        field.onChange(
                                          field.value.filter(
                                            (assignee: string) =>
                                              assignee !== user
                                          )
                                        );
                                      }
                                    }}
                                  />
                                )}
                              />
                              <Avatar name={user} size='sm' />
                              <Text fontSize='14px'>{user}</Text>
                            </HStack>
                          ))}
                        </VStack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </HStack>

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
                      {watchedValues.priority}
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
                        {(
                          ['Low', 'Medium', 'Important', 'Urgent'] as const
                        ).map((priorityOption) => (
                          <Box
                            key={priorityOption}
                            p='8px 12px'
                            cursor='pointer'
                            _hover={{ bg: 'gray.50' }}
                            onClick={() => {
                              setValue('priority', priorityOption);
                              setShowPriorityDropdown(false);
                            }}>
                            <Text fontSize='14px'>{priorityOption}</Text>
                          </Box>
                        ))}
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
                  <FormControl>
                    <Controller
                      name='description'
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder='Write something or type'
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
                      )}
                    />
                  </FormControl>
                </VStack>

                <Button
                  type='submit'
                  bgColor='#68D391'
                  color='white'
                  size='lg'
                  fontSize='16px'
                  fontWeight='medium'
                  borderRadius='12px'
                  py='16px'
                  mt='24px'
                  isLoading={isSubmitting}
                  loadingText='Creating...'
                  _hover={{ bgColor: '#48BB78' }}>
                  Create Task
                </Button>
              </VStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
