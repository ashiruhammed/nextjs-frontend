'use client';
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  Badge,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiMenu, FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';
import CallIcon from '../../components/icons/call';
import CategoryIcon from '../../components/icons/category';
import Folder2Icon from '../../components/icons/folder-2';
import LogoIcon from '../../components/icons/logo';
import MenuBoardIcon from '../../components/icons/menu-board';
import MessageEditIcon from '../../components/icons/message-edit';
import NewsPaperIcon from '../../components/icons/newspaper';
import NoteIcon from '../../components/icons/note';
import NotificationBingIcon from '../../components/icons/notification-bing';
import PeopleIcon from '../../components/icons/people';
import StickyNoteIcon from '../../components/icons/stickynote';
import TaskSquareIcon from '../../components/icons/tasksquare';

type NavSection = {
  title?: string;
  items?: Array<{
    label: string;
  }>;
  icon: React.ReactNode;
};

const nav: NavSection[] = [
  { title: 'Home', icon: <CategoryIcon stroke='#7988A9' strokeWidth={20} /> },
  { title: 'MKVlanBinnen', icon: <StickyNoteIcon /> },
  { title: 'Document Management', icon: <Folder2Icon /> },
  { title: 'Patient Information', icon: <PeopleIcon /> },
  { title: 'Agenda', icon: <NoteIcon /> },

  {
    title: 'My Department',
    icon: <NewsPaperIcon />,
    items: [
      { label: 'News' },
      { label: 'Members' },
      { label: 'To-Do' },
      { label: 'Form Task' },
      { label: 'Agenda' },
      { label: 'Follow up system' },
    ],
  },

  { title: 'Phone numbers', icon: <CallIcon /> },
  { title: 'My to do Protocols', icon: <TaskSquareIcon /> },
  { title: 'My Notifications', icon: <NotificationBingIcon /> },
  { title: 'Knowledge Base', icon: <MenuBoardIcon /> },
  { title: 'Super Admin', icon: <MessageEditIcon /> },

  {
    title: 'Admin',
    icon: <MessageEditIcon />,
    items: [
      { label: 'Agenda' },
      { label: 'News' },
      { label: 'Poll' },
      { label: 'Department Rules' },
      { label: 'Follow up system' },
    ],
  },
];

function NavItem({ label }: { label: string }) {
  return (
    <Button
      variant='ghost'
      justifyContent='flex-start'
      fontWeight='medium'
      fontSize={14}
      color={useColorModeValue('#464B50', 'gray.200')}
      _hover={{
        bg: useColorModeValue('grey.50', 'gray.700'),
        color: useColorModeValue('grey.100', 'gray.200'),
      }}
      px='8'
      py='2'>
      {label}
    </Button>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const sidebarBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  function SidebarContent() {
    return (
      <Box
        w={collapsed ? '72px' : '320px'}
        bg={sidebarBg}
        p='4'
        borderRight='1px'
        borderColor={borderColor}
        h='100%'
        overflow='auto'>
        <HStack justify='space-between' mb='16'>
          <LogoIcon />
          <IconButton
            aria-label={collapsed ? 'expand' : 'collapse'}
            size='sm'
            variant='ghost'
            onClick={() => setCollapsed((v) => !v)}
            display={{ base: 'none', md: 'inline-flex' }}
          />
        </HStack>
        <VStack align='stretch' spacing='3'>
          {nav.map((section, idx) => (
            <VStack key={idx} align='stretch' spacing={5}>
              {section.title && !collapsed && (
                <div className='flex items-center gap-2'>
                  {section.icon}
                  <Text
                    fontSize='sm'
                    color='#464B50'
                    fontWeight={'semibold'}
                    px='2'
                    py='1'>
                    {section.title}
                  </Text>
                </div>
              )}
              <VStack spacing={5} align={'stretch'}>
                {section?.items?.map((it) => (
                  <NavItem key={it.label} label={collapsed ? '' : it.label} />
                ))}
              </VStack>
            </VStack>
          ))}
        </VStack>
      </Box>
    );
  }
  return (
    <Flex h='100vh' bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Desktop sidebar */}
      <Box display={{ base: 'none', md: 'block' }}>
        <SidebarContent />
      </Box>

      {/* Mobile drawer sidebar */}
      <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p='0'>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex flex='1' direction='column'>
        <Flex
          justify='space-between'
          align='center'
          p='4'
          bg={useColorModeValue('white', 'gray.800')}
          borderBottom='1px'
          borderColor='gray.200'
          h='72px'>
          <HStack spacing='4' flex='1'>
            <IconButton
              aria-label='menu'
              icon={<FiMenu />}
              variant='ghost'
              display={{ base: 'inline-flex', md: 'none' }}
              onClick={onOpen}
            />

            {/* Search Bar */}
            <InputGroup maxW='300px' display={{ base: 'none', md: 'flex' }}>
              <InputLeftElement pointerEvents='none'>
                <FiSearch color='gray.400' />
              </InputLeftElement>
              <Input
                placeholder='M91'
                bg='gray.50'
                border='1px'
                borderColor='gray.200'
                borderRadius='md'
                _focus={{
                  borderColor: 'blue.400',
                  bg: 'white',
                }}
              />
            </InputGroup>
          </HStack>

          {/* Service Icons */}
          <HStack spacing='2' mx='4'>
            <IconButton
              aria-label='Service 1'
              icon={<Box w='6' h='6' bg='orange.400' borderRadius='md' />}
              variant='ghost'
              size='sm'
            />
            <IconButton
              aria-label='Service 2'
              icon={<Box w='6' h='6' bg='teal.400' borderRadius='md' />}
              variant='ghost'
              size='sm'
            />
            <IconButton
              aria-label='Service 3'
              icon={<Box w='6' h='6' bg='blue.400' borderRadius='md' />}
              variant='ghost'
              size='sm'
            />
            <IconButton
              aria-label='Service 4'
              icon={<Box w='6' h='6' bg='red.400' borderRadius='md' />}
              variant='ghost'
              size='sm'
            />
            <Badge colorScheme='purple' borderRadius='md' px='3' py='1'>
              Melding maken
            </Badge>
            <IconButton
              aria-label='VIM'
              icon={<Box w='6' h='6' bg='teal.500' borderRadius='md' />}
              variant='ghost'
              size='sm'
            />
            <IconButton
              aria-label='LMS'
              icon={<Box w='6' h='6' bg='teal.400' borderRadius='md' />}
              variant='ghost'
              size='sm'
            />
            <IconButton
              aria-label='BHV'
              icon={<Box w='6' h='6' bg='teal.400' borderRadius='md' />}
              variant='ghost'
              size='sm'
            />
            <IconButton
              aria-label='DataLek'
              icon={<Box w='6' h='6' bg='teal.400' borderRadius='md' />}
              variant='ghost'
              size='sm'
            />
          </HStack>

          {/* User Section */}
          <HStack spacing='4'>
            <IconButton
              aria-label='notifications'
              icon={<FiBell />}
              variant='ghost'
              position='relative'
            />
            <HStack spacing='2'>
              <Avatar size='sm' name='Paul' />
              <Text
                fontSize='sm'
                fontWeight='medium'
                display={{ base: 'none', md: 'block' }}>
                Hi Paul
              </Text>
              <IconButton
                aria-label='user menu'
                icon={<FiChevronDown />}
                variant='ghost'
                size='sm'
              />
            </HStack>
          </HStack>
        </Flex>

        <Box p='6' overflow='auto'>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
