import { style, createVar } from '@vanilla-extract/css';

export const imageUrl = createVar();

export const container = style({
  padding: '1.9rem 1.9rem 6.4rem 1.5rem',
  height: '464px',

  position: 'fixed',
  top: 0,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '2.1rem',

  backgroundImage: imageUrl,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

export const header = style({
  paddingTop: '2.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

export const profileContainer = style({
  padding: '0 2.9rem 0 3.3rem',

  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const icon = style({
  cursor: 'pointer',
});

export const profile = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.6rem',
});

export const avatar = style({
  borderRadius: '50%',
  border: '2px solid #FFF',
});

export const info = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const user = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
});

export const nickName = style({
  fontSize: '2rem',
  fontWeight: ' 700',
  color: '#202020',
  letterSpacing: '-0.6px',
});

export const follow = style({
  display: 'flex',
  gap: '1.6rem',
  lineHeight: '2.5rem',
});

export const text = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',

  fontSize: '1rem',
  fontWeight: '500',
  letterSpacing: '-0.3px',
});

export const count = style({
  fontSize: '1.3rem',
  fontWeight: '600',
  letterSpacing: '-0.39px',
});

export const description = style({
  paddingBottom: '1.9rem',

  width: '100%',
  maxHeight: '80px',

  fontSize: '1.2rem',
  fontWeight: '500',
  color: '#333',
  lineHeight: '1.6rem',
  letterSpacing: '-0.36px',
});
