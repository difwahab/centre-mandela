// client/src/components/LanguageSwitcher.tsx
import { useLanguage } from '../contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' }
  ]

  return (
    <div className="flex gap-2 items-center">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={`px-3 py-1 rounded text-sm transition-all
            ${language === code
              ? 'bg-primary text-white font-semibold'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
          `}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
