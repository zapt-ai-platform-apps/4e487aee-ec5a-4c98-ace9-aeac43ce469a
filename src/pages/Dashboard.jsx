import React, { useState } from 'react';
import { format, subDays } from 'date-fns';
import useMetaAds from '../hooks/useMetaAds';
import useTiktokAds from '../hooks/useTiktokAds';
import useAppEvents from '../hooks/useAppEvents';
import useFunnelData from '../hooks/useFunnelData';
import FunnelVisual from '../modules/funnel/FunnelVisual';
import FunnelChart from '../modules/funnel/FunnelChart';
import MetaAdsTable from '../modules/ads/MetaAdsTable';
import TiktokAdsTable from '../modules/ads/TiktokAdsTable';
import AppEventsTable from '../modules/events/AppEventsTable';
import DateRangePicker from '../components/DateRangePicker';

export default function Dashboard() {
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 30),
    endDate: new Date(),
  });

  const metaAdsData = useMetaAds(dateRange);
  const tiktokAdsData = useTiktokAds(dateRange);
  const appEventsData = useAppEvents(dateRange);
  const funnelData = useFunnelData(metaAdsData, tiktokAdsData, appEventsData);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Marketing Funnel Dashboard</h1>
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1">
          <FunnelVisual 
            funnelData={funnelData.data} 
            loading={funnelData.loading}
            error={funnelData.error}
          />
        </div>
        <div className="lg:col-span-1">
          <FunnelChart 
            funnelData={funnelData.data}
            loading={funnelData.loading}
            error={funnelData.error}
          />
        </div>
      </div>

      <div className="space-y-6">
        <MetaAdsTable 
          adsData={metaAdsData.data} 
          loading={metaAdsData.loading}
          error={metaAdsData.error}
        />
        
        <TiktokAdsTable 
          adsData={tiktokAdsData.data} 
          loading={tiktokAdsData.loading}
          error={tiktokAdsData.error}
        />
        
        <AppEventsTable 
          eventsData={appEventsData.data} 
          loading={appEventsData.loading}
          error={appEventsData.error}
        />
      </div>
    </div>
  );
}