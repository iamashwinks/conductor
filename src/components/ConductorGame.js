import React, { useState, useEffect } from 'react';

const topicThemes = {
  clean: [
    'Minimalism',
    'Sustainability',
    'Wellness',
    'Clarity of Mind',
    'Simplicity',
    'Eco-friendly Living'
  ],
  business: [
    'Leadership',
    'Innovation',
    'Strategic Planning',
    'Entrepreneurship',
    'Team Dynamics',
    'Professional Growth'
  ],
  fun: [
    'Creativity',
    'Humor and Laughter',
    'Adventure',
    'Playfulness',
    'Imagination',
    'Joy of Living'
  ],
  kids: [
    'Curiosity',
    'Learning',
    'Friendship',
    'Imagination',
    'Kindness',
    'Exploration'
  ],
  debates: [
    'Critical Thinking',
    'Perspective Sharing',
    'Ethical Dilemmas',
    'Social Issues',
    'Problem Solving',
    'Constructive Dialogue'
  ]
};

const generateBackgroundGradient = (number) => {
  const r = Math.round(number * 25.5);
  const g = Math.round((10 - number) * 25.5);
  return `linear-gradient(to right, rgba(0, ${g}, 0, 0.2), rgba(${r}, 0, 0, 0.2))`;
};

const ConductorGame = () => {
  const [gameState, setGameState] = useState('setup');
  const [difficulty, setDifficulty] = useState('medium');
  const [timePeriod, setTimePeriod] = useState(1);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [countdown, setCountdown] = useState(3);
  const [targetNumber, setTargetNumber] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [topic, setTopic] = useState('');
  const [changeInterval, setChangeInterval] = useState(5);
  const [backgroundStyle, setBackgroundStyle] = useState('');

  const generateTargetNumber = () => {
    const number = Math.floor(Math.random() * 11);
    setBackgroundStyle(generateBackgroundGradient(number));
    return number;
  };

  const selectTopics = () => {
    const availableTopics = selectedThemes.length > 0 
      ? selectedThemes.flatMap(theme => topicThemes[theme])
      : Object.values(topicThemes).flat();
    return availableTopics[Math.floor(Math.random() * availableTopics.length)];
  };

  const startGame = () => {
    switch(difficulty) {
      case 'easy':
        setChangeInterval(10);
        break;
      case 'medium':
        setChangeInterval(5);
        break;
      case 'hard':
        setChangeInterval(3);
        break;
    }

    setTimeRemaining(timePeriod * 60);
    const randomTopic = selectTopics();
    setTopic(randomTopic);
    setGameState('countdown');
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          startPlaying();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startPlaying = () => {
    setGameState('playing');
    setTargetNumber(generateTargetNumber());

    const gameTimer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 11) {
          setGameState('wrap-up');
        }
        
        if (prev <= 1) {
          clearInterval(gameTimer);
          setGameState('finished');
          return 0;
        }
        return prev - 1;
      });

      if (Math.random() < (1 / changeInterval)) {
        setTargetNumber(generateTargetNumber());
      }
    }, 1000);
  };

  const restartGame = () => {
    setGameState('setup');
    setCountdown(3);
    setTargetNumber(0);
    setBackgroundStyle('');
  };

  const toggleTheme = (theme) => {
    setSelectedThemes(prev => 
      prev.includes(theme) 
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{ 
        background: targetNumber === 0 
          ? 'linear-gradient(to right, rgba(0, 128, 255, 0.2), rgba(0, 128, 255, 0.2))' 
          : backgroundStyle 
      }}
    >
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Conductor</h1>
        
        {gameState === 'setup' && (
          <div>
            <div className="mb-4">
              <label className="block mb-2">Game Difficulty</label>
              <select 
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Time Period (Minutes)</label>
              <input 
                type="number" 
                min="1" 
                max="10" 
                value={timePeriod}
                onChange={(e) => setTimePeriod(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Topic Themes</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(topicThemes).map(theme => (
                  <label key={theme} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedThemes.includes(theme)}
                      onChange={() => toggleTheme(theme)}
                      className="mr-2"
                    />
                    {theme}
                  </label>
                ))}
              </div>
            </div>

            <button 
              onClick={startGame}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              disabled={selectedThemes.length === 0}
            >
              Start Game
            </button>
          </div>
        )}

        {gameState === 'countdown' && (
          <div className="text-center">
            <p className="mb-4 text-xl">Topic: {topic}</p>
            <div className="text-6xl font-bold text-blue-600">{countdown}</div>
          </div>
        )}

        {(gameState === 'playing' || gameState === 'wrap-up') && (
          <div className="text-center">
            <p className="mb-2 text-xl">Topic: {topic}</p>
            <div className="text-6xl font-bold mb-4">
              {targetNumber === 0 ? 'Breathe' : targetNumber}
            </div>
            
            <div className="flex justify-between mb-4">
              <span>Time Remaining: {timeRemaining} sec</span>
              {gameState === 'wrap-up' && (
                <span className="text-red-500">Wrapping up!</span>
              )}
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center">
            <p className="text-xl mb-4">Session Complete!</p>
            <p className="mb-4">Topic Explored: {topic}</p>
            <button 
              onClick={restartGame}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Restart Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConductorGame;