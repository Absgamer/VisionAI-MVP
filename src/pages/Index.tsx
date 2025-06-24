
import React, { useState } from 'react';
import { Eye, Palette, Book } from 'lucide-react';
import Header from '@/components/Header';
import TestCard from '@/components/TestCard';
import RefractiveTest from '@/components/RefractiveTest';
import ColorBlindTest from '@/components/ColorBlindTest';
import Education from '@/components/Education';
import { LanguageProvider, useLanguage } from '@/components/LanguageProvider';

type CurrentView = 'home' | 'refractive' | 'color' | 'education';

const HomeContent = () => {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<CurrentView>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (currentView === 'refractive') {
    return <RefractiveTest onBack={() => setCurrentView('home')} />;
  }
  
  if (currentView === 'color') {
    return <ColorBlindTest onBack={() => setCurrentView('home')} />;
  }
  
  if (currentView === 'education') {
    return <Education onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-6 shadow-lg">
                  <Eye className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-sm opacity-30 animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('welcome')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
            
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Works offline • Free to use • Multilingual</span>
            </div>
          </div>
        </div>
      </div>

      {/* Test Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Eye Test</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select from our AI-powered screening tests designed for accuracy and accessibility
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
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
            buttonText="Learn More"
            gradient="from-green-500 to-emerald-500"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full p-3 mx-auto mb-4">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Accuracy</h3>
              <p className="text-gray-600">Advanced algorithms provide reliable screening results</p>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full p-3 mx-auto mb-4">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Works Offline</h3>
              <p className="text-gray-600">Take tests without internet connection</p>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full p-3 mx-auto mb-4">
                <Book className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multilingual Support</h3>
              <p className="text-gray-600">Available in English, Hindi, and Tamil</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Early Detection, Better Vision
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands who have already screened their vision with VisionAI
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button 
              onClick={() => setCurrentView('refractive')}
              className="w-full sm:w-auto bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              Start Vision Test
            </button>
            <button 
              onClick={() => setCurrentView('education')}
              className="w-full sm:w-auto border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Learn More
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
        <HeaderWithLanguage />
        <HomeContent />
      </div>
    </LanguageProvider>
  );
};

const HeaderWithLanguage = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <Header 
      currentLanguage={language}
      onLanguageChange={setLanguage}
      onMenuClick={() => {}}
    />
  );
};

export default Index;
