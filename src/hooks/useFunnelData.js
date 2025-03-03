import { useState, useEffect, useMemo } from 'react';
import * as Sentry from '@sentry/browser';

export default function useFunnelData(metaAdsData, tiktokAdsData, appEventsData) {
  const [funnelData, setFunnelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoading = useMemo(() => {
    return metaAdsData.loading || tiktokAdsData.loading || appEventsData.loading;
  }, [metaAdsData.loading, tiktokAdsData.loading, appEventsData.loading]);

  const hasError = useMemo(() => {
    return metaAdsData.error || tiktokAdsData.error || appEventsData.error;
  }, [metaAdsData.error, tiktokAdsData.error, appEventsData.error]);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      return;
    }

    if (hasError) {
      setError(new Error('Failed to fetch data for funnel visualization'));
      setLoading(false);
      return;
    }

    try {
      console.log('Calculating funnel data...');

      // Calculate total impressions (awareness)
      const metaImpressions = metaAdsData.data.reduce((sum, campaign) => sum + campaign.impressions, 0);
      const tiktokImpressions = tiktokAdsData.data.reduce((sum, campaign) => sum + campaign.impressions, 0);
      const totalImpressions = metaImpressions + tiktokImpressions;

      // Calculate total clicks (interest)
      const metaClicks = metaAdsData.data.reduce((sum, campaign) => sum + campaign.clicks, 0);
      const tiktokClicks = tiktokAdsData.data.reduce((sum, campaign) => sum + campaign.clicks, 0);
      const totalClicks = metaClicks + tiktokClicks;

      // Find app opens and sign-ups from app events (desire and action)
      const appOpens = appEventsData.data.find(event => event.name === 'app_open')?.count || 0;
      const signUps = appEventsData.data.find(event => event.name === 'sign_up')?.count || 0;
      const purchases = appEventsData.data.find(event => event.name === 'purchase')?.count || 0;

      // Create funnel data with conversion rates
      const funnel = [
        {
          name: 'Awareness',
          count: totalImpressions,
          conversionRate: 100 // First stage has no prior stage to convert from
        },
        {
          name: 'Interest',
          count: totalClicks,
          conversionRate: totalImpressions > 0 
            ? ((totalClicks / totalImpressions) * 100).toFixed(2) 
            : 0
        },
        {
          name: 'Desire',
          count: appOpens,
          conversionRate: totalClicks > 0 
            ? ((appOpens / totalClicks) * 100).toFixed(2) 
            : 0
        },
        {
          name: 'Action',
          count: signUps,
          conversionRate: appOpens > 0 
            ? ((signUps / appOpens) * 100).toFixed(2) 
            : 0
        },
        {
          name: 'Conversion',
          count: purchases,
          conversionRate: signUps > 0 
            ? ((purchases / signUps) * 100).toFixed(2) 
            : 0
        }
      ];

      console.log('Funnel data calculated:', funnel);
      setFunnelData(funnel);
      setLoading(false);
    } catch (err) {
      console.error('Error calculating funnel data:', err);
      Sentry.captureException(err);
      setError(err);
      setLoading(false);
    }
  }, [
    isLoading, 
    hasError, 
    metaAdsData.data, 
    tiktokAdsData.data, 
    appEventsData.data
  ]);

  return { data: funnelData, loading, error };
}