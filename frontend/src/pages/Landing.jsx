import React, { useState, useEffect } from 'react';
import HeroSection from '../components/landing/HeroSection';
import FeatureShowcase from '../components/landing/FeatureShowcase';
import SuccessStories from '../components/landing/SuccessStories';
import WhatsAppButton from '../components/common/WhatsAppButton';
import { mockStats, mockFeatures, mockSuccessStories } from '../lib/mockData';
import { publicAPI } from '../lib/api';

const Landing = () => {
  const [stats, setStats] = useState(mockStats);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Try to fetch live stats from public API
        const response = await publicAPI.getStats();
        setStats(response.data);
      } catch (error) {
        console.log('Using mock stats for landing page (API not available)');
        // Use mock stats as fallback
        setStats(mockStats);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection stats={stats} loading={loading} />
      <FeatureShowcase features={mockFeatures} />
      <SuccessStories stories={mockSuccessStories} />
      <WhatsAppButton />
    </div>
  );
};

export default Landing;