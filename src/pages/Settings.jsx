import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';
import { FiSave, FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../modules/auth/AuthProvider';

export default function Settings() {
  const { user } = useAuth();
  const [metaIntegration, setMetaIntegration] = useState({
    connected: false,
    loading: false
  });
  const [tiktokIntegration, setTiktokIntegration] = useState({
    connected: false,
    loading: false
  });
  const [appEvents, setAppEvents] = useState({
    connected: false,
    loading: false
  });
  const [saving, setSaving] = useState(false);

  const connectMeta = async () => {
    setMetaIntegration(prev => ({ ...prev, loading: true }));
    try {
      // Here you would implement the OAuth flow for Meta
      // For demo purposes, we're just simulating a connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMetaIntegration({ connected: true, loading: false });
    } catch (error) {
      console.error('Error connecting to Meta:', error);
      Sentry.captureException(error);
      setMetaIntegration({ connected: false, loading: false });
    }
  };

  const connectTikTok = async () => {
    setTiktokIntegration(prev => ({ ...prev, loading: true }));
    try {
      // Here you would implement the OAuth flow for TikTok
      // For demo purposes, we're just simulating a connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTiktokIntegration({ connected: true, loading: false });
    } catch (error) {
      console.error('Error connecting to TikTok:', error);
      Sentry.captureException(error);
      setTiktokIntegration({ connected: false, loading: false });
    }
  };

  const connectAppEvents = async () => {
    setAppEvents(prev => ({ ...prev, loading: true }));
    try {
      // Here you would implement the connection to app events
      // For demo purposes, we're just simulating a connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAppEvents({ connected: true, loading: false });
    } catch (error) {
      console.error('Error connecting to App Events:', error);
      Sentry.captureException(error);
      setAppEvents({ connected: false, loading: false });
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      // Save settings to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Success message
    } catch (error) {
      console.error('Error saving settings:', error);
      Sentry.captureException(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600">Manage your data connections and account preferences</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">User Information</h2>
          <div className="mt-4">
            <p><span className="font-medium">Email:</span> {user?.email}</p>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Data Connections</h2>
          
          <div className="space-y-6">
            {/* Meta Integration */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Meta (Facebook) Ads</h3>
                <p className="text-sm text-gray-500">Connect to your Meta advertising account</p>
              </div>
              <button
                onClick={connectMeta}
                disabled={metaIntegration.loading || metaIntegration.connected}
                className={`${
                  metaIntegration.connected
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white px-4 py-2 rounded-md flex items-center space-x-2 cursor-pointer transition-colors duration-200`}
              >
                {metaIntegration.loading ? (
                  <><FiRefreshCw className="h-4 w-4 animate-spin" /><span>Connecting...</span></>
                ) : metaIntegration.connected ? (
                  'Connected'
                ) : (
                  'Connect'
                )}
              </button>
            </div>

            {/* TikTok Integration */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">TikTok Ads</h3>
                <p className="text-sm text-gray-500">Connect to your TikTok advertising account</p>
              </div>
              <button
                onClick={connectTikTok}
                disabled={tiktokIntegration.loading || tiktokIntegration.connected}
                className={`${
                  tiktokIntegration.connected
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white px-4 py-2 rounded-md flex items-center space-x-2 cursor-pointer transition-colors duration-200`}
              >
                {tiktokIntegration.loading ? (
                  <><FiRefreshCw className="h-4 w-4 animate-spin" /><span>Connecting...</span></>
                ) : tiktokIntegration.connected ? (
                  'Connected'
                ) : (
                  'Connect'
                )}
              </button>
            </div>

            {/* App Events Integration */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">App Events</h3>
                <p className="text-sm text-gray-500">Connect to your application event tracking</p>
              </div>
              <button
                onClick={connectAppEvents}
                disabled={appEvents.loading || appEvents.connected}
                className={`${
                  appEvents.connected
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white px-4 py-2 rounded-md flex items-center space-x-2 cursor-pointer transition-colors duration-200`}
              >
                {appEvents.loading ? (
                  <><FiRefreshCw className="h-4 w-4 animate-spin" /><span>Connecting...</span></>
                ) : appEvents.connected ? (
                  'Connected'
                ) : (
                  'Connect'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          disabled={saving}
          className="btn-primary flex items-center space-x-2 cursor-pointer"
        >
          {saving ? (
            <><FiRefreshCw className="h-5 w-5 animate-spin" /><span>Saving...</span></>
          ) : (
            <><FiSave className="h-5 w-5" /><span>Save Settings</span></>
          )}
        </button>
      </div>
    </div>
  );
}