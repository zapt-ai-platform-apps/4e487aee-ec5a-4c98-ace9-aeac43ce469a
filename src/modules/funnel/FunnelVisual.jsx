import React from 'react';
import * as Sentry from '@sentry/browser';

export default function FunnelVisual({ funnelData }) {
  // Ensure we have data to display
  if (!funnelData || !funnelData.length) {
    return (
      <div className="h-64 flex items-center justify-center bg-white rounded-lg shadow p-4">
        <p className="text-gray-500">No funnel data available. Connect your data sources in Settings.</p>
      </div>
    );
  }

  try {
    // Calculate widths based on the first stage (awareness)
    const maxCount = funnelData[0]?.count || 0;
    const getWidth = (count) => {
      if (!maxCount) return '10%'; // Minimum width if no data
      const percentage = Math.max((count / maxCount) * 100, 10); // At least 10% width
      return `${percentage}%`;
    };

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Marketing Funnel</h3>
        
        <div className="funnel-container">
          {funnelData.map((stage, index) => (
            <React.Fragment key={stage.name}>
              <div 
                className="funnel-section" 
                style={{ 
                  width: getWidth(stage.count),
                  margin: '0 auto',
                  backgroundColor: index === 0 ? '#4f46e5' : index === 1 ? '#4338ca' : index === 2 ? '#3730a3' : index === 3 ? '#312e81' : '#1e1b4b',
                }}
              >
                <h3>{stage.name}</h3>
                <p>{stage.count.toLocaleString()}</p>
                {index > 0 && (
                  <span className="percentage">
                    {stage.conversionRate}% from {funnelData[index-1].name}
                  </span>
                )}
              </div>
              
              {index < funnelData.length - 1 && (
                <div className="funnel-connector"></div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>This funnel shows the journey from ad impressions to final conversions.</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering funnel visual:', error);
    Sentry.captureException(error);
    
    return (
      <div className="h-64 flex items-center justify-center bg-white rounded-lg shadow p-4">
        <p className="text-red-500">Error rendering funnel visualization. Please try again later.</p>
      </div>
    );
  }
}