import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, recordLogin } from '../../supabaseClient';
import * as Sentry from '@sentry/browser';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          Sentry.captureException(error);
        } else {
          setSession(data.session);
          setUser(data.session?.user || null);
          
          // Record login if user exists
          if (data.session?.user?.email && !window.loginRecorded) {
            try {
              await recordLogin(data.session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV);
              window.loginRecorded = true;
            } catch (recordError) {
              console.error('Failed to record login:', recordError);
              Sentry.captureException(recordError);
            }
          }
        }
      } catch (err) {
        console.error('Unexpected error in getSession:', err);
        Sentry.captureException(err);
      } finally {
        setLoading(false);
      }
    }

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user || null);
        
        if (event === 'SIGNED_IN' && newSession?.user?.email && !window.loginRecorded) {
          try {
            await recordLogin(newSession.user.email, import.meta.env.VITE_PUBLIC_APP_ENV);
            window.loginRecorded = true;
          } catch (recordError) {
            console.error('Failed to record login:', recordError);
            Sentry.captureException(recordError);
          }
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    session,
    loading,
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};