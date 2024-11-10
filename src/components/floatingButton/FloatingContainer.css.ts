import { style, keyframes, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const wrapper = style({
  width: '100%',
  maxWidth: 430,
  margin: 'auto',

  position: 'fixed',
  bottom: '75px',
  zIndex: 3,
});

export const container = style({
  position: 'absolute',
  bottom: 0,
  right: '16px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
});

export const basicButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  background: vars.color.white,
  borderRadius: '50%',
  boxShadow: '0px 0px 4px 0px rgba(142, 142, 142, 0.04), 0px 8px 16px 0px rgba(116, 116, 116, 0.08)',
  cursor: 'pointer',

  transition: 'all 0.1s linear',
});

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const variant = styleVariants({
  plusButton: [
    basicButton,
    {
      width: 56,
      height: 56,
    },
  ],
  arrowUpButton: [
    basicButton,
    {
      width: 44,
      height: 44,
      animation: `${fadeIn} 500ms ease`,
    },
  ],
});

const dropdown = keyframes({
  '0%': {
    transform: 'translateY(20%)',
  },
  '100%': {
    transform: 'translateY(0)',
  },
});

export const menuButtons = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  animation: `${dropdown} 300ms ease`,
});
