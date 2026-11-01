import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type NavbarStyle = 'option1' | 'option2'

const STORAGE_KEY = 'barber_navbar_style'

interface NavbarPreferenceContextValue {
  navbarStyle: NavbarStyle
  setNavbarStyle: (style: NavbarStyle) => void
}

const NavbarPreferenceContext = createContext<NavbarPreferenceContextValue | null>(null)

export function NavbarPreferenceProvider({ children }: { children: ReactNode }) {
  const [navbarStyle, setNavbarStyleState] = useState<NavbarStyle>(() => {
    return (localStorage.getItem(STORAGE_KEY) as NavbarStyle) || 'option1'
  })

  const setNavbarStyle = useCallback((style: NavbarStyle) => {
    localStorage.setItem(STORAGE_KEY, style)
    setNavbarStyleState(style)
  }, [])

  return (
    <NavbarPreferenceContext.Provider value={{ navbarStyle, setNavbarStyle }}>
      {children}
    </NavbarPreferenceContext.Provider>
  )
}

export function useNavbarPreference(): NavbarPreferenceContextValue {
  const ctx = useContext(NavbarPreferenceContext)
  if (!ctx) {
    throw new Error('useNavbarPreference must be used inside <NavbarPreferenceProvider>')
  }
  return ctx
}
