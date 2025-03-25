'use client'

import { useState, useEffect } from "react";
import { getDailyWord } from "./words";
import Link from "next/link";
import HangmanSVG from "./components/HangmanSVG";
import ThemeToggle from "./components/ThemeToggle";
import StatsModal from "./components/StatsModal";

export default function Hangman() {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [hasPlayedToday, setHasPlayedToday] = useState(false);
  const [isViewingCompleted, setIsViewingCompleted] = useState(false);

  useEffect(() => {
    // Initialize the game with today's word
    const todayWord = getDailyWord();
    setWord(todayWord);

    // Check if user has already played today
    const savedStats = localStorage.getItem('hangmanStats');
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      const today = new Date().toISOString().split('T')[0];
      if (stats.lastPlayed === today) {
        setHasPlayedToday(true);
        setGameOver(true);
        setShowStats(true);
        // If they won, show the word and wrong guesses
        if (stats.gamesWon > 0) {
          setGuessedLetters(todayWord.split(''));
          setGameWon(true);
          setWrongGuesses(stats.lastWrongGuesses || 0);
          // Add wrong letters to guessedLetters to show them in red
          const wrongLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            .split('')
            .filter(letter => !todayWord.includes(letter))
            .slice(0, stats.lastWrongGuesses || 0);
          setGuessedLetters([...todayWord.split(''), ...wrongLetters]);
        } else {
          // If they lost, show the word and all wrong guesses
          setGuessedLetters(todayWord.split(''));
          setWrongGuesses(6);
          // Add wrong letters to guessedLetters to show them in red
          const wrongLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            .split('')
            .filter(letter => !todayWord.includes(letter))
            .slice(0, 6);
          setGuessedLetters([...todayWord.split(''), ...wrongLetters]);
        }
        setIsViewingCompleted(true);
      }
    }
  }, []);

  // Check for win condition whenever guessedLetters changes
  useEffect(() => {
    if (!gameOver && word) {
      const allGuessed = word.split('').every(letter => 
        guessedLetters.includes(letter)
      );
      if (allGuessed) {
        setGameWon(true);
        setGameOver(true);
        setShowStats(true);
      }
    }
  }, [guessedLetters, word, gameOver]);

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter) && !gameOver && !hasPlayedToday) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!word.includes(letter)) {
        setWrongGuesses(wrongGuesses + 1);
        if (wrongGuesses + 1 >= 6) {
          setGameOver(true);
          setShowStats(true);
        }
      }
    }
  };

  const resetGame = () => {
    if (!hasPlayedToday) {
      setGuessedLetters([]);
      setWrongGuesses(0);
      setGameOver(false);
      setGameWon(false);
      setShowStats(false);
    }
  };

  // Show game status message
  const getStatusMessage = () => {
    if (!gameOver) return null;
    if (hasPlayedToday) {
      if (gameWon) {
        return `Congratulations! You won today's game with ${wrongGuesses} wrong guesses!`;
      } else {
        return "Game Over! You lost today's game.";
      }
    }
    if (gameWon) return "Congratulations! You won!";
    return "Game Over! The word was: " + word;
  };

  // Get the wrong letters that were guessed
  const getWrongLetters = () => {
    return guessedLetters.filter(letter => !word.includes(letter));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Hangmandle</h1>
        <Link href="/unlimited" className="btn btn-sm btn-outline">
          Unlimited Mode
        </Link>
        <ThemeToggle />
      </div>
      
      {/* Hangman SVG */}
      <div className="flex flex-col items-center gap-2">
        <HangmanSVG wrongGuesses={wrongGuesses} />
        <span className="text-lg sm:text-xl">{wrongGuesses} / 6</span>
      </div>
      
      {/* Word display */}
      <div className="text-xl sm:text-2xl font-mono">
        {word.split("").map((letter, index) => (
          <span 
            key={index} 
            className={`mx-0.5 sm:mx-1 border-b-2 w-4 sm:w-6 inline-block text-center ${
              isViewingCompleted && guessedLetters.includes(letter) && !word.includes(letter) ? 'text-error' : ''
            }`}
          >
            {guessedLetters.includes(letter) ? letter : "_"}
          </span>
        ))}
      </div>

      {/* Status message */}
      {getStatusMessage() && (
        <div className={`text-lg font-semibold ${gameWon ? 'text-success' : 'text-error'}`}>
          {getStatusMessage()}
        </div>
      )}
      
      {/* Letter buttons */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-5 pt-4 sm:pt-10">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("" ).map((letter) => (
          <button
            key={letter}
            className={`btn btn-sm sm:btn-md btn-outline ${guessedLetters.includes(letter) ? (word.includes(letter) ? "btn-success" : "btn-error") : "btn-primary"} ${guessedLetters.includes(letter) || gameOver || hasPlayedToday ? "pointer-events-none opacity-50" : ""}`}
            onClick={() => handleGuess(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      
      {/* Reset button */}
      {!isViewingCompleted && (
        <button 
          className="btn btn-primary btn-sm sm:btn-md mt-4" 
          onClick={resetGame}
          disabled={hasPlayedToday}
        >
          Reset
        </button>
      )}

      {/* Stats Modal */}
      <StatsModal 
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        gameWon={gameWon}
        word={word}
        wrongGuesses={wrongGuesses}
      />
    </div>
  );
}
