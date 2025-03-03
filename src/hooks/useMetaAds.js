import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export default function useMetaAds(dateRange) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMetaAdsData() {
      try {
        setLoading(true);
        console.log('Fetching Meta ads data with date range:', dateRange);
        
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('No authenticated session');
        }

        const response = await fetch('/api/meta-ads', {
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
        console.log('Meta ads data received:', result);
        setData(result);
      } catch (err) {
        console.error('Error fetching Meta ads data:', err);
        Sentry.captureException(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMetaAdsData();
  }, [dateRange]);

  return { data, loading, error };
}