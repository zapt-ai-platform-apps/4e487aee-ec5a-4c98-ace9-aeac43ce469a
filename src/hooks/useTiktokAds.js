import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export default function useTiktokAds(dateRange) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTiktokAdsData() {
      try {
        setLoading(true);
        console.log('Fetching TikTok ads data with date range:', dateRange);
        
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('No authenticated session');
        }

        const response = await fetch('/api/tiktok-ads', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          }),
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        console.log('TikTok ads data received:', result);
        setData(result);
      } catch (err) {
        console.error('Error fetching TikTok ads data:', err);
        Sentry.captureException(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTiktokAdsData();
  }, [dateRange]);

  return { data, loading, error };
}