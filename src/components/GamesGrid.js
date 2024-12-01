import React from 'react';
import Link from 'next/link';

const GamesGrid = () => {
  const games = [
    {
      id: 'conductor',
      title: 'Conductor',
      description: 'A mindfulness game to match your energy with dynamic numbers.',
      image: '/api/placeholder/300/200',
      link: '/conductor'
    },
    {
      id: 'coming-soon',
      title: 'Coming Soon',
      description: 'More exciting games are on the way!',
      image: '/api/placeholder/300/200',
      disabled: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Game Collection</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div 
              key={game.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                game.disabled ? 'opacity-50' : 'hover:shadow-lg transition-shadow cursor-pointer'
              }`}
            >
              {!game.disabled ? (
                <Link href={game.link}>
                  <div className="h-full">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-bold mb-2">{game.title}</h2>
                      <p className="text-gray-600">{game.description}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div>
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{game.title}</h2>
                    <p className="text-gray-600">{game.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GamesGrid;