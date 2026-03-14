import React from 'react';

interface LeagueCardProps {
  // Define props as needed
}

export const LeagueCard: React.FC<LeagueCardProps> = (props) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">League Card</h3>
      <p>League information will be displayed here.</p>
    </div>
  );
};

export default LeagueCard;