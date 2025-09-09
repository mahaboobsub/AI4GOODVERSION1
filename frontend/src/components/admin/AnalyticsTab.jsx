import React from 'react';
import { Card } from '../ui/card';
import { Users, Heart, Activity, TrendingUp, Award, AlertTriangle } from 'lucide-react';
import StatsCards from './StatsCards';
import BloodGroupChart from './BloodGroupChart';
import LeaderboardTable from './LeaderboardTable';

const AnalyticsTab = ({ stats, leaderboard, bloodGroupStats }) => {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <StatsCards stats={stats} />

      {/* Charts and Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Blood Group Distribution */}
        <BloodGroupChart data={bloodGroupStats} />

        {/* Top Donors Leaderboard */}
        <LeaderboardTable data={leaderboard} />
      </div>

      {/* Mission Progress */}
      <Card className="p-6 bg-gradient-to-r from-red-50 to-red-100 border-red-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-red-800 mb-2">Thalassemia-Free India 2030</h3>
            <p className="text-red-700 mb-4">
              Progress towards creating sustainable blood bridges for all thalassemia patients
            </p>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-800">{stats?.bridges_created || 0}</div>
                <div className="text-sm text-red-600">Bridges Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-800">{stats?.patients_helped || 0}</div>
                <div className="text-sm text-red-600">Lives Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-800">89%</div>
                <div className="text-sm text-red-600">Success Rate</div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="w-20 h-20 bg-red-200 rounded-full flex items-center justify-center mb-2">
              <Heart className="w-10 h-10 text-red-600" />
            </div>
            <div className="text-sm text-red-600 font-medium">Mission Control</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-red-700 mb-2">
            <span>Progress to 2030 Goal</span>
            <span>67%</span>
          </div>
          <div className="w-full bg-red-200 rounded-full h-3">
            <div className="bg-red-600 h-3 rounded-full animate-pulse" style={{ width: '67%' }}></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsTab;