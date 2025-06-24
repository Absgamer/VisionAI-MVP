
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    welcome: "Welcome to VisionAI",
    subtitle: "AI-powered eye health screening for everyone",
    startTest: "Start Eye Test",
    refractiveTest: "Vision Acuity Test",
    colorBlindTest: "Color Vision Test",
    education: "Eye Health Education",
    testDescription: "Check your vision clarity with our AI-powered test",
    colorDescription: "Detect color vision deficiencies",
    educationDescription: "Learn about eye health and prevention",
    instructions: "Instructions",
    begin: "Begin Test",
    next: "Next",
    submit: "Submit",
    results: "Results",
    normal: "Normal Vision",
    visitDoctor: "Please visit an eye doctor for further examination",
    readLetter: "What letter do you see?",
    selectNumber: "What number do you see?",
    cantSee: "I can't see clearly",
    eyeHealthTitle: "Eye Health Education",
    aboutRefractive: "About Refractive Errors",
    aboutColor: "About Color Blindness",
    preventionTips: "Prevention Tips"
  },
  hi: {
    welcome: "VisionAI में आपका स्वागत है",
    subtitle: "सभी के लिए AI-संचालित नेत्र स्वास्थ्य जांच",
    startTest: "आंख की जांच शुरू करें",
    refractiveTest: "दृष्टि तीक्ष्णता परीक्षण",
    colorBlindTest: "रंग दृष्टि परीक्षण",
    education: "नेत्र स्वास्थ्य शिक्षा",
    testDescription: "हमारे AI-संचालित परीक्षण से अपनी दृष्टि की स्पष्टता जांचें",
    colorDescription: "रंग दृष्टि दोष का पता लगाएं",
    educationDescription: "नेत्र स्वास्थ्य और रोकथाम के बारे में जानें",
    instructions: "निर्देश",
    begin: "परीक्षण शुरू करें",
    next: "अगला",
    submit: "जमा करें",
    results: "परिणाम",
    normal: "सामान्य दृष्टि",
    visitDoctor: "कृपया आगे की जांच के लिए नेत्र चिकित्सक से मिलें",
    readLetter: "आप कौन सा अक्षर देख रहे हैं?",
    selectNumber: "आप कौन सी संख्या देख रहे हैं?",
    cantSee: "मैं स्पष्ट रूप से नहीं देख सकता",
    eyeHealthTitle: "नेत्र स्वास्थ्य शिक्षा",
    aboutRefractive: "अपवर्तक त्रुटियों के बारे में",
    aboutColor: "रंग अंधता के बारे में",
    preventionTips: "रोकथाम की युक्तियां"
  },
  ta: {
    welcome: "VisionAI க்கு வரவேற்கிறோம்",
    subtitle: "அனைவருக்கும் AI-இயங்கும் கண் ஆரோக்கிய பரிசோதனை",
    startTest: "கண் பரிசோதனையைத் தொடங்கவும்",
    refractiveTest: "பார்வைக் கூர்மை பரிசோதனை",
    colorBlindTest: "வண்ண பார்வை பரிசோதனை",
    education: "கண் ஆரோக்கிய கல்வி",
    testDescription: "எங்கள் AI-இயங்கும் பரிசோதனையுடன் உங்கள் பார்வைத் தெளிவைச் சரிபார்க்கவும்",
    colorDescription: "வண்ண பார்வைக் குறைபாடுகளைக் கண்டறியவும்",
    educationDescription: "கண் ஆரோக்கியம் மற்றும் தடுப்பு பற்றி அறியவும்",
    instructions: "வழிமுறைகள்",
    begin: "பரிசோதனையைத் தொடங்கவும்",
    next: "அடுத்து",
    submit: "சமர்ப்பிக்கவும்",
    results: "முடிவுகள்",
    normal: "சாதாரண பார்வை",
    visitDoctor: "மேலும் பரிசோதனைக்கு கண் மருத்துவரைப் பார்க்கவும்",
    readLetter: "நீங்கள் எந்த எழுத்தைப் பார்க்கிறீர்கள்?",
    selectNumber: "நீங்கள் எந்த எண்ணைப் பார்க்கிறீர்கள்?",
    cantSee: "என்னால் தெளிவாகப் பார்க்க முடியவில்லை",
    eyeHealthTitle: "கண் ஆரோக்கிய கல்வி",
    aboutRefractive: "ஒளிவிலகல் பிழைகள் பற்றி",
    aboutColor: "வண்ண குருட்டுத்தன்மை பற்றி",
    preventionTips: "தடுப்பு குறிப்புகள்"
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');
  
  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
