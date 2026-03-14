import React from 'react';
import { LeagueCard } from '@/components/LeagueCard';
import { StatsTable } from '@/components/StatsTable';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <LeagueCard />
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Stats</h2>
          <StatsTable />
        </div>
      </div>
    </div>
  );
}