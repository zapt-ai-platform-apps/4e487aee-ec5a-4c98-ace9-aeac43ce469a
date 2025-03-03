import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export default function useAppEvents(dateRange) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAppEventsData() {
      try {
        setLoading(true);
        console.log('Fetching app events data with date range:', dateRange);
        
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('No authenticated session');
        }

        const response = await fetch('/api/app-events', {
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
        console.log('App events data received:', result);
        setData(result);
      } catch (err) {
        console.error('Error fetching app events data:', err);
        Sentry.captureException(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAppEventsData();
  }, [dateRange]);

  return { data, loading, error };
}