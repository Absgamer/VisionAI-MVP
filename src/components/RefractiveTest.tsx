import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Eye } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface RefractiveTestProps {
  onBack: () => void;
}


// ===== MAIN COMPONENT =====
const RefractiveTest = ({ onBack }: RefractiveTestProps) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<'instructions' | 'left-instruct' | 'left-test' | 'right-instruct' | 'right-test' | 'results'>('instructions');
  const [currentEye, setCurrentEye] = useState<'left' | 'right'>('left');
  const [testIndex, setTestIndex] = useState(0);
  const [responses, setResponses] = useState<{ eye: 'left' | 'right'; letter: string; response: string; correct: boolean }[]>([]);

  
  // ===== TIMER LOGIC =====
  // Timer state and logic (must be at top level)
  const [timer, setTimer] = useState(10);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    // Only run timer in test steps
    if (currentStep === 'left-test' || currentStep === 'right-test') {
      setTimer(10);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAnswer('dontKnow');
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    } else {
      // Clear timer if not in test step
      if (timerRef.current) clearInterval(timerRef.current);
    }
    // eslint-disable-next-line
  }, [testIndex, currentStep]);

  
  // ===== LETTER GENERATION =====
  // 10 random letters for each eye (no repeats per eye)
  const allLetters = ['E', 'F', 'P', 'T', 'O', 'Z', 'L', 'D', 'C', 'H', 'K', 'N', 'R', 'S', 'V', 'Y'];
  const [leftLetters] = useState(() => shuffleArray(allLetters).slice(0, 10));
  const [rightLetters] = useState(() => shuffleArray(allLetters).slice(0, 10));
  const currentLetters = currentEye === 'left' ? leftLetters : rightLetters;
  const currentLetter = currentLetters[testIndex];

  
  // ===== HELPER FUNCTIONS =====
  function shuffleArray(arr: string[]) {
    return arr.slice().sort(() => Math.random() - 0.5);
  }

  // Generate 3 random distractors (not the correct letter)
  function getOptions(correct: string) {
    const pool = allLetters.filter(l => l !== correct);
    const distractors = shuffleArray(pool).slice(0, 3);
    const options = shuffleArray([correct, ...distractors]);
    return options;
  }

  const [options, setOptions] = useState(() => getOptions(currentLetter));
  React.useEffect(() => {
    setOptions(getOptions(currentLetter));
  }, [currentLetter, testIndex]);

  // Letter size: start at 14px, decrease by 1px each step, min 4px
  const minFontSize = 4;
  const maxFontSize = 14;
  const fontSize = Math.max(minFontSize, maxFontSize - testIndex * 1);

  
  // ===== EVENT HANDLERS =====
  const handleStartTest = () => {
    setCurrentStep('left-instruct');
    setCurrentEye('left');
    setTestIndex(0);
    setResponses([]);
  };

  const handleStartEye = (eye: 'left' | 'right') => {
    setCurrentEye(eye);
    setTestIndex(0);
    setCurrentStep(eye === 'left' ? 'left-test' : 'right-test');
  };

  const handleAnswer = (answer: string) => {
    const correct = answer === currentLetter;
    setResponses(prev => [...prev, { eye: currentEye, letter: currentLetter, response: answer, correct }]);
    if (testIndex < 9) {
      setTestIndex(testIndex + 1);
    } else if (currentEye === 'left') {
      setCurrentStep('right-instruct');
    } else {
      setCurrentStep('results');
    }
  };

  
  // ===== RESULTS LOGIC =====
  const getResults = () => {
    const left = responses.filter(r => r.eye === 'left');
    const right = responses.filter(r => r.eye === 'right');
    return {
      left: left.filter(r => r.correct).length,
      leftTotal: left.length,
      right: right.filter(r => r.correct).length,
      rightTotal: right.length
    };
  };

  
  // ===== RENDER SECTIONS =====
  if (currentStep === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 transition-colors duration-200">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          <Card className="shadow-lg border-0 dark:bg-gray-800 transition-colors duration-200">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-blue-900 dark:text-blue-100 transition-colors duration-200">{t('instructions')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 sm:p-5 md:p-6 rounded-lg transition-colors duration-200">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 transition-colors duration-200">{t('aboutRefractive')}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">{t('refractive1')}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">{t('refractive2')}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">{t('refractive3')}</p>
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">{t('refractive4')}</p>
              </div>
              <Button
                onClick={handleStartTest}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
              >
                {t('begin')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 'left-instruct' || currentStep === 'right-instruct') {
    const eye = currentStep === 'left-instruct' ? 'left' : 'right';
    const instruction = eye === 'left' ? t('leftEyeInstruction') : t('rightEyeInstruction');
    const eyeLabel = eye === 'left' ? t('leftEye') : t('rightEye');

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 transition-colors duration-200">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          <Card className="shadow-lg border-0 dark:bg-gray-800 transition-colors duration-200">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-blue-900 dark:text-blue-100 transition-colors duration-200">{eyeLabel}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 sm:p-5 md:p-6 rounded-lg transition-colors duration-200">
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg transition-colors duration-200">{instruction}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">{t('lettersGetSmaller')}</p>
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">{t('clickOrDontKnow')}</p>
              </div>
              <Button
                onClick={() => handleStartEye(eye)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
              >
                {t('start')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 'left-test' || currentStep === 'right-test') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 transition-colors duration-200">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 sm:p-4 sm:p-5 md:p-6 transition-colors duration-200 relative">
            {/* Timer at top left of the UI box - same as color blindness test */}
            <div className="absolute left-8 top-8 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 select-none z-10 transition-colors duration-200">{timer}</div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2 transition-colors duration-200">
                {currentEye === 'left' ? t('leftEye') : t('rightEye')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                {t('readLetter')}
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-200">
                <span>{t('next')}</span>
                <span>{testIndex + 1} / 10</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-200">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((testIndex + 1) / 10) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              {/* Box with crosshair lines and letter */}
              <div className="relative flex items-center justify-center sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-64 lg:h-64" style={{ width: "200px", height: "200px" }}>
                {/* Box border */}
                <div className="absolute border border-gray-400 dark:border-gray-500 transition-colors duration-200 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56" style={{ width: "160px", height: "160px", left: "20px", top: "20px" }}></div>
                {/* Vertical line */}
                <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-600 transition-colors duration-200" style={{ transform: 'translateX(-50%)' }}></div>
                {/* Horizontal line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-600 transition-colors duration-200" style={{ transform: 'translateY(-50%)' }}></div>
                {/* Letter */}
                <div className="absolute left-1/2 top-1/2 font-mono font-bold text-gray-900 dark:text-gray-100 select-none transition-colors duration-200" style={{ fontSize: `${fontSize}px`, lineHeight: 1, transform: 'translate(-50%, -50%)' }}>{currentLetter}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-lg mx-auto mb-4 mt-8">
              {options.map((opt, i) => (
                <Button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="text-xl sm:text-2xl md:text-3xl py-6 sm:py-7 md:py-8"
                  variant="outline"
                >
                  {opt}
                </Button>
              ))}
              <Button
                onClick={() => handleAnswer('dontKnow')}
                className="col-span-2 text-lg sm:text-xl py-4 sm:py-5 md:py-6 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                variant="secondary"
              >
                {t('dontKnow')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results') {
    const results = getResults();
    const shouldVisitDoctor = results.left < 10 || results.right < 10;
    const isPerfect = results.left === 10 && results.right === 10;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 transition-colors duration-200">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          <Card className="shadow-lg border-0 dark:bg-gray-800 transition-colors duration-200">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-blue-900 dark:text-blue-100 transition-colors duration-200">{t('results')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 sm:p-5 md:p-6 rounded-lg transition-colors duration-200">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 transition-colors duration-200">{t('leftEye')}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">{t('correct')}: {results.left} / {results.leftTotal}</p>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 transition-colors duration-200">{t('rightEye')}</h3>
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">{t('correct')}: {results.right} / {results.rightTotal}</p>
              </div>

              {isPerfect ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-3 sm:p-4 sm:p-5 md:p-6 rounded-lg transition-colors duration-200">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2 transition-colors duration-200">✅ {t('normal')}</h3>
                  <p className="text-green-700 dark:text-green-300 transition-colors duration-200">{t('eyesHealthy')}</p>
                </div>
              ) : shouldVisitDoctor && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-3 sm:p-4 sm:p-5 md:p-6 rounded-lg transition-colors duration-200">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2 transition-colors duration-200">⚠️ {t('importantNoteTitle')}</h3>
                  <p className="text-red-700 dark:text-red-300 transition-colors duration-200">{t('visitDoctor')}</p>
                </div>
              )}

              <Button
                onClick={onBack}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
              >
                {t('returnToTests')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default RefractiveTest;
