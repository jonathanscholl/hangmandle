'use client'

import { useState, useEffect } from "react";
import { getRandomWord } from "../words";
import Link from "next/link";
import HangmanSVG from "../components/HangmanSVG";
import ThemeToggle from "../components/ThemeToggle";

export default function UnlimitedHangman() {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const startNewGame = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setGameWon(false);
  };

  useEffect(() => {
    // Initialize the game with a random word
    startNewGame();
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
      }
    }
  }, [guessedLetters, word, gameOver]);

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter) && !gameOver) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!word.includes(letter)) {
        setWrongGuesses(wrongGuesses + 1);
      }
    }
  };

  // Show game status message
  const getStatusMessage = () => {
    if (!gameOver) return null;
    if (gameWon) return "Congratulations! You won!";
    return "Game Over! The word was: " + word;
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Hangmandle Unlimited</h1>
        <Link href="/" className="btn btn-sm btn-outline">
          Daily Mode
        </Link>
        <ThemeToggle />
      </div>
      
      {/* Hangman SVG */}
      <div className="flex flex-col items-center gap-2">
        <HangmanSVG wrongGuesses={wrongGuesses} />
        <span className="text-lg sm:text-xl">Wrong: {wrongGuesses}</span>
      </div>
      
      {/* Word display */}
      <div className="text-xl sm:text-2xl font-mono">
        {word.split("").map((letter, index) => (
          <span key={index} className="mx-0.5 sm:mx-1 border-b-2 w-4 sm:w-6 inline-block text-center">
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
            className={`btn btn-sm sm:btn-md btn-outline ${guessedLetters.includes(letter) ? (word.includes(letter) ? "btn-success" : "btn-error") : "btn-primary"} ${guessedLetters.includes(letter) || gameOver ? "pointer-events-none opacity-50" : ""}`}
            onClick={() => handleGuess(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      
      {/* New Game button */}
      <button className="btn btn-primary btn-sm sm:btn-md mt-4" onClick={startNewGame}>New Game</button>
    </div>
  );
} 