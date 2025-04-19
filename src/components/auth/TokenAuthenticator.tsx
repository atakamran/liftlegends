import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { retrieveAccessToken, retrieveRefreshToken } from '@/utils/tokenUtils';
import { Loader2 } from 'lucide-react';

interface TokenAuthenticatorProps {
  redirectTo?: string;
}

const TokenAuthenticator: React.FC<TokenAuthenticatorProps> = ({ 
  redirectTo = '/home' 
}) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { signInWithToken, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateWithToken = async () => {
      try {
        // If already authenticated, redirect
        if (isAuthenticated) {
          setStatus('success');
          setTimeout(() => navigate(redirectTo), 1000);
          return;
        }

        // Get tokens
        const accessToken = await retrieveAccessToken();
        const refreshToken = await retrieveRefreshToken();

        if (!accessToken || !refreshToken) {
          setStatus('error');
          setErrorMessage('توکن احراز هویت یافت نشد');
          return;
        }

        // Attempt authentication
        const result = await signInWithToken(accessToken, refreshToken);

        if (result.success) {
          setStatus('success');
          toast({
            title: 'ورود موفق',
            description: 'به لیفت لجندز خوش آمدید!',
          });
          setTimeout(() => navigate(redirectTo), 1000);
        } else {
          setStatus('error');
          setErrorMessage(result.error || 'خطا در احراز هویت');
        }
      } catch (error) {
        console.error('Error during token authentication:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'خطا در احراز هویت');
      }
    };

    authenticateWithToken();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      {status === 'loading' && (
        <>
          <Loader2 className="h-12 w-12 animate-spin mb-4" />
          <h2 className="text-xl font-bold mb-2">در حال ورود به سیستم</h2>
          <p className="text-gray-500">لطفاً صبر کنید...</p>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">ورود موفقیت‌آمیز</h2>
          <p className="text-gray-500">در حال انتقال به صفحه اصلی...</p>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">خطا در ورود</h2>
          <p className="text-gray-500">{errorMessage}</p>
          <button 
            onClick={() => navigate('/phone-login')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            بازگشت به صفحه ورود
          </button>
        </>
      )}
    </div>
  );
};

export default TokenAuthenticator;