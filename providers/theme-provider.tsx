'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Color mode context
type ColorMode = 'light' | 'dark' | 'system'

type ColorModeContextType = {
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined)

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>('system')

  // Initialize from localStorage if available
  useEffect(() => {
    const savedMode = localStorage.getItem('colorMode') as ColorMode | null
    if (savedMode) {
      setColorMode(savedMode)
    }
  }, [])

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('colorMode', colorMode)
  }, [colorMode])

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}

export const useColorMode = () => {
  const context = useContext(ColorModeContext)
  if (context === undefined) {
    throw new Error('useColorMode must be used within a ColorModeProvider')
  }
  return context
}