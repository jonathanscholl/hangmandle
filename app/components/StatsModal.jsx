'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StatsModal({ isOpen, onClose, gameWon, word }) {
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    lastPlayed: null,
  });

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem('hangmanStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Update stats when game is over
      const today = new Date().toISOString().split('T')[0];
      const newStats = { ...stats };
      
      // Check if we've already played today
      if (stats.lastPlayed !== today) {
        newStats.gamesPlayed += 1;
        if (gameWon) {
          newStats.gamesWon += 1;
          newStats.currentStreak += 1;
          newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
        } else {
          newStats.currentStreak = 0;
        }
        newStats.lastPlayed = today;
        
        // Save to localStorage
        localStorage.setItem('hangmanStats', JSON.stringify(newStats));
        setStats(newStats);
      }
    }
  }, [isOpen, gameWon]);

  if (!isOpen) return null;

  const winRate = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Statistics</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.gamesPlayed}</div>
            <div className="text-sm opacity-70">Played</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{winRate}%</div>
            <div className="text-sm opacity-70">Win Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.currentStreak}</div>
            <div className="text-sm opacity-70">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.maxStreak}</div>
            <div className="text-sm opacity-70">Max Streak</div>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="text-lg font-semibold mb-2">
            {stats.lastPlayed === new Date().toISOString().split('T')[0] && stats.gamesWon > 0 ? "Congratulations!" : "Better luck next time!"}
          </div>
          <div className="text-sm opacity-70">
            {stats.lastPlayed === new Date().toISOString().split('T')[0] && stats.gamesWon > 0 ? "You won!" : `The word was: ${word}`}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button 
            onClick={() => {
              onClose();
            }}
            className="btn btn-outline w-full"
          >
            View Daily Game
          </button>
          <Link 
            href="/unlimited"
            className="btn btn-primary w-full"
          >
            Unlimited Hangmandle
          </Link>
        </div>
      </div>
    </div>
  );
} 