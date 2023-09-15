'use client'

import React from 'react'
import { buttonStyles as style } from './button.css'

const Button = ({ text, onClick }: IButtonProps) => {
  return (
    <button className={style.button} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
