'use client'

import React from 'react'

const Button = ({ text, onClick }: IButtonProps) => {
  return <button onClick={onClick}>{text}</button>
}

export default Button
