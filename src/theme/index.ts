import { type MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: 'Inter, Helvetica, Arial, sans-serif',
  defaultRadius: 4,
  colors: {
    orange: [
      '#FFF2E5',
      '#FFDBB8',
      '#FFC48A',
      '#FFAD5C',
      '#FF962E',
      '#FF8000',
      '#CC6600',
      '#994C00',
      '#663300',
      '#331A00',
    ],
    discord: ['#7289DA'],
  },
  primaryColor: 'orange',
  primaryShade: 5,
  components: {
    InputWrapper: {
      classNames: { label: 'mb-1 ml-0.5' },
    },
    Input: {
      defaultProps: {
        size: 'lg',
      },
      classNames: {
        input: 'rounded-lg font-medium text-[15px]',
        label: 'text-sm',
        error: 'text-xs',
      },
    },
    TextInput: {
      defaultProps: {
        size: 'lg',
      },
      classNames: {
        input: 'rounded-lg font-medium text-[15px]',
        label: 'text-sm',
        error: 'text-xs',
      },
    },
    PasswordInput: {
      defaultProps: {
        size: 'lg',
      },
      classNames: {
        innerInput: 'rounded-lg font-medium text-[15px]',
        label: 'text-sm',
        error: 'text-xs',
      },
    },
    Button: {
      defaultProps: {
        size: 'md',
      },
      classNames: {
        inner: 'text-[14px]',
      },
    },
  },
};

export default theme;
