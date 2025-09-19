/* theme.ts */
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: 'var(--font-plus-jakarta-sans)',
    body: 'var(--font-plus-jakarta-sans)',
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: 'var(--font-plus-jakarta-sans)',
      },
    },
  },
  colors: {
    grey: {
      50: '#E9F5F7',
      100: '#75C5C1',
      200: '#8cffe9',
      300: '#94A3B8',
      400: '#64748B',
      500: '#475569',
      600: '#009b8e',
      700: '#00776d',
      800: '#015e58',
      900: '#004945',
    },
    sidebar: {
      bg: '#ffffff',
      border: '#E2E8F0',
    },
  },
});
