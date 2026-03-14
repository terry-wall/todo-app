import React from 'react';

interface PlayerCardProps {
  // Define props as needed
}

export const PlayerCard: React.FC<PlayerCardProps> = (props) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-semibold">P</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Player Name</h3>
          <p className="text-gray-600">Position</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Player statistics and information will be displayed here.</p>
      </div>
    </div>
  );
};

export default PlayerCard;