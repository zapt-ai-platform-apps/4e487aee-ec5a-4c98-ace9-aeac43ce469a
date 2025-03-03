import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <img
        src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=128&height=128"
        alt="Logo"
        className="h-24 w-24 mb-6"
      />
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page not found</p>
      <Link
        to="/"
        className="btn-primary cursor-pointer"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}