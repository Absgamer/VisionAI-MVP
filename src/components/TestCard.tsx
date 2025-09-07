
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface TestCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  buttonText: string;
  gradient: string;
}

const TestCard = ({ title, description, icon: Icon, onClick, buttonText, gradient }: TestCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-200 dark:border-gray-700 dark:hover:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700">
      <CardHeader className="text-center pb-4">
        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-xl font-semibold text-blue-900 dark:text-blue-100 transition-colors duration-200">{title}</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300 mt-2 transition-colors duration-200">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={onClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestCard;
