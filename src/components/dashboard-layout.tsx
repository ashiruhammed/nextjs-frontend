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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
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
import PentagonIcon from '../../components/icons/pentagon';
import SettingsIcon from '../../components/icons/settings';
import BcxIcon from '../../components/icons/bcx';
import ERedIcon from '../../components/icons/ered';

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
        bg: useColorModeValue('gray.50', 'gray.700'),
        color: useColorModeValue('gray.800', 'gray.200'),
      }}
      px='8'
      py='2'
      w='full'>
      {label}
    </Button>
  );
}

function SimpleNavItem({
  title,
  icon,
  collapsed,
}: {
  title: string;
  icon: React.ReactNode;
  collapsed: boolean;
}) {
  return (
    <Button
      variant='ghost'
      justifyContent='flex-start'
      fontWeight='semibold'
      fontSize={14}
      color='#464B50'
      _hover={{
        bg: useColorModeValue('gray.50', 'gray.700'),
      }}
      leftIcon={!collapsed && React.isValidElement(icon) ? icon : undefined}
      px={collapsed ? '2' : '4'}
      py='3'
      w='full'
      h='auto'>
      {collapsed ? icon : title}
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
        <HStack justify='space-between' mb='8'>
          <LogoIcon />
          <IconButton
            aria-label={collapsed ? 'expand' : 'collapse'}
            size='sm'
            variant='ghost'
            onClick={() => setCollapsed((v) => !v)}
            display={{ base: 'none', md: 'inline-flex' }}
          />
        </HStack>

        <VStack align='stretch' spacing='2'>
          {nav.map((section, idx) => {
            if (section.items && section.items.length > 0) {
              return (
                <Accordion key={idx} allowToggle>
                  <AccordionItem border='none'>
                    <AccordionButton
                      p='3'
                      borderRadius='md'
                      _hover={{
                        bg: 'gray.50',
                      }}
                      _expanded={{
                        bg: 'gray.100',
                      }}>
                      <HStack flex='1' spacing='3'>
                        {section.icon}
                        {!collapsed && (
                          <Text
                            fontSize='sm'
                            color='#464B50'
                            fontWeight='semibold'
                            textAlign='left'>
                            {section.title}
                          </Text>
                        )}
                      </HStack>
                      {!collapsed && <AccordionIcon />}
                    </AccordionButton>
                    {!collapsed && (
                      <AccordionPanel pb='2' pt='1' px='0'>
                        <VStack spacing='1' align='stretch'>
                          {section.items.map((item) => (
                            <NavItem key={item.label} label={item.label} />
                          ))}
                        </VStack>
                      </AccordionPanel>
                    )}
                  </AccordionItem>
                </Accordion>
              );
            }

            return (
              <SimpleNavItem
                key={idx}
                title={section.title!}
                icon={section.icon}
                collapsed={collapsed}
              />
            );
          })}
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
          gap={'30px'}
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
              icon={<PentagonIcon />}
              variant='ghost'
              padding={'3'}
              borderRadius={'md'}
              borderWidth={'1px'}
              height={'46px'}
              minWidth={'46px'}
            />
            <IconButton
              aria-label='Service 2'
              icon={<SettingsIcon />}
              variant='ghost'
              padding={'3'}
              size='sm'
              borderWidth={'1px'}
              height={'46px'}
              minWidth={'46px'}
            />
            <IconButton
              aria-label='Service 3'
              icon={<BcxIcon />}
              variant='ghost'
              height={'46px'}
              minWidth={'46px'}
              size='sm'
              borderWidth={'1px'}
            />
            <IconButton
              aria-label='Service 4'
              icon={<ERedIcon />}
              variant='ghost'
              size='sm'
              borderWidth={'1px'}
              height={'46px'}
              minWidth={'46px'}
              padding={'3'}
            />
          </HStack>
          <HStack
            height={'46px'}
            backgroundColor={'#F7F7F7'}
            borderWidth={'1px'}
            borderRadius={'lg'}
            padding={'4px'}
            borderColor={'#EEF1F9'}>
            <Badge
              backgroundColor={'#41245F'}
              color={'white'}
              height={'full'}
              display={'flex'}
              alignItems={'center'}
              borderRadius='md'
              px='3'
              py='1'>
              Melding maken
            </Badge>
            <IconButton
              aria-label='VIM'
              icon={
                <Box
                  height={'full'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  minWidth={'46px'}
                  bg='teal.500'
                  color={'white'}
                  borderRadius='md'>
                  VIM
                </Box>
              }
              variant='ghost'
              size='sm'
            />
            <IconButton
              aria-label='LMS'
              icon={
                <Box
                  height={'full'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  width={'46px'}
                  bg='teal.500'
                  color={'white'}
                  borderRadius='md'>
                  LMS
                </Box>
              }
              variant='ghost'
              size='sm'
            />
            <IconButton
              aria-label='BHV'
              icon={
                <Box
                  height={'full'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  width={'46px'}
                  bg='teal.500'
                  color={'white'}
                  borderRadius='md'>
                  BHV
                </Box>
              }
              variant='ghost'
              size='sm'
            />
            <IconButton
              aria-label='DataLek'
              icon={
                <Box
                  height={'full'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  minWidth={'46px'}
                  bg='teal.500'
                  paddingInline={'10px'}
                  color={'white'}
                  borderRadius='md'>
                  DataTek
                </Box>
              }
              variant='ghost'
              size='sm'
            />
          </HStack>
          {/* User Section */}
          <HStack spacing='4'>
            <IconButton
              aria-label='notifications'
              icon={<FiBell />}
              variant='outline'
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
