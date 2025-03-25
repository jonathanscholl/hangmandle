export default function HangmanSVG({ wrongGuesses }) {
  // Base elements that are always shown
  const baseElements = (
    <>
      {/* Base */}
      <line x1="20" y1="280" x2="280" y2="280" stroke="currentColor" strokeWidth="4" />
      {/* Vertical pole */}
      <line x1="100" y1="280" x2="100" y2="40" stroke="currentColor" strokeWidth="4" />
      {/* Top bar */}
      <line x1="100" y1="40" x2="200" y2="40" stroke="currentColor" strokeWidth="4" />
      {/* Rope */}
      <line x1="200" y1="40" x2="200" y2="80" stroke="currentColor" strokeWidth="4" />
    </>
  );

  // Elements that appear based on wrong guesses
  const elements = [
    // Head
    <circle key="head" cx="200" cy="100" r="20" stroke="currentColor" strokeWidth="4" fill="none" />,
    // Body
    <line key="body" x1="200" y1="120" x2="200" y2="200" stroke="currentColor" strokeWidth="4" />,
    // Left arm
    <line key="left-arm" x1="200" y1="140" x2="160" y2="180" stroke="currentColor" strokeWidth="4" />,
    // Right arm
    <line key="right-arm" x1="200" y1="140" x2="240" y2="180" stroke="currentColor" strokeWidth="4" />,
    // Left leg
    <line key="left-leg" x1="200" y1="200" x2="160" y2="260" stroke="currentColor" strokeWidth="4" />,
    // Right leg
    <line key="right-leg" x1="200" y1="200" x2="240" y2="260" stroke="currentColor" strokeWidth="4" />
  ];

  return (
    <svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      className="w-48 h-48 sm:w-64 sm:h-64"
    >
      {baseElements}
      {elements.slice(0, wrongGuesses)}
    </svg>
  );
} 