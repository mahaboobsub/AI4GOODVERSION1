import React from 'react';
import { Card } from '../ui/card';
import { Users, Heart, Activity, TrendingUp, Award, AlertTriangle } from 'lucide-react';

const StatsCards = ({ stats }) => {
  const statItems = [
    {
      title: 'Total Donors',
      value: stats?.total_donors || 0,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      change: '+12%'
    },
    {
      title: 'Lives Helped',
      value: stats?.patients_helped || 0,
      icon: Heart,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      change: '+8%'
    },
    {
      title: 'Active Donors',
      value: stats?.active_donors || 0,
      icon: Activity,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      change: '+15%'
    },
    {
      title: 'Blood Units',
      value: stats?.blood_units_donated || 0,
      icon: TrendingUp,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      change: '+22%'
    },
    {
      title: 'Bridges Created',
      value: stats?.bridges_created || 0,
      icon: Award,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      change: '+18%'
    },
    {
      title: 'Emergencies Resolved',
      value: stats?.emergencies_resolved || 0,
      icon: AlertTriangle,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      change: '+5%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <Card
            key={index}
            className={`p-6 ${item.bgColor} border-0 hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${item.textColor} opacity-80`}>
                  {item.title}
                </p>
                <p className={`text-3xl font-bold ${item.textColor} mt-1`}>
                  {item.value.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">{item.change}</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;