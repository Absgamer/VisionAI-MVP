import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-200">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-200">{t('notFoundOops')}</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors duration-200">
          {t('notFoundReturnHome')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
