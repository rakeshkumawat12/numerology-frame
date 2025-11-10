'use client';

import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';

export default function NumerologyApp() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      // Initialize the SDK
      const context = await sdk.context;
      setContext(context);

      // Signal to Farcaster that the app is ready
      sdk.actions.ready();
      setIsSDKLoaded(true);
    };

    if (sdk) {
      load();
    }
  }, []);

  if (!isSDKLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-900">
          Numerology Frame
        </h1>

        <div className="space-y-4">
          <p className="text-center text-gray-700">
            Welcome! This is your numerology mini app.
          </p>

          {context && (
            <div className="bg-purple-50 rounded-lg p-4 text-sm">
              <p className="font-semibold text-purple-900 mb-2">User Info:</p>
              <p className="text-gray-700">FID: {context.user?.fid}</p>
              <p className="text-gray-700">Username: {context.user?.username || 'Unknown'}</p>
            </div>
          )}

          <button
            onClick={() => {
              sdk.actions.openUrl('https://warpcast.com');
            }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Learn More on Warpcast
          </button>
        </div>
      </div>
    </div>
  );
}
