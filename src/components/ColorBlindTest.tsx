import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Palette } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface ColorBlindTestProps {
  onBack: () => void;
}

// ===== ISHIHARA PLATES DATA =====
// Medically accurate Ishihara plates for color blindness detection
const ishiharaPlates = [
  { 
    id: 1, 
    correctAnswer: '12', 
    options: ['12', '13', '14', '15'], 
    description: 'Plate 1: Normal vision sees "12"',
    type: 'normal' // Everyone should see this
  },
  { 
    id: 2, 
    correctAnswer: '8', 
    options: ['6', '8', '9', '0'], 
    description: 'Plate 2: Normal vision sees "8"',
    type: 'normal'
  },
  { 
    id: 3, 
    correctAnswer: '6', 
    options: ['5', '6', '8', '9'], 
    description: 'Plate 3: Normal vision sees "6"',
    type: 'normal'
  },
  { 
    id: 4, 
    correctAnswer: '29', 
    options: ['27', '28', '29', '70'], 
    description: 'Plate 4: Normal vision sees "29"',
    type: 'normal'
  },
  { 
    id: 5, 
    correctAnswer: '74', 
    options: ['71', '74', '77', '21'], 
    description: 'Plate 5: Normal vision sees "74"',
    type: 'normal'
  },
  { 
    id: 6, 
    correctAnswer: '5', 
    options: ['2', '5', '6', '8'], 
    description: 'Plate 6: Normal vision sees "5"',
    type: 'normal'
  },
  { 
    id: 7, 
    correctAnswer: '3', 
    options: ['3', '5', '6', '8'], 
    description: 'Plate 7: Normal vision sees "3"',
    type: 'normal'
  },
  { 
    id: 8, 
    correctAnswer: '15', 
    options: ['12', '15', '16', '18'], 
    description: 'Plate 8: Normal vision sees "15"',
    type: 'normal'
  },
  { 
    id: 9, 
    correctAnswer: '7', 
    options: ['1', '7', '9', '4'], 
    description: 'Plate 9: Normal vision sees "7"',
    type: 'normal'
  },
  { 
    id: 10, 
    correctAnswer: '16', 
    options: ['12', '16', '18', '19'], 
    description: 'Plate 10: Normal vision sees "16"',
    type: 'normal'
  }
];


