
import React from 'react';
import { Eye, Menu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onMenuClick: () => void;
}

const Header = ({ currentLanguage, onLanguageChange, onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-full">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-blue-900">VisionAI</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-blue-600" />
              <select 
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="text-sm border-none bg-transparent text-blue-700 font-medium focus:outline-none"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden"
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
