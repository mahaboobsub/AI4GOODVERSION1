// Mock data for donor and patient portals (static previews only)

export const mockStats = {
  total_donors: 1247,
  active_donors: 892,
  patients_helped: 156,
  emergencies_resolved: 89,
  blood_units_donated: 2134,
  bridges_created: 145
};

export const mockFeatures = [
  {
    icon: 'Brain',
    title: 'AI-Powered Matching',
    description: 'Advanced algorithms match donors with patients based on location, blood type, and compatibility factors for optimal care coordination.'
  },
  {
    icon: 'MessageCircle',
    title: 'WhatsApp Integration',
    description: 'Seamless communication through WhatsApp for appointment reminders, emergency alerts, and donor-patient coordination.'
  },
  {
    icon: 'Users',
    title: 'Blood Bridge Network',
    description: 'Create lasting connections between donors and thalassemia patients for consistent, reliable blood supply management.'
  },
  {
    icon: 'Activity',
    title: 'Real-time Health Monitoring',
    description: 'Track patient vitals, transfusion schedules, and health metrics with AI-powered insights and predictive analytics.'
  },
  {
    icon: 'Zap',
    title: 'Emergency Response System',
    description: 'Instant emergency blood requests with automated donor alerting and hospital coordination for critical situations.'
  },
  {
    icon: 'Award',
    title: 'Gamified Donor Experience',
    description: 'Reward donors with points, badges, and recognition to encourage regular donations and community engagement.'
  }
];

export const mockSuccessStories = [
  {
    name: 'Arjun Patel',
    age: 16,
    story: 'Thanks to BloodBridge AI, I found 3 regular donors who understand my thalassemia journey. No more sleepless nights worrying about my next transfusion. The AI matching connected me with donors in my area who have become like family.',
    impact: 'Connected with 3 bridge donors',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Priya Sharma',
    age: 14,
    story: 'The WhatsApp reminders and health tracking have transformed how I manage my condition. My hemoglobin levels are the most stable they\'ve ever been, and my family feels so much more confident about my care.',
    impact: '85% improvement in health stability',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b332-c2a?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Rohan Kumar',
    age: 12,
    story: 'I used to be scared of hospital visits, but now I look forward to meeting my bridge donors. They send me encouraging messages and celebrate my milestones. BloodBridge made my treatment journey less lonely.',
    impact: 'Zero missed appointments in 6 months',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockDonorData = {
  id: 'd1',
  name: 'Ravi Kumar',
  phone: '+919876543210',
  blood_group: 'O+',
  location: 'Mumbai',
  donations_completed: 12,
  next_donation: 'January 25, 2025',
  points: 450,
  level: 'Blood Guardian',
  streak: 4,
  impact_lives_saved: 5,
  badges: [
    { id: 'b1', name: 'First Donation', icon: 'award', unlocked: true },
    { id: 'b2', name: 'Regular Donor', icon: 'heart', unlocked: true },
    { id: 'b3', name: 'Monthly Hero', icon: 'calendar', unlocked: true },
    { id: 'b4', name: 'Life Saver', icon: 'shield', unlocked: false }
  ]
};

export const mockPatientData = {
  id: 'p1',
  name: 'Priya Sharma',
  age: 14,
  blood_group: 'A+',
  condition: 'Beta Thalassemia Major',
  bridge_status: 'Connected',
  health_score: 85,
  connected_donors: 3,
  last_transfusion: '12 days ago',
  next_transfusion: '8 days',
  upcoming_appointments: [
    {
      type: 'Blood Transfusion',
      doctor: 'Dr. Amit Sharma',
      date: 'January 25, 2025 - 10:00 AM'
    },
    {
      type: 'Regular Checkup',
      doctor: 'Dr. Priya Verma',
      date: 'February 2, 2025 - 2:30 PM'
    }
  ]
};

export const mockLeaderboard = [
  { rank: 1, name: 'Ravi Kumar', location: 'Mumbai', donations: 45, blood_group: 'O+', points: 1125 },
  { rank: 2, name: 'Priya Sharma', location: 'Delhi', donations: 42, blood_group: 'A+', points: 1050 },
  { rank: 3, name: 'Amit Patel', location: 'Ahmedabad', donations: 38, blood_group: 'B+', points: 950 },
  { rank: 4, name: 'Sneha Reddy', location: 'Hyderabad', donations: 35, blood_group: 'AB+', points: 875 },
  { rank: 5, name: 'Kiran Singh', location: 'Pune', donations: 32, blood_group: 'O-', points: 800 }
];