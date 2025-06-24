
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Book, Eye, AlertTriangle, Shield } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface EducationProps {
  onBack: () => void;
}

const Education = ({ onBack }: EducationProps) => {
  const { t } = useLanguage();
  
  const educationContent = [
    {
      title: t('aboutRefractive'),
      icon: Eye,
      content: [
        "Refractive errors occur when your eye doesn't bend light correctly, causing blurred vision.",
        "Common types include myopia (nearsightedness), hyperopia (farsightedness), and astigmatism.",
        "These conditions affect millions of people in India and can often be corrected with glasses or contact lenses.",
        "Early detection is important for maintaining good vision and preventing eye strain."
      ],
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: t('aboutColor'),
      icon: AlertTriangle,
      content: [
        "Color blindness affects the ability to distinguish between certain colors, most commonly red and green.",
        "It's usually inherited and affects about 8% of men and 0.5% of women globally.",
        "While there's no cure, people with color vision deficiency can live normal lives with some adaptations.",
        "Special glasses and apps can help distinguish colors in daily activities."
      ],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: t('preventionTips'),
      icon: Shield,
      content: [
        "Protect your eyes from UV rays by wearing sunglasses outdoors.",
        "Take regular breaks from screens using the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
        "Maintain a healthy diet rich in vitamins A, C, and E, and omega-3 fatty acids.",
        "Get regular eye examinations, especially if you have a family history of eye problems.",
        "Avoid rubbing your eyes and maintain good hygiene to prevent infections."
      ],
      gradient: "from-green-500 to-emerald-500"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-green-700 hover:text-green-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-500 to-blue-500 p-4 mb-4">
            <Book className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{t('eyeHealthTitle')}</h1>
          <p className="text-gray-600 mt-2">Learn about eye health and how to protect your vision</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {educationContent.map((section, index) => (
            <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${section.gradient} p-3`}>
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {section.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Important Note</h3>
              <p className="text-blue-100">
                These tests are screening tools and cannot replace professional medical examination. 
                If you have concerns about your vision, please consult with a qualified eye care professional.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Education;
