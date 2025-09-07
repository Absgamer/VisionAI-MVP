import React, { useState } from 'react';
import { Eye, Palette, Book, Bell } from 'lucide-react';
import Header from '@/components/Header';
import TestCard from '@/components/TestCard';
import RefractiveTest from '@/components/RefractiveTest';
import ColorBlindTest from '@/components/ColorBlindTest';
import Education from '@/components/Education';
import { LanguageProvider, useLanguage } from '@/components/LanguageProvider';
import { useTheme } from '@/components/ThemeProvider';
import { FlickeringGrid } from '@/components/ui/flickering-grid';

type CurrentView = 'home' | 'refractive' | 'color' | 'education' | 'reminder';

const HomeContent = () => {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<CurrentView>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Render header with logo click handler
  const header = (
    <HeaderWithLanguage onLogoClick={() => setCurrentView('home')} />
  );

  if (currentView === 'refractive') {
    return <><HeaderWithLanguage onLogoClick={() => setCurrentView('home')} /><RefractiveTest onBack={() => setCurrentView('home')} /></>;
  }
  if (currentView === 'color') {
    return <><HeaderWithLanguage onLogoClick={() => setCurrentView('home')} /><ColorBlindTest onBack={() => setCurrentView('home')} /></>;
  }
  if (currentView === 'education') {
    return <><HeaderWithLanguage onLogoClick={() => setCurrentView('home')} /><Education onBack={() => setCurrentView('home')} /></>;
  }
  if (currentView === 'reminder') {
    window.location.href = '/reminder';
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      {header}
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#0a1833] dark:bg-[#0a0f1a]">
        {/* FlickeringGrid background effect */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <FlickeringGrid color="#3b82f6" maxOpacity={0.32} squareSize={10} gridGap={8} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 z-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16 z-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-full p-6 shadow-lg">
                  <Eye className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-full blur-sm opacity-40 animate-pulse"></div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('welcome')}
            </h1>
            <p className="text-base sm:text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>

            <div className="inline-flex items-center space-x-2 bg-blue-900/60 text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>{t('heroBadge')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Test Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">{t('chooseTest')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-200">
            {t('chooseTestDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <TestCard
            title={t('refractiveTest')}
            description={t('testDescription')}
            icon={Eye}
            onClick={() => setCurrentView('refractive')}
            buttonText={t('startTest')}
            gradient="from-blue-500 to-blue-600"
          />

          <TestCard
            title={t('colorBlindTest')}
            description={t('colorDescription')}
            icon={Palette}
            onClick={() => setCurrentView('color')}
            buttonText={t('startTest')}
            gradient="from-purple-500 to-pink-500"
          />

          <TestCard
            title={t('education')}
            description={t('educationDescription')}
            icon={Book}
            onClick={() => setCurrentView('education')}
            buttonText={t('learnMore')}
            gradient="from-green-500 to-emerald-500"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 py-12 sm:py-14 md:py-16 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full p-3 mx-auto mb-4 transition-colors duration-200">
                <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">{t('feature1Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">{t('feature1Desc')}</p>
            </div>

            <div className="p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full p-3 mx-auto mb-4 transition-colors duration-200">
                <Book className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">{t('feature2Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">{t('feature2Desc')}</p>
            </div>

            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full p-3 mx-auto mb-4 transition-colors duration-200">
                <Book className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">{t('feature3Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">{t('feature3Desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12 sm:py-14 md:py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('ctaDesc')}
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button
              onClick={() => setCurrentView('refractive')}
              className="w-full sm:w-auto bg-white text-blue-600 px-6 py-2 sm:px-7 sm:py-2.5 md:px-8 md:py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              {t('ctaStart')}
            </button>
            <button
              onClick={() => setCurrentView('education')}
              className="w-full sm:w-auto border-2 border-white text-white px-6 py-2 sm:px-7 sm:py-2.5 md:px-8 md:py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              {t('ctaLearn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <HomeContent />
      </div>
    </LanguageProvider>
  );
};

const HeaderWithLanguage = ({ onLogoClick }: { onLogoClick?: () => void }) => {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  return (
    <Header
      currentLanguage={language}
      onLanguageChange={setLanguage}
      onMenuClick={() => { }}
      onLogoClick={onLogoClick}
      currentTheme={theme}
      onThemeToggle={toggleTheme}
    />
  );
};

export default Index;
