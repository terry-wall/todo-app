import React from 'react';

interface LeagueStandingsProps {
  // Define props as needed
}

export const LeagueStandings: React.FC<LeagueStandingsProps> = (props) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">League Standings</h3>
      <div className="space-y-2">
        <div className="flex justify-between p-2 bg-gray-50 rounded">
          <span>Team 1</span>
          <span>Points: 100</span>
        </div>
        <div className="flex justify-between p-2 bg-gray-50 rounded">
          <span>Team 2</span>
          <span>Points: 95</span>
        </div>
      </div>
    </div>
  );
};

export default LeagueStandings;