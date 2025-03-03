# Marketing Funnel Analytics

A comprehensive application that integrates advertising data from Meta (Facebook) and TikTok, combined with organic social data and app event data to create a funnel-based visualization of campaign impact.

## Features

- Unified dashboard with marketing funnel visualization
- Integration with Meta Ads API
- Integration with TikTok Ads API
- App event tracking integration
- User authentication
- Date range filtering
- Campaign performance metrics
- Funnel conversion tracking

## Technical Stack

- React with Vite
- Tailwind CSS for styling
- Supabase for authentication
- CockroachDB with Drizzle ORM
- Vercel serverless functions for API endpoints
- Chart.js for data visualization

## Development

To run the application locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Environment Variables

The following environment variables are required:

- `VITE_PUBLIC_APP_ID`: Application ID
- `VITE_PUBLIC_APP_ENV`: Application environment (development/production)
- `VITE_PUBLIC_SENTRY_DSN`: Sentry DSN for error tracking
- `VITE_PUBLIC_UMAMI_WEBSITE_ID`: Umami analytics ID
- `COCKROACH_DB_URL`: CockroachDB connection string
- `META_API_TOKEN`: Meta API access token
- `TIKTOK_ACCESS_TOKEN`: TikTok API access token
- `TIKTOK_APP_ID`: TikTok application ID
- `TIKTOK_SECRET`: TikTok application secret

## Building for Production

```bash
npm run build
```

## Deployment

This application is configured for deployment on Vercel.