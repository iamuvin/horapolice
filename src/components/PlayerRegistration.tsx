import React, { useState } from 'react';
import { User } from 'lucide-react';

interface PlayerRegistrationProps {
  onRegister: (name: string) => void;
}

export function PlayerRegistration({ onRegister }: PlayerRegistrationProps) {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onRegister(playerName.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-500 p-4 rounded-full">
            <User size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Enter Your Name</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50"
            placeholder="Your game name"
            required
            minLength={2}
            maxLength={20}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors font-semibold"
          >
            Start Playing
          </button>
        </form>
      </div>
    </div>
  );
}