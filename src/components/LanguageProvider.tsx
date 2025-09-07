import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ===== ENGLISH TRANSLATIONS =====
const translations = {
  en: {
    welcome: "Welcome to VisionAI",
    subtitle: "AI-powered eye health screening for everyone",
    startTest: "Start Eye Test",
    refractiveTest: "Vision Acuity Test",
    colorBlindTest: "Color Vision Test",
    education: "Eye Health Education",
    testDescription: "Check your vision clarity",
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
    preventionTips: "Prevention Tips",
    leftEye: "Left Eye",
    rightEye: "Right Eye",
    dontKnow: "I don't know",
    leftEyeInstruction: "Please cover your right eye and click Start to begin the test for your left eye.",
    rightEyeInstruction: "Please cover your left eye and click Start to begin the test for your right eye.",
    lettersGetSmaller: "You'll see letters that get smaller as you progress",
    clickOrDontKnow: "Click the letter you see clearly, or 'I don't know' if unsure",
    back: "Back",
    start: "Start",
    correct: "Correct",
    returnToTests: "Return to Tests",
    refractive1: "Refractive errors occur when your eye doesn't bend light correctly, causing blurred vision.",
    refractive2: "Common types include myopia (nearsightedness), hyperopia (farsightedness), and astigmatism.",
    refractive3: "These conditions affect millions of people in India and can often be corrected with glasses or contact lenses.",
    refractive4: "Early detection is important for maintaining good vision and preventing eye strain.",
    color1: "Color blindness affects the ability to distinguish between certain colors, most commonly red and green.",
    color2: "It's usually inherited and affects about 8% of men and 0.5% of women globally.",
    color3: "While there's no cure, people with color vision deficiency can live normal lives with some adaptations.",
    color4: "Special glasses and apps can help distinguish colors in daily activities.",
    prevention1: "Protect your eyes from UV rays by wearing sunglasses outdoors.",
    prevention2: "Take regular breaks from screens using the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
    prevention3: "Maintain a healthy diet rich in vitamins A, C, and E, and omega-3 fatty acids.",
    prevention4: "Get regular eye examinations, especially if you have a family history of eye problems.",
    prevention5: "Avoid rubbing your eyes and maintain good hygiene to prevent infections.",
    educationSubtitle: "Learn about eye health and how to protect your vision",
    importantNoteTitle: "Important Note",
    importantNote1: "These tests are screening tools and cannot replace professional medical examination.",
    importantNote2: "If you have concerns about your vision, please consult with a qualified eye care professional.",
    eyesHealthy: "Your eyes are perfectly fine. No need to visit a doctor.",
    colorBlindInstructions1: "Look at each colored plate carefully and identify the number you see",
    colorBlindInstructions2: "Select the number from the multiple choice options below",
    colorBlindInstructions3: "If you cannot see any number clearly, select 'I don't see any number'",
    colorBlindInstructions4: "You have 10 seconds per question - take your time but don't overthink",
    colorBlindInstructions5: "This test helps identify color vision deficiencies like red-green color blindness",
    colorBlindPlateProgress: "Plate {current} of {total}",
    colorBlindPlaceholder: "Enter number",
    colorBlindNormal: "Normal color vision detected",
    colorBlindMild: "Mild color vision deficiency detected",
    colorBlindSignificant: "Significant color vision deficiency detected. Please consult an eye specialist.",
    colorBlindTypeNormal: "Normal",
    colorBlindTypeMild: "Mild Deficiency",
    colorBlindTypeSignificant: "Color Vision Deficiency",
    colorBlindSummary: "Test Summary:",
    colorBlindCorrect: "Correct responses: {correct} out of {total}",
    colorBlindPlate1Desc: "Plate 1: Normal vision sees '12'",
    colorBlindPlate2Desc: "Plate 2: Normal vision sees '8'",
    colorBlindPlate3Desc: "Plate 3: Normal vision sees '6'",
    colorBlindPlate4Desc: "Plate 4: Normal vision sees '29'",
    colorBlindPlate5Desc: "Plate 5: Normal vision sees '74'",
    colorBlindPlate6Desc: "Plate 6: Normal vision sees '5'",
    colorBlindPlate7Desc: "Plate 7: Normal vision sees '3'",
    colorBlindPlate8Desc: "Plate 8: Normal vision sees '15'",
    colorBlindPlate9Desc: "Plate 9: Normal vision sees '7'",
    colorBlindPlate10Desc: "Plate 10: Normal vision sees '16'",
    colorBlindSelectAnswer: "What number do you see?",
    colorBlindNoNumber: "I don't see any number",
    colorBlindNotSure: "I'm not sure",
    heroBadge: "No login required • 100% private • Instant results",
    chooseTest: "Choose Your Eye Test",
    chooseTestDesc: "Select from our AI-powered screening tests designed for accuracy and accessibility",
    learnMore: "Learn More",
    feature1Title: "AI-Powered Accuracy",
    feature1Desc: "Advanced algorithms provide reliable screening results",
    feature2Title: "Multilingual Support",
    feature2Desc: "Available in English and Hindi",
    feature3Title: "Developed by Abhimanyu Chaudhary",
    feature3Desc: "Designed and built with care for everyone.",
    ctaTitle: "Early Detection, Better Vision",
    ctaDesc: "Join thousands who have already screened their vision with VisionAI",
    ctaStart: "Start Vision Test",
    ctaLearn: "Learn More",
    notFoundOops: "Oops! Page not found",
    notFoundReturnHome: "Return to Home",
    close: "Close",
    languageSelectTitle: "Select your language",
    languageSelectDesc: "Please choose your preferred language to continue.",
    languageEnglish: "English",
    languageHindi: "Hindi",
    medicationReminder: "Medication Reminder",
    medicationTime: "Time for Dose",
    medicationFrequency: "Frequency",
    medicationDose: "Dose (optional)",
    medicationSet: "Set Reminder",
    medicationDaily: "Daily",
    medicationEvery12h: "Every 12 hours",
    medicationEvery8h: "Every 8 hours",
    medicationNextDose: "Next dose: {time}",
    medicationPermission: "Allow notifications to get reminders!",
    medicationPermissionDenied: "Notifications are blocked. Please enable them in your browser settings.",
    medicationReminderMsg: "Time for your eye drop dose!",
    medicationVoiceGuide: "This section helps you set reminders for your eye medication."
  },

  // ===== HINDI TRANSLATIONS =====
  hi: {
    welcome: "VisionAI में आपका स्वागत है",
    subtitle: "सभी के लिए AI-संचालित नेत्र स्वास्थ्य जांच",
    startTest: "आंख की जांच शुरू करें",
    refractiveTest: "दृष्टि तीक्ष्णता परीक्षण",
    colorBlindTest: "रंग दृष्टि परीक्षण",
    education: "नेत्र स्वास्थ्य शिक्षा",
    testDescription: "हमारे AI-संचालित परीक्षण से अपनी दृष्टि की स्पष्टता जांचें",
    colorDescription: "हमारे AI-संचालित परीक्षण से रंग दृष्टि दोष का पता लगाएं",
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
    preventionTips: "रोकथाम की युक्तियां",
    leftEye: "बायां आंख",
    rightEye: "दायां आंख",
    dontKnow: "मुझे नहीं पता",
    leftEyeInstruction: "कृपया अपनी दाहिनी आंख को ढकें और अपने बाएं आंख के लिए परीक्षण शुरू करने के लिए 'शुरू करें' पर क्लिक करें।",
    rightEyeInstruction: "कृपया अपनी बाईं आंख को ढकें और अपने दाहिने आंख के लिए परीक्षण शुरू करने के लिए 'शुरू करें' पर क्लिक करें।",
    lettersGetSmaller: "जैसे-जैसे आप आगे बढ़ेंगे, अक्षर छोटे होते जाएंगे",
    clickOrDontKnow: "जो अक्षर स्पष्ट दिखे उसे क्लिक करें, या यदि स्पष्ट नहीं है तो 'मुझे नहीं पता' चुनें",
    back: "वापस",
    start: "शुरू करें",
    correct: "सही",
    returnToTests: "परीक्षणों पर लौटें",
    refractive1: "अपवर्तक त्रुटियाँ तब होती हैं जब आपकी आंख प्रकाश को सही ढंग से नहीं मोड़ती, जिससे धुंधली दृष्टि होती है।",
    refractive2: "आम प्रकारों में मायोपिया (निकट दृष्टि दोष), हाइपरोपिया (दूर दृष्टि दोष), और एस्टिग्मैटिज्म शामिल हैं।",
    refractive3: "ये स्थितियाँ भारत में लाखों लोगों को प्रभावित करती हैं और अक्सर चश्मा या कॉन्टैक्ट लेंस से सुधारी जा सकती हैं।",
    refractive4: "जल्दी पहचान अच्छी दृष्टि बनाए रखने और आंखों के तनाव को रोकने के लिए महत्वपूर्ण है।",
    color1: "रंग अंधता कुछ रंगों के बीच अंतर करने की क्षमता को प्रभावित करती है, सबसे आम रूप से लाल और हरा।",
    color2: "यह आमतौर पर आनुवंशिक होती है और लगभग 8% पुरुषों और 0.5% महिलाओं को प्रभावित करती है।",
    color3: "हालांकि इसका कोई इलाज नहीं है, रंग दृष्टि दोष वाले लोग कुछ अनुकूलनों के साथ सामान्य जीवन जी सकते हैं।",
    color4: "विशेष चश्मा और ऐप्स दैनिक गतिविधियों में रंगों को पहचानने में मदद कर सकते हैं।",
    prevention1: "बाहर धूप में चश्मा पहनकर अपनी आंखों को UV किरणों से बचाएं।",
    prevention2: "20-20-20 नियम का पालन करते हुए स्क्रीन से नियमित ब्रेक लें: हर 20 मिनट में, 20 फीट दूर किसी चीज को 20 सेकंड तक देखें।",
    prevention3: "विटामिन A, C, और E, और ओमेगा-3 फैटी एसिड से भरपूर स्वस्थ आहार लें।",
    prevention4: "नियमित रूप से आंखों की जांच कराएं, खासकर यदि आपके परिवार में आंखों की समस्याओं का इतिहास है।",
    prevention5: "अपनी आंखों को रगड़ने से बचें और संक्रमण से बचाव के लिए अच्छी स्वच्छता बनाए रखें।",
    educationSubtitle: "नेत्र स्वास्थ्य और अपनी दृष्टि की सुरक्षा के बारे में जानें",
    importantNoteTitle: "महत्वपूर्ण नोट",
    importantNote1: "ये परीक्षण केवल स्क्रीनिंग टूल हैं और पेशेवर चिकित्सा जांच का विकल्प नहीं हो सकते।",
    importantNote2: "यदि आपको अपनी दृष्टि के बारे में कोई चिंता है, तो कृपया योग्य नेत्र देखभाल विशेषज्ञ से परामर्श करें।",
    eyesHealthy: "आपकी आंखें पूरी तरह से स्वस्थ हैं। डॉक्टर से मिलने की आवश्यकता नहीं है।",
    colorBlindInstructions1: "प्रत्येक रंगीन प्लेट को ध्यान से देखें और जो संख्या दिखे उसे पहचानें",
    colorBlindInstructions2: "नीचे दिए गए विकल्पों में से संख्या चुनें",
    colorBlindInstructions3: "यदि आपको कोई संख्या स्पष्ट रूप से नहीं दिख रही, तो 'मुझे कोई संख्या नहीं दिख रही' चुनें",
    colorBlindInstructions4: "प्रत्येक प्रश्न के लिए आपके पास 10 सेकंड हैं - समय लें लेकिन ज्यादा न सोचें",
    colorBlindInstructions5: "यह परीक्षण लाल-हरे रंग अंधता जैसी रंग दृष्टि दोष की पहचान में मदद करता है",
    colorBlindPlateProgress: "प्लेट {current} में से {total}",
    colorBlindPlaceholder: "संख्या दर्ज करें",
    colorBlindNormal: "सामान्य रंग दृष्टि पाई गई",
    colorBlindMild: "हल्की रंग दृष्टि दोष पाई गई",
    colorBlindSignificant: "महत्वपूर्ण रंग दृष्टि दोष पाई गई। कृपया नेत्र विशेषज्ञ से परामर्श करें।",
    colorBlindTypeNormal: "सामान्य",
    colorBlindTypeMild: "हल्का दोष",
    colorBlindTypeSignificant: "रंग दृष्टि दोष",
    colorBlindSummary: "परीक्षण सारांश:",
    colorBlindCorrect: "सही उत्तर: {correct} में से {total}",
    colorBlindPlate1Desc: "प्लेट 1: सामान्य दृष्टि में '12' दिखता है",
    colorBlindPlate2Desc: "प्लेट 2: सामान्य दृष्टि में '8' दिखता है",
    colorBlindPlate3Desc: "प्लेट 3: सामान्य दृष्टि में '6' दिखता है",
    colorBlindPlate4Desc: "प्लेट 4: सामान्य दृष्टि में '29' दिखता है",
    colorBlindPlate5Desc: "प्लेट 5: सामान्य दृष्टि में '74' दिखता है",
    colorBlindPlate6Desc: "प्लेट 6: सामान्य दृष्टि में '5' दिखता है",
    colorBlindPlate7Desc: "प्लेट 7: सामान्य दृष्टि में '3' दिखता है",
    colorBlindPlate8Desc: "प्लेट 8: सामान्य दृष्टि में '15' दिखता है",
    colorBlindPlate9Desc: "प्लेट 9: सामान्य दृष्टि में '7' दिखता है",
    colorBlindPlate10Desc: "प्लेट 10: सामान्य दृष्टि में '16' दिखता है",
    colorBlindSelectAnswer: "आप कौन सी संख्या देख रहे हैं?",
    colorBlindNoNumber: "मुझे कोई संख्या नहीं दिख रही",
    colorBlindNotSure: "मुझे यकीन नहीं है",
    heroBadge: "कोई लॉगिन आवश्यक नहीं • 100% निजी • त्वरित परिणाम",
    chooseTest: "अपना नेत्र परीक्षण चुनें",
    chooseTestDesc: "हमारे AI-संचालित स्क्रीनिंग परीक्षणों में से चुनें, जो सटीकता और पहुंच के लिए डिज़ाइन किए गए हैं",
    learnMore: "और जानें",
    feature1Title: "AI-संचालित सटीकता",
    feature1Desc: "उन्नत एल्गोरिदम विश्वसनीय स्क्रीनिंग परिणाम प्रदान करते हैं",
    feature2Title: "बहुभाषी समर्थन",
    feature2Desc: "अंग्रेज़ी और हिंदी में उपलब्ध",
    feature3Title: "अभिमन्यु चौधरी द्वारा विकसित",
    feature3Desc: "हर किसी के लिए देखभाल के साथ डिज़ाइन और निर्मित।",
    ctaTitle: "जल्दी पहचान, बेहतर दृष्टि",
    ctaDesc: "हजारों लोग पहले ही VisionAI के साथ अपनी दृष्टि की जांच कर चुके हैं",
    ctaStart: "दृष्टि परीक्षण शुरू करें",
    ctaLearn: "और जानें",
    notFoundOops: "अरे! पृष्ठ नहीं मिला",
    notFoundReturnHome: "मुख्य पृष्ठ पर लौटें",
    close: "बंद करें",
    languageSelectTitle: "अपनी भाषा चुनें",
    languageSelectDesc: "कृपया जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",
    languageEnglish: "अंग्रेज़ी",
    languageHindi: "हिंदी",
    medicationReminder: "दवा अनुस्मारक",
    medicationTime: "खुराक का समय",
    medicationFrequency: "आवृत्ति",
    medicationDose: "खुराक (वैकल्पिक)",
    medicationSet: "अनुस्मारक सेट करें",
    medicationDaily: "रोज़ाना",
    medicationEvery12h: "हर 12 घंटे में",
    medicationEvery8h: "हर 8 घंटे में",
    medicationNextDose: "अगली खुराक: {time}",
    medicationPermission: "अनुस्मारक प्राप्त करने के लिए सूचनाओं की अनुमति दें!",
    medicationPermissionDenied: "सूचनाएं अवरुद्ध हैं। कृपया अपने ब्राउज़र सेटिंग्स में उन्हें सक्षम करें।",
    medicationReminderMsg: "अपनी आंखों की दवा लेने का समय हो गया है!",
    medicationVoiceGuide: "यह अनुभाग आपकी दवा के लिए अनुस्मारक सेट करने में मदद करता है."
  }
};


// ===== LANGUAGE PROVIDER =====
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('visionai-language') || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('visionai-language', language);
    }
  }, [language]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};


// ===== LANGUAGE HOOK =====
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
