import React from 'react';
import { LeagueStandings } from '@/components/LeagueStandings';

export default function LeaguePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">League</h1>
      
      <div className="max-w-2xl mx-auto">
        <LeagueStandings />
      </div>
    </div>
  );
}