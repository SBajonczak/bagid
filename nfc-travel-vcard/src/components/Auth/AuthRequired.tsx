import React from 'react';
import { useLanguage } from '../../LanguageContext';
import { messages } from '../../i18n';
import { FaLock, FaExclamationTriangle, FaSignInAlt, FaUserLock, FaTimesCircle } from 'react-icons/fa';

interface AuthRequiredProps {
  type: 'unauthenticated' | 'unauthorized';
  onLogin: () => void;
  onCancel: () => void;
  email?: string;
}

const AuthRequired: React.FC<AuthRequiredProps> = ({ type, onLogin, onCancel, email }) => {
  const { lang } = useLanguage();
  const t = messages[lang].travelCard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        {/* Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all">
          {/* Header section */}
          <div className={`p-6 ${type === 'unauthenticated' ? 'bg-blue-600' : 'bg-amber-500'}`}>
            <div className="flex items-center justify-center">
              <div className="bg-white p-3 rounded-full">
                {type === 'unauthenticated' ? (
                  <FaUserLock className="h-8 w-8 text-blue-600" />
                ) : (
                  <FaTimesCircle className="h-8 w-8 text-amber-500" />
                )}
              </div>
            </div>
            <h2 className="mt-4 text-center text-xl font-extrabold text-white">
              {type === 'unauthenticated' ? t.authRequired : t.notYourTag}
            </h2>
          </div>

          {/* Content section */}
          <div className="p-6">
            <div className="mb-6">
              {type === 'unauthenticated' ? (
                <div className="text-center">
                  <p className="text-gray-700">{t.authRequiredMessage}</p>
                  {email && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg text-blue-700">
                      {t.loggedInAs} <span className="font-semibold">{email}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-700">{t.notYourTagMessage}</p>
                  {email && (
                    <div className="mt-2 p-3 bg-amber-50 rounded-lg text-amber-700 flex items-center justify-center">
                      <FaExclamationTriangle className="mr-2" /> 
                      {t.loggedInAs} <span className="font-semibold ml-1">{email}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col space-y-3">
              {type === 'unauthenticated' && (
                <button
                  onClick={onLogin}
                  className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                >
                  <FaSignInAlt className="mr-2" /> {t.loginButton}
                </button>
              )}
              <button
                onClick={onCancel}
                className={`flex items-center justify-center px-5 py-3 border text-base font-medium rounded-lg shadow-sm ${
                  type === 'unauthenticated' 
                    ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500' 
                    : 'border-amber-300 text-amber-700 bg-white hover:bg-amber-50 focus:ring-amber-500'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all`}
              >
                {t.cancelButton}
              </button>
            </div>
          </div>
          
          {/* Footer */}
          <div className={`px-6 py-3 bg-gray-50 text-xs text-center text-gray-500 border-t ${
            type === 'unauthenticated' ? 'border-blue-100' : 'border-amber-100'
          }`}>
            {t.secureAccessMessage}
          </div>
        </div>
        
        {/* Help text */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>{type === 'unauthenticated' ? t.loginHelp : t.unauthorizedHelp}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthRequired;
