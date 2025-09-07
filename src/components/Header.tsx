import React from 'react';
import { Eye, Menu, Globe, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// ===== TYPE DEFINITIONS =====
interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onMenuClick: () => void;
  onLogoClick?: () => void;
  currentTheme: string;
  onThemeToggle: () => void;
}


// ===== HEADER COMPONENT =====
const Header = ({ currentLanguage, onLanguageChange, onMenuClick, onLogoClick, currentTheme, onThemeToggle }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-blue-100 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-14 md:h-16">
          <div className="flex items-center space-x-3">
            {onLogoClick ? (
              <button type="button" onClick={onLogoClick} className="bg-blue-600 p-1.5 sm:p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </button>
            ) : (
              <Link to="/" className="bg-blue-600 p-1.5 sm:p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </Link>
            )}
            <h1 className="text-lg sm:text-xl font-bold text-blue-900 dark:text-blue-100 transition-colors duration-200">VisionAI</h1>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <select
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="text-xs sm:text-sm border-none bg-transparent text-blue-700 dark:text-blue-300 font-medium focus:outline-none transition-colors duration-200"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onThemeToggle}
              className="p-1.5 sm:p-2 h-9 w-9 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200"
              title={currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {currentTheme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
