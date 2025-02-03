import { style } from '@vanilla-extract/css';
import { body3 } from '@/styles/__font.css';
import { vars } from '@/styles/theme.css';

export const baseLabel = style([
  body3,
  {
    padding: '2px 12px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,

    borderRadius: '16px',
    textTransform: 'uppercase',
  },
]);

export const skyblueLabel = style([
  baseLabel,
  {
    backgroundColor: vars.color.lightblue2,
    color: vars.color.blue,
  },
]);

export const blueLabel = style([
  baseLabel,
  {
    backgroundColor: vars.color.blue,
    color: vars.color.white,
  },
]);

export const whiteLabel = style([baseLabel, { backgroundColor: vars.color.white, color: vars.color.blue }]);

export const tag = style([
  baseLabel,
  {
    padding: '0',
    '::before': {
      content: '#',
      color: vars.color.black3,
    },
  },
]);

export const labelContent = style({
  height: '24px',

  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
});
