import React from 'react';
import MedicationReminder from '@/components/MedicationReminder';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageProvider';
import { ArrowLeft } from 'lucide-react';

export default function MedicationReminderPage() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 flex flex-col items-center justify-center transition-colors duration-200">
            <button
                onClick={() => navigate('/')}
                className="mb-6 flex items-center text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 font-semibold text-lg transition-colors duration-200"
            >
                <ArrowLeft className="h-5 w-5 mr-2" />
                {t('back')}
            </button>
            <MedicationReminder />
        </div>
    );
} 