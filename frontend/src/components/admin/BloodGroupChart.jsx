import React from 'react';
import { Card } from '../ui/card';
import { BarChart3 } from 'lucide-react';

const BloodGroupChart = ({ data }) => {
  const maxDonors = Math.max(...data.map(item => item.donors));

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Blood Group Distribution</h3>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-red-700">{item.blood_group}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{item.blood_group}</span>
                  <span className="text-sm text-gray-500">{item.donors} donors</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(item.donors / maxDonors) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-700 min-w-[40px] text-right">
                {item.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total Registered Donors</span>
          <span className="font-semibold">
            {data.reduce((sum, item) => sum + item.donors, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default BloodGroupChart;