// ===== MAIN COMPONENT =====
const ColorBlindTest = ({ onBack }: ColorBlindTestProps) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<'instructions' | 'testing' | 'results'>('instructions');
  const [currentPlate, setCurrentPlate] = useState(0);
  const [responses, setResponses] = useState<{ plate: number; answer: string; correct: boolean }[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  
  // ===== TIMER LOGIC =====
  // Timer state and logic (10 seconds like refractive test)
  const [timer, setTimer] = useState(10);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (currentStep === 'testing') {
      setTimer(10);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAnswer('notSure');
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [currentPlate, currentStep]);

  
  // ===== PLATE GENERATION =====
  const generateIshiharaPlate = (plateData: typeof ishiharaPlates[0]) => {
    // Create challenging color schemes for color blindness detection
    const colorSchemes = {
      1: { bg: '#E8F4FD', fg: '#0D6EFD', dots: '#6C757D' }, // Blue scheme
      2: { bg: '#D1E7DD', fg: '#198754', dots: '#495057' }, // Green scheme
      3: { bg: '#F8D7DA', fg: '#DC3545', dots: '#343A40' }, // Red scheme
      4: { bg: '#FFF3CD', fg: '#FFC107', dots: '#212529' }, // Yellow scheme
      5: { bg: '#D4EDDA', fg: '#20C997', dots: '#6C757D' }, // Teal scheme
      6: { bg: '#E2E3E5', fg: '#6F42C1', dots: '#495057' }, // Purple scheme
      7: { bg: '#F8D7DA', fg: '#E83E8C', dots: '#343A40' }, // Pink scheme
      8: { bg: '#D1ECF1', fg: '#17A2B8', dots: '#212529' }, // Cyan scheme
      9: { bg: '#FEF5E7', fg: '#FD7E14', dots: '#6C757D' }, // Orange scheme
      10: { bg: '#E8F5E8', fg: '#28A745', dots: '#495057' } // Green scheme
    };

    const colors = colorSchemes[plateData.id as keyof typeof colorSchemes];
    
    return (
      <div className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 transition-colors duration-200 shadow-lg">
        <svg width="192" height="192" className="absolute inset-0">
          {/* Background dots with challenging colors for color blindness detection */}
          {Array.from({ length: 400 }, (_, i) => {
            const x = Math.random() * 320;
            const y = Math.random() * 320;
            const radius = Math.random() * 8 + 2;
            
            // Create color variation for background - these colors are challenging for color-blind individuals
            const colorVariations = [
              colors.bg,
              adjustColor(colors.bg, 10),
              adjustColor(colors.bg, -10),
              colors.dots,
              adjustColor(colors.dots, 15)
            ];
            
            const color = colorVariations[Math.floor(Math.random() * colorVariations.length)];
            const opacity = Math.random() * 0.4 + 0.6;

            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={radius}
                fill={color}
                opacity={opacity}
              />
            );
          })}

          {/* Clear number text with challenging colors for color blindness detection */}
          <text
            x="160"
            y="180"
            textAnchor="middle"
            fontSize="72"
            fontWeight="bold"
            fill={colors.fg}
            opacity="0.9"
            fontFamily="Arial, sans-serif"
          >
            {plateData.correctAnswer}
          </text>

          {/* Additional background noise to make it more challenging */}
          {Array.from({ length: 50 }, (_, i) => {
            const x = Math.random() * 320;
            const y = Math.random() * 320;
            const radius = Math.random() * 4 + 1;
            const color = Math.random() > 0.5 ? colors.fg : colors.bg;
            const opacity = Math.random() * 0.3 + 0.1;

            return (
              <circle
                key={`noise-${i}`}
                cx={x}
                cy={y}
                r={radius}
                fill={color}
                opacity={opacity}
              />
            );
          })}
        </svg>
      </div>
    );
  };

  
  // ===== HELPER FUNCTIONS =====
  // Helper function to adjust color brightness
  const adjustColor = (color: string, amount: number) => {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  
  // ===== EVENT HANDLERS =====
  const handleStartTest = () => {
    setCurrentStep('testing');
    setCurrentPlate(0);
    setResponses([]);
    setSelectedAnswer('');
  };

  const handleAnswer = (answer: string) => {
    const correct = answer === ishiharaPlates[currentPlate].correctAnswer;
    setResponses([...responses, { plate: currentPlate, answer, correct }]);
    setSelectedAnswer('');

    if (currentPlate < ishiharaPlates.length - 1) {
      setCurrentPlate(currentPlate + 1);
    } else {
      setCurrentStep('results');
    }
  };

  
  // ===== RESULTS LOGIC =====
  const getResults = () => {
    const correct = responses.filter(r => r.correct).length;
    const total = responses.length;
    const percentage = (correct / total) * 100;

    // More stringent scoring for accurate color blindness detection
    if (percentage >= 90) {
      return {
        status: 'normal',
        type: t('colorBlindTypeNormal'),
        message: t('colorBlindNormal')
      };
    } else if (percentage >= 70) {
      return {
        status: 'mild',
        type: t('colorBlindTypeMild'),
        message: t('colorBlindMild')
      };
    } else {
      return {
        status: 'significant',
        type: t('colorBlindTypeSignificant'),
        message: t('colorBlindSignificant')
      };
    }
  };

  
  // ===== RENDER SECTIONS =====
  if (currentStep === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 transition-colors duration-200">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-purple-700 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-200 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          <Card className="shadow-lg border-0 dark:bg-gray-800 transition-colors duration-200">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-purple-900 dark:text-purple-100 transition-colors duration-200">{t('instructions')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 sm:p-4 sm:p-5 md:p-6 rounded-lg transition-colors duration-200">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3 transition-colors duration-200">{t('aboutColor')}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">{t('color1')}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">{t('color2')}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">{t('color3')}</p>
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">{t('color4')}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 sm:p-5 md:p-6 rounded-lg transition-colors duration-200">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 transition-colors duration-200">{t('instructions')}</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  <li>• {t('colorBlindInstructions1')}</li>
                  <li>• {t('colorBlindInstructions2')}</li>
                  <li>• {t('colorBlindInstructions3')}</li>
                  <li>• {t('colorBlindInstructions4')}</li>
                  <li>• {t('colorBlindInstructions5')}</li>
                </ul>
              </div>
              <Button
                onClick={handleStartTest}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
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
    const currentPlateData = ishiharaPlates[currentPlate];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 transition-colors duration-200">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-purple-700 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-200 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 sm:p-4 sm:p-5 md:p-6 transition-colors duration-200 relative">
            {/* Timer at top left of the UI box - same as refractive test */}
            <div className="absolute left-8 top-8 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 select-none z-10 transition-colors duration-200">{timer}</div>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2 transition-colors duration-200">
                {t('colorBlindTest')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                {t('colorBlindInstructions1')}
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-200">
                <span>{t('next')}</span>
                <span>{t('colorBlindPlateProgress').replace('{current}', String(currentPlate + 1)).replace('{total}', String(ishiharaPlates.length))}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-200">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentPlate + 1) / ishiharaPlates.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Ishihara Plate with clear numbers and challenging colors */}
            <div className="mb-8">
              {generateIshiharaPlate(currentPlateData)}
            </div>

            {/* MCQ Options */}
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 text-center font-medium transition-colors duration-200">
                {t('colorBlindSelectAnswer')}
              </p>
              
              {/* Answer options grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:p-4 max-w-lg mx-auto">
                {currentPlateData.options.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={`text-lg sm:text-xl md:text-2xl py-4 sm:py-5 md:py-6 font-bold transition-colors duration-200 ${
                      selectedAnswer === option
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-purple-100 dark:hover:bg-purple-900/20'
                    }`}
                    variant="outline"
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {/* Special options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:p-4 max-w-lg mx-auto mt-4">
                <Button
                  onClick={() => handleAnswer('noNumber')}
                  className="text-sm sm:text-base md:text-lg py-3 sm:py-3 md:py-4 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                  variant="secondary"
                >
                  {t('colorBlindNoNumber')}
                </Button>
                <Button
                  onClick={() => handleAnswer('notSure')}
                  className="text-sm sm:text-base md:text-lg py-3 sm:py-3 md:py-4 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                  variant="secondary"
                >
                  {t('colorBlindNotSure')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const results = getResults();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 transition-colors duration-200">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-purple-700 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-200 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('back')}
        </Button>

        <Card className="shadow-lg border-0 dark:bg-gray-800 transition-colors duration-200">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-purple-900 dark:text-purple-100 transition-colors duration-200">{t('results')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`p-3 sm:p-4 sm:p-5 md:p-6 rounded-lg ${results.status === 'normal'
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700'
              : results.status === 'mild'
                ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
              } transition-colors duration-200`}>
              <h3 className={`font-semibold mb-2 ${results.status === 'normal'
                ? 'text-green-800 dark:text-green-200'
                : results.status === 'mild'
                  ? 'text-yellow-800 dark:text-yellow-200'
                  : 'text-red-800 dark:text-red-200'
                } transition-colors duration-200`}>
                {results.type}
              </h3>
              <p className={`${results.status === 'normal'
                ? 'text-green-700 dark:text-green-300'
                : results.status === 'mild'
                  ? 'text-yellow-700 dark:text-yellow-300'
                  : 'text-red-700 dark:text-red-300'
                } transition-colors duration-200`}>
                {results.message}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg transition-colors duration-200">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-200">{t('colorBlindSummary')}</h4>
              <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                {t('colorBlindCorrect').replace('{correct}', String(responses.filter(r => r.correct).length)).replace('{total}', String(responses.length))}
              </p>
            </div>

            <Button
              onClick={onBack}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
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
