import {
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { RowHorizontal, RowVertical, SearchNormal1 } from 'iconsax-reactjs';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: 'kanban' | 'list';
  setViewMode: (mode: 'kanban' | 'list') => void;
}

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
}: SearchBarProps) => {
  return (
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

      <HStack spacing='2' bgColor={'white'} padding={'6px'} borderRadius={8}>
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
    </Flex>
  );
};
