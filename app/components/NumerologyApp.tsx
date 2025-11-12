'use client';

import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';
import { calculateMulank, calculateDestinyNumber, getNumerologyInsights } from '@/app/lib/numerology';

export default function NumerologyApp() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<any>(null);
  const [birthDate, setBirthDate] = useState('');
  const [results, setResults] = useState<{
    mulank: number;
    destinyNumber: number;
    mulankInsights: any;
    destinyInsights: any;
  } | null>(null);

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

  const handleCalculate = () => {
    if (!birthDate) return;

    try {
      const mulank = calculateMulank(birthDate);
      const destinyNumber = calculateDestinyNumber(birthDate);
      const mulankInsights = getNumerologyInsights(mulank);
      const destinyInsights = getNumerologyInsights(destinyNumber);

      setResults({
        mulank,
        destinyNumber,
        mulankInsights,
        destinyInsights,
      });
    } catch (error) {
      console.error('Error calculating numerology:', error);
    }
  };

  const handleReset = () => {
    setBirthDate('');
    setResults(null);
  };

  if (!isSDKLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 p-4">
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Numerology Calculator
        </h1>
        <p className="text-center text-gray-600 mb-8">Discover your cosmic numbers</p>

        {!results ? (
          <div className="space-y-6">
            <div>
              <label htmlFor="birthDate" className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Your Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-gray-800"
              />
            </div>

            {context && (
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 text-sm border border-purple-100">
                <p className="font-semibold text-purple-900 mb-2">👋 Welcome!</p>
                <p className="text-gray-700">Username: @{context.user?.username || 'Unknown'}</p>
              </div>
            )}

            <button
              onClick={handleCalculate}
              disabled={!birthDate}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              Calculate My Numbers
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-gray-600">Birth Date: <span className="font-semibold text-purple-900">{birthDate}</span></p>
            </div>

            <div className="space-y-4">
              {/* Mulank Card */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-bold text-purple-900">Mulank (Root Number)</h2>
                  <span className="text-4xl font-bold text-purple-600">{results.mulank}</span>
                </div>
                <h3 className="text-xl font-semibold text-purple-800 mb-2">
                  {results.mulankInsights.title}
                </h3>
                <p className="text-gray-700">{results.mulankInsights.desc}</p>
              </div>

              {/* Destiny Number Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border-2 border-indigo-200">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-bold text-indigo-900">Destiny Number</h2>
                  <span className="text-4xl font-bold text-indigo-600">{results.destinyNumber}</span>
                </div>
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                  {results.destinyInsights.title}
                </h3>
                <p className="text-gray-700">{results.destinyInsights.desc}</p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Calculate Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
