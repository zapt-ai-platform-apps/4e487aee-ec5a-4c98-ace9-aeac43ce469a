import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../supabaseClient';
import { useAuth } from './AuthProvider';
import * as Sentry from '@sentry/browser';

export default function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect via the useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Marketing Funnel Analytics</h1>
          <p className="text-gray-600 mb-6">Integrate and analyze Meta and TikTok ad performance</p>
          <div className="flex justify-center mb-6">
            <img 
              src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=128&height=128" 
              alt="App Logo" 
              className="h-24 w-24"
            />
          </div>
          <p className="text-indigo-600 font-medium mb-6">Sign in with ZAPT</p>
          <div className="text-sm text-gray-500 mb-4">
            <a 
              href="https://www.zapt.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Learn more about ZAPT
            </a>
          </div>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'facebook', 'apple']}
          magicLink={true}
          view="magic_link"
          theme="default"
          onError={(error) => {
            console.error('Auth error:', error);
            Sentry.captureException(error);
          }}
        />
      </div>
    </div>
  );
}