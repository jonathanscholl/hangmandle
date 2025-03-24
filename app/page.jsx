'use client'

import { useState } from "react";

export default function Hangman() {
  const [word, setWord] = useState("HANGMAN");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  const handleGuess = (letter) => {
    if (word.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    } else {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const resetGame = () => {
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-3xl font-bold">Hangman</h1>
      
      {/* Hangman figure placeholder */}
      <div className="w-32 h-32 flex items-center justify-center border border-dashed">
        <span className="text-xl">{wrongGuesses} / 6</span>
      </div>
      
      {/* Word display */}
      <div className="text-2xl font-mono">
        {word.split("").map((letter, index) => (
          <span key={index} className="mx-1 border-b-2 w-6 inline-block text-center">
            {guessedLetters.includes(letter) ? letter : "_"}
          </span>
        ))}
      </div>
      
      {/* Letter buttons */}
      <div className="grid grid-cols-7 gap-2">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <button
            key={letter}
            className="btn btn-second btn-outline"
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      
      {/* Reset button */}
      <button className="btn btn-primary mt-4" onClick={resetGame}>Reset</button>
    </div>
  );
}
