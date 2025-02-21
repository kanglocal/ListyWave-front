import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  marginTop: '40rem',

  position: 'absolute',
  top: 0,

  backgroundColor: '#FFF',
  borderTopLeftRadius: '2.5rem',
  borderTopRightRadius: '2.5rem',
});

export const options = style({
  height: '6.4rem',
  display: 'flex',
  borderBottom: '1px solid rgba(0, 0, 0, 0.10)',
});

export const link = style({
  flexGrow: '1',
});

export const button = style({
  width: '100%',
  height: '100%',

  backgroundColor: 'white',
  borderTop: '1px solid rgba(0, 0, 0, 0.25)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.10)',

  fontSize: '1.6rem',
  fontWeight: '500',
});

export const leftButton = style([
  button,
  {
    paddingLeft: '5.75rem',
    borderTopLeftRadius: '2.5rem',
  },
]);

export const rightButton = style([
  button,
  {
    paddingRight: '5.75rem',
    borderTopRightRadius: '2.5rem',
  },
]);

export const variant = style({
  borderBottom: '1px solid #0047FF',
});

export const cards = style({
  padding: '2.1rem',
});
