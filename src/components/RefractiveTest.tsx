
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Eye } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface RefractiveTestProps {
  onBack: () => void;
}

const RefractiveTest = ({ onBack }: RefractiveTestProps) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<'instructions' | 'testing' | 'results'>('instructions');
  const [currentLetter, setCurrentLetter] = useState('E');
  const [fontSize, setFontSize] = useState(120);
  const [responses, setResponses] = useState<{ letter: string; response: string; correct: boolean }[]>([]);
  const [testIndex, setTestIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  
  const letters = ['E', 'F', 'P', 'T', 'O', 'Z', 'L', 'P', 'E', 'D'];
  
  const handleStartTest = () => {
    setCurrentStep('testing');
    setCurrentLetter(letters[0]);
  };
  
  const handleResponse = () => {
    if (!userInput.trim()) return;
    
    const correct = userInput.toUpperCase() === currentLetter;
    const newResponse = { letter: currentLetter, response: userInput, correct };
    const newResponses = [...responses, newResponse];
    setResponses(newResponses);
    
    // Adaptive sizing based on response
    if (correct && fontSize > 24) {
      setFontSize(prev => Math.max(24, prev * 0.8));
    } else if (!correct && fontSize < 120) {
      setFontSize(prev => Math.min(120, prev * 1.2));
    }
    
    setUserInput('');
    
    if (testIndex < letters.length - 1) {
      setTestIndex(testIndex + 1);
      setCurrentLetter(letters[testIndex + 1]);
    } else {
      setCurrentStep('results');
    }
  };
  
  const getResults = () => {
    const correctCount = responses.filter(r => r.correct).length;
    const accuracy = (correctCount / responses.length) * 100;
    
    if (accuracy >= 80) {
      return { status: 'normal', message: t('normal') };
    } else {
      return { status: 'consult', message: t('visitDoctor') };
    }
  };
  
  if (currentStep === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-blue-700 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 p-4 mb-4">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-blue-900">{t('refractiveTest')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">{t('instructions')}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Cover one eye and look at the screen from 2-3 feet away</li>
                  <li>• You'll see letters that may get smaller as you progress</li>
                  <li>• Type the letter you see clearly</li>
                  <li>• If you can't see clearly, type "{t('cantSee')}"</li>
                </ul>
              </div>
              
              <Button 
                onClick={handleStartTest}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
              >
                {t('begin')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  if (currentStep === 'testing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">
                {testIndex + 1} of {letters.length}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((testIndex + 1) / letters.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div 
              className="font-mono font-bold text-gray-900 mb-8 select-none"
              style={{ fontSize: `${fontSize}px` }}
            >
              {currentLetter}
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">{t('readLetter')}</p>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter letter"
                maxLength={1}
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleResponse()}
              />
              <Button 
                onClick={handleResponse}
                disabled={!userInput.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg"
              >
                {testIndex < letters.length - 1 ? t('next') : t('submit')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const results = getResults();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-blue-700 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-blue-900">{t('results')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`p-6 rounded-lg ${results.status === 'normal' ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
              <h3 className={`font-semibold mb-2 ${results.status === 'normal' ? 'text-green-800' : 'text-orange-800'}`}>
                Test Complete
              </h3>
              <p className={`${results.status === 'normal' ? 'text-green-700' : 'text-orange-700'}`}>
                {results.message}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Test Summary:</h4>
              <p className="text-gray-700">
                Correct responses: {responses.filter(r => r.correct).length} out of {responses.length}
              </p>
            </div>
            
            <Button 
              onClick={onBack}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
            >
              Return to Tests
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RefractiveTest;
