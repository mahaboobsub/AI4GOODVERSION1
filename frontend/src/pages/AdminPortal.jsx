import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BarChart3, Users, AlertTriangle, MessageSquare, Shield } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AnalyticsTab from '../components/admin/AnalyticsTab';
import PatientManagement from '../components/admin/PatientManagement';
import EmergencyCenter from '../components/admin/EmergencyCenter';
import InboxTab from '../components/admin/InboxTab';
import { adminAPI } from '../lib/api';

const AdminPortal = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stats: null,
    bloodGroupStats: [],
    leaderboard: [],
    patients: [],
    emergencies: [],
    inbox: []
  });

  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all admin data in parallel
      const [
        statsRes,
        bloodGroupRes,
        leaderboardRes,
        patientsRes,
        emergenciesRes,
        inboxRes
      ] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getBloodGroupStats(),
        adminAPI.getLeaderboard(),
        adminAPI.getPatients(),
        adminAPI.getEmergencies(),
        adminAPI.getInbox()
      ]);

      setData({
        stats: statsRes.data,
        bloodGroupStats: bloodGroupRes.data,
        leaderboard: leaderboardRes.data,
        patients: patientsRes.data,
        emergencies: emergenciesRes.data,
        inbox: inboxRes.data
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError(error.response?.data?.detail || 'Failed to load admin data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const refetchData = () => {
    fetchAllData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="xl" />
          <span className="ml-4 text-lg text-gray-600">Loading admin portal...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 mb-4 text-lg">{error}</div>
          <button 
            onClick={fetchAllData}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
              <p className="text-gray-600">Manage blood donations, patients, and emergency responses</p>
            </div>
          </div>
          <p className="text-sm text-red-600 font-medium">🩸 Thalassemia-Free India 2030 Mission Control</p>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-red-50 data-[state=active]:text-red-700">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <Users className="w-4 h-4" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="emergencies" className="flex items-center gap-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
              <AlertTriangle className="w-4 h-4" />
              Emergency
            </TabsTrigger>
            <TabsTrigger value="inbox" className="flex items-center gap-2 data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              <MessageSquare className="w-4 h-4" />
              Inbox
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsTab
              stats={data.stats}
              leaderboard={data.leaderboard}
              bloodGroupStats={data.bloodGroupStats}
            />
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <PatientManagement
              patients={data.patients}
              onRefetch={refetchData}
            />
          </TabsContent>

          <TabsContent value="emergencies" className="space-y-6">
            <EmergencyCenter
              emergencies={data.emergencies}
              onRefetch={refetchData}
            />
          </TabsContent>

          <TabsContent value="inbox" className="space-y-6">
            <InboxTab
              messages={data.inbox}
              onRefetch={refetchData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPortal;