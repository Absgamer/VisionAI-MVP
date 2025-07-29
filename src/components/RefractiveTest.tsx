import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Eye } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface RefractiveTestProps {
  onBack: () => void;
}

const RefractiveTest = ({ onBack }: RefractiveTestProps) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<'instructions' | 'left-instruct' | 'left-test' | 'right-instruct' | 'right-test' | 'results'>('instructions');
  const [currentEye, setCurrentEye] = useState<'left' | 'right'>('left');
  const [testIndex, setTestIndex] = useState(0);
  const [responses, setResponses] = useState<{ eye: 'left' | 'right'; letter: string; response: string; correct: boolean }[]>([]);

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

  // 10 random letters for each eye (no repeats per eye)
  const allLetters = ['E', 'F', 'P', 'T', 'O', 'Z', 'L', 'D', 'C', 'H', 'K', 'N', 'R', 'S', 'V', 'Y'];
  const [leftLetters] = useState(() => shuffleArray(allLetters).slice(0, 10));
  const [rightLetters] = useState(() => shuffleArray(allLetters).slice(0, 10));
  const currentLetters = currentEye === 'left' ? leftLetters : rightLetters;
  const currentLetter = currentLetters[testIndex];

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

  const getResults = () => {
    const left = responses.filter(r => r.eye === 'left');
    const right = responses.filter(r => r.eye === 'right');
    const leftCorrect = left.filter(r => r.correct).length;
    const rightCorrect = right.filter(r => r.correct).length;
    return {
      left: leftCorrect,
      right: rightCorrect,
      leftTotal: left.length,
      rightTotal: right.length
    };
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
            {t('back')}
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
                  <li>• {t('leftEye')}: {t('leftEyeInstruction')}</li>
                  <li>• {t('rightEye')}: {t('rightEyeInstruction')}</li>
                  <li>• {t('lettersGetSmaller')}</li>
                  <li>• {t('clickOrDontKnow')}</li>
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

  if (currentStep === 'left-instruct') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="max-w-3xl w-full mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-16 mb-6 w-full">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">{t('leftEye')}</h2>
            <p className="text-xl text-gray-700 mb-8">{t('leftEyeInstruction')}</p>
            <Button onClick={() => handleStartEye('left')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-lg text-xl">{t('start')}</Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'right-instruct') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="max-w-3xl w-full mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-16 mb-6 w-full">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">{t('rightEye')}</h2>
            <p className="text-xl text-gray-700 mb-8">{t('rightEyeInstruction')}</p>
            <Button onClick={() => handleStartEye('right')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-lg text-xl">{t('start')}</Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'left-test' || currentStep === 'right-test') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="max-w-3xl w-full mx-auto text-center relative">
          {/* Timer at top left */}
          <div className="absolute left-8 top-8 text-4xl font-bold text-gray-800 select-none z-10">{timer}</div>
          <div className="bg-white rounded-xl shadow-lg p-20 mb-6 w-full min-h-[700px] flex flex-col justify-between">
            <div className="mb-8">
              <div className="text-2xl font-bold text-blue-700 mb-2">
                {t(currentEye === 'left' ? 'leftEye' : 'rightEye')}
              </div>
              <div className="text-lg text-gray-500 mb-2">
                {testIndex + 1} / 10
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((testIndex + 1) / 10) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              {/* Box with crosshair lines and letter */}
              <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>
                {/* Box border */}
                <div className="absolute border border-gray-400" style={{ width: 220, height: 220, left: 20, top: 20 }}></div>
                {/* Vertical line */}
                <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-200" style={{ transform: 'translateX(-50%)' }}></div>
                {/* Horizontal line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200" style={{ transform: 'translateY(-50%)' }}></div>
                {/* Letter */}
                <div className="absolute left-1/2 top-1/2 font-mono font-bold text-gray-900 select-none" style={{ fontSize: `${fontSize}px`, lineHeight: 1, transform: 'translate(-50%, -50%)' }}>{currentLetter}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto mb-4 mt-8">
              {options.map((opt, i) => (
                <Button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="text-3xl py-8"
                  variant="outline"
                >
                  {opt}
                </Button>
              ))}
              <Button
                onClick={() => handleAnswer('dontKnow')}
                className="col-span-2 text-xl py-6 bg-gray-200 hover:bg-gray-300 text-gray-700"
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-blue-700 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-blue-900">{t('results')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">{t('leftEye')}</h3>
                <p className="text-gray-700 mb-2">{t('correct')}: {results.left} / {results.leftTotal}</p>
                <h3 className="font-semibold text-blue-900 mb-3">{t('rightEye')}</h3>
                <p className="text-gray-700">{t('correct')}: {results.right} / {results.rightTotal}</p>
              </div>

              {isPerfect ? (
                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">✅ {t('normal')}</h3>
                  <p className="text-green-700">{t('eyesHealthy')}</p>
                </div>
              ) : shouldVisitDoctor && (
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">⚠️ {t('importantNoteTitle')}</h3>
                  <p className="text-red-700">{t('visitDoctor')}</p>
                </div>
              )}

              <Button
                onClick={onBack}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
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
