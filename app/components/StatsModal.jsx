'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function StatsModal({ isOpen, onClose, gameWon, word, wrongGuesses }) {
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    lastPlayed: null,
    lastWrongGuesses: 0,
  });



  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem('hangmanStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  useEffect(() => {
    if (isOpen && gameWon !== undefined) {
      // Update stats when game is over
      const today = new Date().toISOString().split('T')[0];
      const newStats = { ...stats };
      
      // Only update if this is a new game (not viewing a completed game)
      if (stats.lastPlayed !== today) {
        newStats.gamesPlayed += 1;
        newStats.lastPlayed = today;
        newStats.lastWrongGuesses = wrongGuesses;

        if (gameWon) {
          newStats.gamesWon += 1;
          newStats.currentStreak += 1;
          newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
        } else {
          newStats.currentStreak = 0;
        }

        setStats(newStats);
        localStorage.setItem('hangmanStats', JSON.stringify(newStats));
      }
    }
  }, [isOpen, gameWon, word, wrongGuesses]);

  if (!isOpen) return null;

  const winRate = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  const getPerformanceRating = (wrongGuesses) => {
    if (wrongGuesses <= 1) return { text: "Amazing!", color: "text-success" };
    if (wrongGuesses <= 4) return { text: "Good!", color: "text-warning" };
    if (wrongGuesses <= 5) return { text: "Barely!", color: "text-error" };

    return { text: "You lost!", color: "text-error" };
  };

  const performance = getPerformanceRating(wrongGuesses);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Game Statistics</h2>
          <button 
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.gamesPlayed}</div>
              <div className="text-sm opacity-70">Games Played</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{winRate}%</div>
              <div className="text-sm opacity-70">Win Rate</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.currentStreak}</div>
              <div className="text-sm opacity-70">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.maxStreak}</div>
              <div className="text-sm opacity-70">Max Streak</div>
            </div>
          </div>

          {gameWon !== undefined && (
            <div className="text-center">
              <div className={`text-2xl font-bold ${performance.color}`}>
                {performance.text}
              </div>
              <div className="text-sm opacity-70">
                {wrongGuesses} wrong {wrongGuesses === 1 ? 'guess' : 'guesses'}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button 
            onClick={() => {
                onClose();

            }}
                
            className="btn btn-primary"
          >
            View Daily Game
          </button>
          <Link 
            href="/unlimited"
            className="btn btn-outline"
          >
            Play Unlimited
          </Link>
        </div>
      </div>
    </div>
  );
} 