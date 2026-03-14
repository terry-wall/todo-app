import React from 'react';

interface StatsTableProps {
  // Define props as needed
}

export const StatsTable: React.FC<StatsTableProps> = (props) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Stat</th>
            <th className="px-4 py-2 border-b">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border-b">Sample Stat</td>
            <td className="px-4 py-2 border-b">Sample Value</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;