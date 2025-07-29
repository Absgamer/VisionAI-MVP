
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Palette } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface ColorBlindTestProps {
  onBack: () => void;
}

const ColorBlindTest = ({ onBack }: ColorBlindTestProps) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<'instructions' | 'testing' | 'results'>('instructions');
  const [currentPlate, setCurrentPlate] = useState(0);
  const [responses, setResponses] = useState<{ plate: number; answer: string; expected: string }[]>([]);
  const [userInput, setUserInput] = useState('');

  // Simplified Ishihara-like test plates with expected answers
  const plates = [
    { id: 1, answer: '12', description: t('colorBlindPlate1Desc') },
    { id: 2, answer: '8', description: t('colorBlindPlate2Desc') },
    { id: 3, answer: '6', description: t('colorBlindPlate3Desc') },
    { id: 4, answer: '29', description: t('colorBlindPlate4Desc') },
    { id: 5, answer: '74', description: t('colorBlindPlate5Desc') }
  ];

  const generatePlate = (plateData: typeof plates[0]) => {
    // Simplified plate generation - in real implementation, this would create actual Ishihara-like patterns
    const colors = {
      1: ['#FF6B6B', '#8B0000', '#FF4444'],
      2: ['#4ECDC4', '#2E8B57', '#20B2AA'],
      3: ['#FFE66D', '#FF8C00', '#FFA500'],
      4: ['#FF6B6B', '#4ECDC4', '#8B0000'],
      5: ['#6B73FF', '#FFE66D', '#4169E1']
    };

    return (
      <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden bg-gray-100">
        <svg width="256" height="256" className="absolute inset-0">
          {/* Generate random dots pattern - simplified for demo */}
          {Array.from({ length: 200 }, (_, i) => {
            const x = Math.random() * 256;
            const y = Math.random() * 256;
            const radius = Math.random() * 8 + 4;
            const colorSet = colors[plateData.id as keyof typeof colors] || colors[1];
            const color = colorSet[Math.floor(Math.random() * colorSet.length)];

            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={radius}
                fill={color}
              />
            );
          })}

          {/* Number overlay - simplified representation */}
          <text
            x="128"
            y="140"
            textAnchor="middle"
            fontSize="48"
            fontWeight="bold"
            fill={plateData.id <= 2 ? '#8B0000' : '#FF6B6B'}
            opacity="0.7"
          >
            {plateData.answer}
          </text>
        </svg>
      </div>
    );
  };

  const handleStartTest = () => {
    setCurrentStep('testing');
  };

  const handleResponse = () => {
    if (!userInput.trim()) return;

    const newResponse = {
      plate: currentPlate,
      answer: userInput,
      expected: plates[currentPlate].answer
    };

    setResponses([...responses, newResponse]);
    setUserInput('');

    if (currentPlate < plates.length - 1) {
      setCurrentPlate(currentPlate + 1);
    } else {
      setCurrentStep('results');
    }
  };

  const getResults = () => {
    const correctCount = responses.filter(r => r.answer === r.expected).length;
    const accuracy = (correctCount / responses.length) * 100;

    if (accuracy >= 80) {
      return {
        status: 'normal',
        message: t('colorBlindNormal'),
        type: t('colorBlindTypeNormal')
      };
    } else if (accuracy >= 60) {
      return {
        status: 'mild',
        message: t('colorBlindMild'),
        type: t('colorBlindTypeMild')
      };
    } else {
      return {
        status: 'significant',
        message: t('colorBlindSignificant'),
        type: t('colorBlindTypeSignificant')
      };
    }
  };

  if (currentStep === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-purple-700 hover:text-purple-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>

          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-4 mb-4">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-purple-900">{t('colorBlindTest')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-3">{t('instructions')}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• {t('colorBlindInstructions1')}</li>
                  <li>• {t('colorBlindInstructions2')}</li>
                  <li>• {t('colorBlindInstructions3')}</li>
                  <li>• {t('colorBlindInstructions4')}</li>
                </ul>
              </div>

              <Button
                onClick={handleStartTest}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg"
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">
                {t('colorBlindPlateProgress').replace('{current}', String(currentPlate + 1)).replace('{total}', String(plates.length))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentPlate + 1) / plates.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              {generatePlate(plates[currentPlate])}
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">{t('selectNumber')}</p>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={t('colorBlindPlaceholder')}
                maxLength={2}
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleResponse()}
              />
              <Button
                onClick={handleResponse}
                disabled={!userInput.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg"
              >
                {currentPlate < plates.length - 1 ? t('next') : t('submit')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const results = getResults();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-purple-700 hover:text-purple-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('back')}
        </Button>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-purple-900">{t('results')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`p-6 rounded-lg ${results.status === 'normal'
              ? 'bg-green-50 border border-green-200'
              : results.status === 'mild'
                ? 'bg-yellow-50 border border-yellow-200'
                : 'bg-red-50 border border-red-200'
              }`}>
              <h3 className={`font-semibold mb-2 ${results.status === 'normal'
                ? 'text-green-800'
                : results.status === 'mild'
                  ? 'text-yellow-800'
                  : 'text-red-800'
                }`}>
                {results.type}
              </h3>
              <p className={`${results.status === 'normal'
                ? 'text-green-700'
                : results.status === 'mild'
                  ? 'text-yellow-700'
                  : 'text-red-700'
                }`}>
                {results.message}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">{t('colorBlindSummary')}</h4>
              <p className="text-gray-700">
                {t('colorBlindCorrect').replace('{correct}', String(responses.filter(r => r.answer === r.expected).length)).replace('{total}', String(responses.length))}
              </p>
            </div>

            <Button
              onClick={onBack}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg"
            >
              {t('returnToTests')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorBlindTest;
