import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored === 'dark' || (!stored && prefersDark)

    document.documentElement.classList.toggle('dark', isDark)
    setDarkMode(isDark)
  }, [])

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', !darkMode)
    localStorage.setItem('theme', newTheme)
    setDarkMode(!darkMode)
  }

  return (
    <button
      onClick={toggleTheme}
      className="text-[color:var(--text-dark)] hover:text-[color:var(--color-primary)] transition"
      aria-label="Toggle Theme"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

export default ThemeToggle
