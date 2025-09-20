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

    purple: {
      50: '#FAF5FF',
      100: '#E9D5FF',
      200: '#D8B4FE',
      300: '#C084FC',
      400: '#A855F7',
      500: '#41245F',
      600: '#7C2D92',
      700: '#6B21A8',
      800: '#581C87',
      900: '#4C1D95',
    },

    orange: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#F97316',
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
    },

    teal: {
      50: '#F0FDFA',
      100: '#CCFBF1',
      200: '#99F6E4',
      300: '#5EEAD4',
      400: '#2DD4BF',
      500: '#14B8A6',
      600: '#0D9488',
      700: '#0F766E',
      800: '#115E59',
      900: '#134E4A',
    },

    red: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
      900: '#7F1D1D',
    },

    yellow: {
      50: '#FEFCE8',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },

    blue: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    },

    brand: {
      50: '#E9F5F7',
      100: '#41245F',
      200: '#8cffe9',
      300: '#94A3B8',
      400: '#64748B',
      500: '#475569',
      600: '#009b8e',
      700: '#00776d',
      800: '#015e58',
      900: '#004945',
      primary: '#41245F',
      secondary: '#009b8e',
      accent: '#75C5C1',
    },

    success: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
    },

    warning: {
      50: '#FEFCE8',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },

    error: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
      900: '#7F1D1D',
    },

    sidebar: {
      bg: '#ffffff',
      border: '#E2E8F0',
      hover: '#F7FAFC',
      active: '#EDF2F7',
    },

    priority: {
      low: '#64748B',
      medium: '#14B8A6',
      important: '#F59E0B',
      urgent: '#EF4444',
    },
  },

  components: {
    Button: {
      variants: {
        brand: {
          bg: 'brand.primary',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        priority: (props: { priority: string }) => ({
          bg: `priority.${props.priority}`,
          color: 'white',
          _hover: {
            opacity: 0.8,
          },
        }),
      },
    },
    Badge: {
      variants: {
        priority: (props: { priority: string }) => ({
          bg: `priority.${props.priority}`,
          color: 'white',
        }),
      },
    },
  },
});
