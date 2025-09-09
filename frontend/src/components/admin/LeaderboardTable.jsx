import React from 'react';
import { Card } from '../ui/card';
import { Trophy, Medal, Award, Star } from 'lucide-react';

const LeaderboardTable = ({ data }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-orange-500" />;
      default:
        return <Star className="w-5 h-5 text-blue-500" />;
    }
  };

  const getRankBg = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-50 border-yellow-200';
      case 2:
        return 'bg-gray-50 border-gray-200';
      case 3:
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">Top Donors Leaderboard</h3>
      </div>
      
      <div className="space-y-3">
        {data.map((donor, index) => (
          <div
            key={donor.rank}
            className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md ${getRankBg(donor.rank)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(donor.rank)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{donor.name}</div>
                  <div className="text-sm text-gray-600">{donor.location}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{donor.donations}</div>
                    <div className="text-xs text-gray-500">donations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-blue-600">{donor.blood_group}</div>
                    <div className="text-xs text-gray-500">blood type</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{donor.points}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          Recognizing our community heroes who make the biggest impact
        </p>
      </div>
    </Card>
  );
};

export default LeaderboardTable;