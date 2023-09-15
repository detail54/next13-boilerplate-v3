import { style } from '@vanilla-extract/css'

const button = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px 15px',
  fontSize: '12px',
  border: '1px solid #000',
  borderRadius: '5px',
  backgroundColor: '#a0aaff',
  cursor: 'pointer',
})

export const buttonStyles = {
  button,
}
