import React, { useState } from 'react';
import { useLanguage } from './LanguageProvider';

const frequencies = [
    { value: 'daily', labelKey: 'medicationDaily' },
    { value: '12h', labelKey: 'medicationEvery12h' },
    { value: '8h', labelKey: 'medicationEvery8h' },
];

function getNextDoseTime(time: string, frequency: string) {
    if (!time) return '';
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    let next = new Date();
    next.setHours(hours, minutes, 0, 0);
    if (next <= now) {
        if (frequency === 'daily') next.setDate(next.getDate() + 1);
        else if (frequency === '12h') next.setHours(next.getHours() + 12);
        else if (frequency === '8h') next.setHours(next.getHours() + 8);
        else next.setDate(next.getDate() + 1);
    }
    return next.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MedicationReminder() {
    const { t, language } = useLanguage();
    const [time, setTime] = useState('');
    const [frequency, setFrequency] = useState('daily');
    const [dose, setDose] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const nextDose = getNextDoseTime(time, frequency);

    return (
        <section className="bg-blue-100 p-4 rounded-lg max-w-md mx-auto mt-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-blue-900">{t('medicationReminder')}</h2>
            <p className="mb-4 text-blue-800 text-lg" aria-live="polite">{t('medicationVoiceGuide')}</p>
            <form
                className="flex flex-col gap-4"
                onSubmit={e => {
                    e.preventDefault();
                    setSubmitted(true);
                }}
                aria-label={t('medicationReminder')}
            >
                <label className="font-semibold text-blue-900">
                    {t('medicationTime')}
                    <input
                        type="time"
                        className="block w-full mt-1 p-2 rounded border border-blue-300 text-lg"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        required
                        aria-required="true"
                    />
                </label>
                <label className="font-semibold text-blue-900">
                    {t('medicationFrequency')}
                    <select
                        className="block w-full mt-1 p-2 rounded border border-blue-300 text-lg"
                        value={frequency}
                        onChange={e => setFrequency(e.target.value)}
                        required
                        aria-required="true"
                    >
                        {frequencies.map(f => (
                            <option key={f.value} value={f.value}>{t(f.labelKey)}</option>
                        ))}
                    </select>
                </label>
                <label className="font-semibold text-blue-900">
                    {t('medicationDose')}
                    <input
                        type="text"
                        className="block w-full mt-1 p-2 rounded border border-blue-300 text-lg"
                        value={dose}
                        onChange={e => setDose(e.target.value)}
                        placeholder="e.g. 2 drops"
                        aria-label={t('medicationDose')}
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 text-lg mt-2"
                >
                    {t('medicationSet')}
                </button>
            </form>
            {submitted && time && (
                <div className="mt-4 text-blue-900 text-lg font-semibold" aria-live="polite">
                    {t('medicationNextDose').replace('{time}', nextDose)}
                </div>
            )}
        </section>
    );
} 