import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext";
import MobileMenu from "@/components/MobileMenu";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#accueil", label: t("nav.home") },
    { href: "#a-propos", label: t("nav.about") },
    { href: "#services", label: t("nav.services") },
    { href: "#rendez-vous", label: t("nav.appointment") },
    { href: "#actualites", label: t("nav.news") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b bg-background text-foreground ${
        isScrolled ? "py-2 shadow-sm" : "py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#accueil" className="flex items-center gap-2" aria-label={t("header.centerName")}>
          <Heart className="h-6 w-6 text-primary md:h-7 md:w-7" />
          <div className="flex flex-col leading-tight">
            <h1 className="text-lg font-bold text-primary sm:text-xl">
              {t("header.centerName")}
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {t("header.cabinet")}
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/espace-medecins/login">
            <Button
              variant="secondary"
              className="transition-transform hover:-translate-y-0.5 shadow hover:shadow-md"
            >
              {t("nav.doctorPortal")} <span className="ml-1">🔒</span>
            </Button>
          </Link>

          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <button
              onClick={() => setLanguage("fr")}
              className={language === "fr" ? "text-primary" : "hover:text-primary"}
              aria-label="Langue française"
            >
              FR
            </button>
            <span>|</span>
            <button
              onClick={() => setLanguage("ar")}
              className={language === "ar" ? "text-primary" : "hover:text-primary"}
              aria-label="Langue arabe"
            >
              AR
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-muted-foreground hover:text-primary md:hidden"
          aria-label="Menu mobile"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
