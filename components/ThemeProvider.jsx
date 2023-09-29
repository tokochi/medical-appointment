
"use client";
import React from 'react'
import { ThemeProvider as Provider } from 'next-themes'

function ThemeProvider({ children }) {
    
  return <Provider>{children}</Provider>
}

export default ThemeProvider