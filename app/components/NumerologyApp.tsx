'use client';

import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';
import { calculateMulank, calculateDestinyNumber } from '@/app/lib/numerology';
import PersonalityTraitsData from '@/app/data/PersonalityTraitsData';
import ComboMulankDestiny from '@/app/data/ComboMulankDestiny';
import {
  insertIntoGrid,
  getMindPlaneQualities,
  getHeartPlaneQualities,
  getPracticalPlaneQualities,
  getVisionPlaneQualities,
  getWillPlaneQualities,
  getActionPlaneQualities,
} from '@/app/utils/LoShu';
import Image from 'next/image';

type Stage = 'landing' | 'input' | 'results';

interface PersonalityTraits {
  bornOnDates: number[];
  traits: string[];
  remedy: string;
  samePersonalities: any[];
}

export default function NumerologyApp() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [stage, setStage] = useState<Stage>('landing');
  const [birthDate, setBirthDate] = useState('');
  const [username, setUsername] = useState<string>('');
  const [results, setResults] = useState<{
    mulank: number;
    destinyNumber: number;
    day: number;
    personality: PersonalityTraits | undefined;
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      // Initialize the SDK
      const context = await sdk.context;

      // Get username from context
      if (context?.user?.username) {
        setUsername(context.user.username);
      }

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

      // Extract day from birth date
      const date = new Date(birthDate);
      const day = date.getDate();

      // Find personality traits based on day
      const personality = PersonalityTraitsData.find((p) =>
        p.bornOnDates.includes(day)
      );

      setResults({
        mulank,
        destinyNumber,
        day,
        personality,
      });
      setStage('results');
    } catch (error) {
      console.error('Error calculating numerology:', error);
    }
  };

  const handleReset = () => {
    setBirthDate('');
    setResults(null);
    setStage('landing');
  };

  if (!isSDKLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] overflow-hidden sacred-pattern">
        {/* Sacred geometry background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="absolute w-[400px] h-[400px] border border-[#d4af37]/15 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute w-[250px] h-[250px] border border-[#c0c0d8]/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute w-[100px] h-[100px] border border-[#d4af37]/10 rounded-full animate-pulse" style={{ animationDuration: '5s' }} />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Loading spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#d4af37] text-2xl">✦</span>
            </div>
          </div>

          <p className="text-[#d4af37] text-xl tracking-wider">
            Preparing Your Reading...
          </p>
        </div>
      </div>
    );
  }

  // Landing Page with Sign Circle
  if (stage === 'landing') {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#0a0a0f] overflow-hidden sacred-pattern">
        {/* Sacred geometry circles - gold accent */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[600px] h-[600px] border border-[#d4af37]/20 rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute w-[450px] h-[450px] border border-[#c0c0d8]/15 rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute w-[300px] h-[300px] border border-[#d4af37]/10 rounded-full animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute w-[150px] h-[150px] border border-[#c0c0d8]/10 rounded-full animate-pulse" style={{ animationDuration: '7s' }} />
        </div>

        {/* Mystical symbols scattered */}
        <div className="absolute top-16 left-16 text-[#d4af37]/40 text-3xl font-serif">✧</div>
        <div className="absolute top-32 right-24 text-[#c0c0d8]/30 text-4xl">☽</div>
        <div className="absolute bottom-24 left-32 text-[#d4af37]/35 text-3xl">✦</div>
        <div className="absolute bottom-16 right-16 text-[#c0c0d8]/40 text-3xl font-serif">✧</div>
        <div className="absolute top-1/3 left-12 text-[#8b5cf6]/25 text-2xl">◇</div>
        <div className="absolute top-2/3 right-20 text-[#d4af37]/30 text-2xl">◆</div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-12 px-4">
          <div className="relative">
            {/* Glow effect behind zodiac circle */}
            <div className="absolute inset-0 blur-3xl bg-[#d4af37]/20 rounded-full" />
            <Image
              src="/signcircle.png"
              alt="Zodiac Circle"
              width={320}
              height={320}
              className="relative drop-shadow-2xl animate-[spin_90s_linear_infinite] opacity-90"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-[#e8e8f0] text-2xl md:text-3xl font-serif font-bold text-center max-w-[280px] leading-tight drop-shadow-2xl">
                Secret Language of Your Birth Date
              </h1>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            <span className="text-[#d4af37] text-xl">✦</span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          </div>

          <button
            onClick={() => setStage('input')}
            className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(212,175,55,0.6)_0%,rgba(212,175,55,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-3 px-8 ring-1 ring-white/10">
              <span className="text-lg font-semibold text-[#d4af37]">
                Reveal Your Destiny
              </span>
              <svg
                fill="none"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#d4af37]"
              >
                <path
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/90 to-[#d4af37]/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>

          {/* Bottom ornament */}
          {username && (
            <p className="text-[#c0c0d8]/60 text-sm tracking-widest">
              @{username}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Input Page
  if (stage === 'input') {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#0a0a0f] overflow-hidden p-4 sacred-pattern">
        {/* Sacred geometry background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <div className="absolute w-[500px] h-[500px] border border-[#d4af37]/15 rounded-full" />
          <div className="absolute w-[350px] h-[350px] border border-[#c0c0d8]/10 rounded-full" />
          <div className="absolute w-[200px] h-[200px] border border-[#d4af37]/10 rounded-full" />
        </div>

        {/* Mystical symbols */}
        <div className="absolute top-20 left-20 text-[#d4af37]/30 text-3xl font-serif">✧</div>
        <div className="absolute top-40 right-32 text-[#c0c0d8]/25 text-4xl">☽</div>
        <div className="absolute bottom-32 left-40 text-[#d4af37]/30 text-3xl">✦</div>
        <div className="absolute bottom-20 right-24 text-[#c0c0d8]/35 text-3xl font-serif">✧</div>

        <div className="relative z-10 w-full max-w-md">
          {/* Card with elegant border */}
          <div className="relative bg-[#12121a]/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-[#d4af37]/30 glow-gold">
            {/* Top ornament */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-[#12121a] px-4 py-1 rounded-full border border-[#d4af37]/40">
                <span className="text-[#d4af37] text-xl">✦</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#d4af37]">
              Enter Your Birth Date
            </h2>

            <p className="text-center text-[#c0c0d8]/70 mb-8 text-sm tracking-wide">
              Discover the numbers that shape your destiny
            </p>

            <div className="space-y-6">
              <div>
                <label htmlFor="birthDate" className="block text-[#d4af37]/80 text-sm mb-2 tracking-wider uppercase">
                  Select Date
                </label>
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-6 py-4 bg-[#0a0a0f]/60 border border-[#d4af37]/30 rounded-xl focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all text-[#e8e8f0] text-lg placeholder-[#c0c0d8]/30 backdrop-blur"
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              <button
                onClick={handleCalculate}
                disabled={!birthDate}
                className="w-full bg-[#d4af37] hover:bg-[#f0d898] disabled:bg-[#d4af37]/30 disabled:opacity-50 text-[#0a0a0f] font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg text-lg tracking-wide glow-gold"
               
              >
                {birthDate ? 'Calculate Your Numbers' : 'Choose a Date'}
              </button>
            </div>

            {/* Decorative bottom element */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
              <span className="text-[#d4af37]/60 text-xs">✧</span>
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Page
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0a0a0f] overflow-hidden p-4 py-12 sacred-pattern">
      {/* Sacred geometry background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="absolute w-[600px] h-[600px] border border-[#d4af37]/15 rounded-full" />
        <div className="absolute w-[400px] h-[400px] border border-[#c0c0d8]/10 rounded-full" />
        <div className="absolute w-[200px] h-[200px] border border-[#d4af37]/10 rounded-full" />
      </div>

      {/* Mystical corner symbols */}
      <div className="absolute top-8 left-8 text-[#d4af37]/20 text-4xl font-serif">✧</div>
      <div className="absolute top-8 right-8 text-[#c0c0d8]/20 text-4xl font-serif">✧</div>
      <div className="absolute bottom-8 left-8 text-[#d4af37]/20 text-4xl">✦</div>
      <div className="absolute bottom-8 right-8 text-[#c0c0d8]/20 text-4xl">✦</div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="bg-[#12121a]/60 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10 border border-[#d4af37]/30 glow-gold">
          {/* Top ornamental divider */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            <span className="text-[#d4af37] text-2xl">✦</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-center mb-3 text-[#d4af37]">
            Your Numerology Reading
          </h1>
          <p className="text-center text-[#c0c0d8]/70 mb-8 text-base md:text-lg">
            Birth Date: <span className="text-[#d4af37] font-semibold">{birthDate}</span>
          </p>

          <div className="space-y-6">
            {/* Personality Traits Card */}
            {results?.personality && (
              <div className="relative bg-[#1a1a2e]/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-[#8b5cf6]/40 overflow-hidden">
                <div className="absolute top-0 left-0 w-40 h-40 bg-[#8b5cf6]/5 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-[#8b5cf6]/70 text-xs uppercase tracking-widest mb-1">Born on Day</p>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#8b5cf6]">Personality Traits</h2>
                    </div>
                    <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#8b5cf6] bg-[#8b5cf6]/10">
                      <span className="text-3xl md:text-4xl font-bold text-[#8b5cf6]">{results.day}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {results.personality.traits.map((trait, index) => (
                      <div key={index} className="flex items-start gap-3 text-[#e8e8f0]">
                        <span className="text-[#d4af37] mt-1 text-lg">✦</span>
                        <span className="text-sm md:text-base leading-relaxed">{trait}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#d4af37]/20">
                    <h3 className="text-lg font-semibold text-[#d4af37] mb-3 flex items-center gap-2">
                      <span>✧</span> Sacred Remedy
                    </h3>
                    <p className="text-[#c0c0d8]/80 text-sm md:text-base leading-relaxed">{results.personality.remedy}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Numeroscope Section */}
            {results && (() => {
              const displayGrid = insertIntoGrid(birthDate, results.mulank, results.destinyNumber);
              const mindPlaneQualities = getMindPlaneQualities(displayGrid);
              const heartPlaneQualities = getHeartPlaneQualities(displayGrid);
              const practicalPlaneQualities = getPracticalPlaneQualities(displayGrid);
              const visionPlaneQualities = getVisionPlaneQualities(displayGrid);
              const willPlaneQualities = getWillPlaneQualities(displayGrid);
              const actionPlaneQualities = getActionPlaneQualities(displayGrid);

              const planes = [
                { title: "Mind Plane Qualities", qualities: mindPlaneQualities, color: "cyan" },
                { title: "Heart Plane Qualities", qualities: heartPlaneQualities, color: "emerald" },
                { title: "Practical Plane Qualities", qualities: practicalPlaneQualities, color: "amber" },
                { title: "Vision Plane Qualities", qualities: visionPlaneQualities, color: "violet" },
                { title: "Will Plane Qualities", qualities: willPlaneQualities, color: "rose" },
                { title: "Action Plane Qualities", qualities: actionPlaneQualities, color: "blue" },
              ];

              return (
                <div className="space-y-6">
                  <div className="relative bg-[#1a1a2e]/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-[#d4af37]/40 overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/5 rounded-full blur-3xl" />
                    <div className="relative">
                      {/* Section header */}
                      <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-3">
                          <span className="text-[#d4af37] text-xl">✧</span>
                          <h2 className="text-2xl md:text-3xl font-bold text-[#d4af37]">
                            Lo Shu Grid Analysis
                          </h2>
                          <span className="text-[#d4af37] text-xl">✧</span>
                        </div>
                        <p className="text-[#c0c0d8]/60 text-sm tracking-wide">Ancient Chinese Numerology System</p>
                      </div>

                      {/* Lo Shu Grid */}
                      <div className="flex justify-center mb-8">
                        <div className="inline-block bg-[#0a0a0f]/60 p-4 rounded-xl border border-[#d4af37]/40 glow-gold">
                          {displayGrid.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex">
                              {row.map((cell, colIndex) => (
                                <div
                                  key={colIndex}
                                  className="border border-[#d4af37]/40 w-14 h-14 md:w-20 md:h-20 flex items-center justify-center text-[#d4af37] bg-[#12121a]/50 text-2xl md:text-3xl font-bold"

                                >
                                  {cell ?? ""}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Plane Qualities */}
                  {planes.map((plane, idx) => {
                    const colorMap: { [key: string]: { border: string; accent: string; glow: string } } = {
                      cyan: { border: '#67e8f9', accent: '#06b6d4', glow: 'rgba(6, 182, 212, 0.15)' },
                      emerald: { border: '#6ee7b7', accent: '#10b981', glow: 'rgba(16, 185, 129, 0.15)' },
                      amber: { border: '#fcd34d', accent: '#f59e0b', glow: 'rgba(245, 158, 11, 0.15)' },
                      violet: { border: '#c4b5fd', accent: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.15)' },
                      rose: { border: '#fda4af', accent: '#f43f5e', glow: 'rgba(244, 63, 94, 0.15)' },
                      blue: { border: '#93c5fd', accent: '#3b82f6', glow: 'rgba(59, 130, 246, 0.15)' },
                    };

                    const colors = colorMap[plane.color] || colorMap.violet;

                    return (
                      <div
                        key={idx}
                        className="relative bg-[#1a1a2e]/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border overflow-hidden"
                        style={{ borderColor: `${colors.border}40` }}
                      >
                        <div className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl" style={{ backgroundColor: colors.glow }} />
                        <div className="relative">
                          <h3 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2" style={{ color: colors.border }}>
                            <span>✦</span> {plane.title}
                          </h3>
                          <div className="space-y-3">
                            {plane.qualities.map((quality, qIdx) => (
                              <div key={qIdx} className="flex items-start gap-3 text-[#e8e8f0]">
                                <span className="mt-1 text-base" style={{ color: colors.accent }}>✧</span>
                                <span className="text-sm md:text-base leading-relaxed">{quality}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {/* Luck and Remark Card - At the End */}
            {results && (() => {
              const combo = ComboMulankDestiny.find(
                (entry) => entry.mulank === results.mulank && entry.destiny === results.destinyNumber
              );

              if (combo) {
                return (
                  <div className="relative mt-8 bg-[#1a1a2e]/90 rounded-3xl p-10 md:p-12 border-2 border-[#d4af37]/40 backdrop-blur-xl overflow-hidden glow-gold">
                    {/* Top decorative line */}
                    <div className="absolute inset-x-0 top-0 flex justify-center">
                      <div className="w-2/3 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                    </div>

                    {/* Ornamental corners */}
                    <div className="absolute top-4 left-4 text-[#d4af37]/40 text-2xl">✧</div>
                    <div className="absolute top-4 right-4 text-[#d4af37]/40 text-2xl">✧</div>
                    <div className="absolute bottom-4 left-4 text-[#d4af37]/40 text-2xl">✦</div>
                    <div className="absolute bottom-4 right-4 text-[#d4af37]/40 text-2xl">✦</div>

                    {/* Glow effects */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl" />

                    <div className="relative z-10 text-center">
                      <p className="text-[#c0c0d8]/60 text-sm uppercase tracking-widest mb-4">
                        Your Destiny Path
                      </p>

                      <div className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                        <span className="text-[#d4af37]">
                          {combo.luck}
                        </span>
                        <span className="text-[#e8e8f0] mx-3">Luck</span>
                      </div>

                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                        <span className="text-[#d4af37] text-xl">✦</span>
                        <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                      </div>

                      <div className="text-xl md:text-3xl lg:text-4xl font-semibold text-[#c0c0d8]">
                        in <span className="text-[#d4af37]">{combo.remark}</span>
                      </div>
                    </div>

                    {/* Mystical sparkles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(15)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-[#d4af37] rounded-full animate-pulse"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </div>

          {/* Calculate Again Button */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-[#d4af37]/30" />
            <button
              onClick={handleReset}
              className="px-10 py-4 bg-[#0a0a0f]/80 hover:bg-[#d4af37]/10 border-2 border-[#d4af37]/40 hover:border-[#d4af37] text-[#d4af37] hover:text-[#f0d898] font-semibold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg text-base tracking-wide"
             
            >
              Calculate Again
            </button>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#d4af37]/30 to-[#d4af37]/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
