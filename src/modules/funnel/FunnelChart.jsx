import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import * as Sentry from '@sentry/browser';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function FunnelChart({ funnelData }) {
  // Ensure we have data to display
  if (!funnelData || !funnelData.length) {
    return (
      <div className="h-64 flex items-center justify-center bg-white rounded-lg shadow p-4">
        <p className="text-gray-500">No funnel data available. Connect your data sources in Settings.</p>
      </div>
    );
  }

  try {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Marketing Funnel Conversion',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.formattedValue}`;
            },
            afterLabel: function(context) {
              // Add conversion rate if available
              const stage = funnelData[context.dataIndex];
              if (stage.conversionRate) {
                return `Conversion Rate: ${stage.conversionRate}%`;
              }
              return '';
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Count',
          },
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
    };

    const labels = funnelData.map(stage => stage.name);
    
    const data = {
      labels,
      datasets: [
        {
          label: 'Users',
          data: funnelData.map(stage => stage.count),
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
            'rgb(255, 99, 132)',
          ],
        },
      ],
    };

    return (
      <div className="h-80 bg-white rounded-lg shadow p-4">
        <Bar options={options} data={data} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering funnel chart:', error);
    Sentry.captureException(error);
    
    return (
      <div className="h-64 flex items-center justify-center bg-white rounded-lg shadow p-4">
        <p className="text-red-500">Error rendering funnel chart. Please try again later.</p>
      </div>
    );
  }
}