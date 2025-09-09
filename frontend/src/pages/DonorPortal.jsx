// import React from 'react';
// import { Card } from '../components/ui/card';
// import { Badge } from '../components/ui/badge';
// import { Button } from '../components/ui/button';
// import { Trophy, Heart, Calendar, Shield, Star, Gift, Users, TrendingUp, Award, Zap } from 'lucide-react';
// import { mockDonorData, mockLeaderboard } from '../lib/mockData';

// const DonorPortal = () => {
//   const donor = mockDonorData;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-6 py-8">
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-2xl mb-8 relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
//           <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
//           <div className="flex items-center justify-between relative z-10">
//             <div>
//               <h1 className="text-3xl font-bold mb-2">
//                 Welcome back, {donor.name}! 🩸
//               </h1>
//               <p className="text-blue-100 text-lg">
//                 Thank you for being a <span className="font-semibold">{donor.level}</span>
//               </p>
//               <div className="flex items-center gap-4 mt-4">
//                 <Badge className="bg-white/20 text-white border-white/30">
//                   Level: {donor.level}
//                 </Badge>
//                 <Badge className="bg-white/20 text-white border-white/30">
//                   {donor.points} Points
//                 </Badge>
//                 <Badge className="bg-white/20 text-white border-white/30">
//                   {donor.streak} Month Streak
//                 </Badge>
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-2">
//                 <Heart className="w-10 h-10 text-white animate-pulse" />
//               </div>
//               <div className="text-2xl font-bold">{donor.donations_completed}</div>
//               <div className="text-sm text-blue-100">Donations</div>
//             </div>
//           </div>
//         </div>

//         {/* Coming Soon Banner */}
//         <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-6 rounded-xl mb-8">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
//               <Gift className="w-6 h-6 text-yellow-600" />
//             </div>
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold text-yellow-800">Enhanced Donor Features Launching Soon!</h3>
//               <p className="text-yellow-700">
//                 Advanced gamification, personalized matching, real-time notifications, and community features are being finalized.
//               </p>
//             </div>
//             <div className="hidden md:flex items-center gap-2">
//               <Zap className="w-5 h-5 text-yellow-600" />
//               <span className="text-yellow-700 font-medium">Phase 2</span>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Impact Metrics */}
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                 <TrendingUp className="w-6 h-6 text-blue-600" />
//                 Your Impact
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <Card className="p-6 text-center bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-all duration-300">
//                   <Heart className="w-12 h-12 text-red-600 mx-auto mb-4 animate-pulse" />
//                   <div className="text-3xl font-bold text-red-700 mb-2">{donor.impact_lives_saved}</div>
//                   <div className="text-red-600 font-medium">Lives Saved</div>
//                   <div className="mt-2 text-xs text-red-500">+2 this month</div>
//                 </Card>

//                 <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
//                   <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
//                   <div className="text-3xl font-bold text-green-700 mb-2">{donor.streak}</div>
//                   <div className="text-green-600 font-medium">Month Streak</div>
//                   <div className="mt-2 text-xs text-green-500">Personal best!</div>
//                 </Card>

//                 <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
//                   <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
//                   <div className="text-3xl font-bold text-blue-700 mb-2">{donor.points}</div>
//                   <div className="text-blue-600 font-medium">Total Points</div>
//                   <div className="mt-2 text-xs text-blue-500">+75 this week</div>
//                 </Card>
//               </div>
//             </div>

//             {/* Achievement Badges */}
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
//                 <Award className="w-5 h-5 text-yellow-600" />
//                 Achievement Badges
//               </h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {donor.badges.map((badge) => {
//                   const IconComponent = {
//                     award: Trophy,
//                     heart: Heart,
//                     calendar: Calendar,
//                     shield: Shield
//                   }[badge.icon] || Trophy;

//                   return (
//                     <Card
//                       key={badge.id}
//                       className={`p-4 text-center transition-all duration-300 ${
//                         badge.unlocked
//                           ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg hover:scale-105'
//                           : 'bg-gray-50 border-gray-200 opacity-60'
//                       }`}
//                     >
//                       <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
//                         badge.unlocked ? 'bg-yellow-100' : 'bg-gray-100'
//                       }`}>
//                         <IconComponent className={`w-6 h-6 ${
//                           badge.unlocked ? 'text-yellow-600' : 'text-gray-400'
//                         }`} />
//                       </div>
//                       <div className={`font-medium text-sm ${
//                         badge.unlocked ? 'text-gray-900' : 'text-gray-500'
//                       }`}>
//                         {badge.name}
//                       </div>
//                       {badge.unlocked ? (
//                         <Badge className="mt-2 bg-green-100 text-green-800 text-xs">
//                           Unlocked ✓
//                         </Badge>
//                       ) : (
//                         <Badge className="mt-2 bg-gray-100 text-gray-600 text-xs">
//                           Locked
//                         </Badge>
//                       )}
//                     </Card>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Donation Status */}
//             <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
//               <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Calendar className="w-5 h-5 text-blue-600" />
//                 Donation Status
//               </h3>
//               <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
//                 <div>
//                   <div className="font-semibold text-blue-900">Next Donation Eligibility</div>
//                   <div className="text-blue-700">{donor.next_donation}</div>
//                   <div className="text-sm text-gray-600 mt-1">You're ready to donate again!</div>
//                 </div>
//                 <Button className="bg-blue-600 hover:bg-blue-700" disabled>
//                   Schedule Donation (Coming Soon)
//                 </Button>
//               </div>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Community Leaderboard */}
//             <Card className="p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <Users className="w-5 h-5 text-gray-600" />
//                 <h3 className="text-lg font-semibold text-gray-900">Community Leaders</h3>
//               </div>
//               <div className="space-y-3">
//                 {mockLeaderboard.slice(0, 5).map((leader, index) => (
//                   <div key={leader.rank} className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
//                     leader.name === donor.name ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
//                   }`}>
//                     <div className="flex items-center gap-3">
//                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
//                         index === 0 ? 'bg-yellow-100 text-yellow-700' :
//                         index === 1 ? 'bg-gray-100 text-gray-700' :
//                         index === 2 ? 'bg-orange-100 text-orange-700' :
//                         'bg-blue-100 text-blue-700'
//                       }`}>
//                         #{leader.rank}
//                       </div>
//                       <div>
//                         <div className={`font-medium text-sm ${
//                           leader.name === donor.name ? 'text-blue-700' : 'text-gray-900'
//                         }`}>
//                           {leader.name}
//                           {leader.name === donor.name && <span className="text-blue-500 ml-1">(You)</span>}
//                         </div>
//                         <div className="text-xs text-gray-500">{leader.location}</div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="font-semibold text-sm">{leader.donations}</div>
//                       <div className="text-xs text-gray-500">donations</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Card>

//             {/* Quick Actions */}
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//               <div className="space-y-3">
//                 <Button className="w-full bg-red-600 hover:bg-red-700" disabled>
//                   <Heart className="w-4 h-4 mr-2" />
//                   Emergency Request (Coming Soon)
//                 </Button>
//                 <Button className="w-full" variant="outline" disabled>
//                   <Calendar className="w-4 h-4 mr-2" />
//                   Find Donation Center (Coming Soon)
//                 </Button>
//                 <Button className="w-full" variant="outline" disabled>
//                   <Users className="w-4 h-4 mr-2" />
//                   Update Availability (Coming Soon)
//                 </Button>
//                 <Button className="w-full" variant="outline" disabled>
//                   <Trophy className="w-4 h-4 mr-2" />
//                   View Challenges (Coming Soon)
//                 </Button>
//               </div>
//             </Card>

//             {/* Progress to Next Level */}
//             <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
//               <h3 className="text-lg font-semibold text-purple-900 mb-4">Next Level Progress</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-purple-700">Blood Guardian → Life Saver</span>
//                   <span className="text-purple-600 font-medium">75%</span>
//                 </div>
//                 <div className="w-full bg-purple-200 rounded-full h-3">
//                   <div className="bg-purple-600 h-3 rounded-full animate-pulse" style={{ width: '75%' }}></div>
//                 </div>
//                 <p className="text-xs text-purple-700">125 more points to unlock Life Saver status!</p>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default DonorPortal;
// import React from 'react';
// import { Card } from '../components/ui/card';
// import { Badge } from '../components/ui/badge';
// import { Button } from '../components/ui/button';
// import { Trophy, Heart, Calendar, Shield, Star, Gift, Users, TrendingUp, Award, Zap } from 'lucide-react';
// import { mockDonorData, mockLeaderboard } from '../lib/mockData';

// const DonorPortal = () => {
//   const donor = mockDonorData;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-6 py-8">
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-2xl mb-8 relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
//           <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
//           <div className="flex items-center justify-between relative z-10">
//             <div>
//               <h1 className="text-3xl font-bold mb-2">
//                 Welcome back, {donor.name}! 🩸
//               </h1>
//               <p className="text-blue-100 text-lg">
//                 Thank you for being a <span className="font-semibold">{donor.level}</span>
//               </p>
//               <div className="flex items-center gap-4 mt-4">
//                 <Badge className="bg-white/20 text-white border-white/30">
//                   Level: {donor.level}
//                 </Badge>
//                 <Badge className="bg-white/20 text-white border-white/30">
//                   {donor.points} Points
//                 </Badge>
//                 <Badge className="bg-white/20 text-white border-white/30">
//                   {donor.streak} Month Streak
//                 </Badge>
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-2">
//                 <Heart className="w-10 h-10 text-white animate-pulse" />
//               </div>
//               <div className="text-2xl font-bold">{donor.donations_completed}</div>
//               <div className="text-sm text-blue-100">Donations</div>
//             </div>
//           </div>
//         </div>

//         {/* Coming Soon Banner */}
//         <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-6 rounded-xl mb-8">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
//               <Gift className="w-6 h-6 text-yellow-600" />
//             </div>
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold text-yellow-800">Enhanced Donor Features Launching Soon!</h3>
//               <p className="text-yellow-700">
//                 Advanced gamification, personalized matching, real-time notifications, and community features are being finalized.
//               </p>
//             </div>
//             <div className="hidden md:flex items-center gap-2">
//               <Zap className="w-5 h-5 text-yellow-600" />
//               <span className="text-yellow-700 font-medium">Phase 2</span>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Impact Metrics */}
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                 <TrendingUp className="w-6 h-6 text-blue-600" />
//                 Your Impact
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <Card className="p-6 text-center bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-all duration-300">
//                   <Heart className="w-12 h-12 text-red-600 mx-auto mb-4 animate-pulse" />
//                   <div className="text-3xl font-bold text-red-700 mb-2">{donor.impact_lives_saved}</div>
//                   <div className="text-red-600 font-medium">Lives Saved</div>
//                   <div className="mt-2 text-xs text-red-500">+2 this month</div>
//                 </Card>

//                 <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
//                   <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
//                   <div className="text-3xl font-bold text-green-700 mb-2">{donor.streak}</div>
//                   <div className="text-green-600 font-medium">Month Streak</div>
//                   <div className="mt-2 text-xs text-green-500">Personal best!</div>
//                 </Card>

//                 <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
//                   <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
//                   <div className="text-3xl font-bold text-blue-700 mb-2">{donor.points}</div>
//                   <div className="text-blue-600 font-medium">Total Points</div>
//                   <div className="mt-2 text-xs text-blue-500">+75 this week</div>
//                 </Card>
//               </div>
//             </div>

//             {/* Achievement Badges */}
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
//                 <Award className="w-5 h-5 text-yellow-600" />
//                 Achievement Badges
//               </h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {donor.badges.map((badge) => {
//                   const IconComponent = {
//                     award: Trophy,
//                     heart: Heart,
//                     calendar: Calendar,
//                     shield: Shield
//                   }[badge.icon] || Trophy;

//                   return (
//                     <Card
//                       key={badge.id}
//                       className={`p-4 text-center transition-all duration-300 ${
//                         badge.unlocked
//                           ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg hover:scale-105'
//                           : 'bg-gray-50 border-gray-200 opacity-60'
//                       }`}
//                     >
//                       <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
//                         badge.unlocked ? 'bg-yellow-100' : 'bg-gray-100'
//                       }`}>
//                         <IconComponent className={`w-6 h-6 ${
//                           badge.unlocked ? 'text-yellow-600' : 'text-gray-400'
//                         }`} />
//                       </div>
//                       <div className={`font-medium text-sm ${
//                         badge.unlocked ? 'text-gray-900' : 'text-gray-500'
//                       }`}>
//                         {badge.name}
//                       </div>
//                       {badge.unlocked ? (
//                         <Badge className="mt-2 bg-green-100 text-green-800 text-xs">
//                           Unlocked ✓
//                         </Badge>
//                       ) : (
//                         <Badge className="mt-2 bg-gray-100 text-gray-600 text-xs">
//                           Locked
//                         </Badge>
//                       )}
//                     </Card>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Donation Status */}
//             <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
//               <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Calendar className="w-5 h-5 text-blue-600" />
//                 Donation Status
//               </h3>
//               <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
//                 <div>
//                   <div className="font-semibold text-blue-900">Next Donation Eligibility</div>
//                   <div className="text-blue-700">{donor.next_donation}</div>
//                   <div className="text-sm text-gray-600 mt-1">You're ready to donate again!</div>
//                 </div>
//                 <Button className="bg-blue-600 hover:bg-blue-700" disabled>
//                   Schedule Donation (Coming Soon)
//                 </Button>
//               </div>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Community Leaderboard */}
//             <Card className="p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <Users className="w-5 h-5 text-gray-600" />
//                 <h3 className="text-lg font-semibold text-gray-900">Community Leaders</h3>
//               </div>
//               <div className="space-y-3">
//                 {mockLeaderboard.slice(0, 5).map((leader, index) => (
//                   <div key={leader.rank} className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
//                     leader.name === donor.name ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
//                   }`}>
//                     <div className="flex items-center gap-3">
//                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
//                         index === 0 ? 'bg-yellow-100 text-yellow-700' :
//                         index === 1 ? 'bg-gray-100 text-gray-700' :
//                         index === 2 ? 'bg-orange-100 text-orange-700' :
//                         'bg-blue-100 text-blue-700'
//                       }`}>
//                         #{leader.rank}
//                       </div>
//                       <div>
//                         <div className={`font-medium text-sm ${
//                           leader.name === donor.name ? 'text-blue-700' : 'text-gray-900'
//                         }`}>
//                           {leader.name}
//                           {leader.name === donor.name && <span className="text-blue-500 ml-1">(You)</span>}
//                         </div>
//                         <div className="text-xs text-gray-500">{leader.location}</div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="font-semibold text-sm">{leader.donations}</div>
//                       <div className="text-xs text-gray-500">donations</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Card>

//             {/* Quick Actions */}
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//               <div className="space-y-3">
//                 <Button className="w-full bg-red-600 hover:bg-red-700" disabled>
//                   <Heart className="w-4 h-4 mr-2" />
//                   Emergency Request (Coming Soon)
//                 </Button>
//                 <Button className="w-full" variant="outline" disabled>
//                   <Calendar className="w-4 h-4 mr-2" />
//                   Find Donation Center (Coming Soon)
//                 </Button>
//                 <Button className="w-full" variant="outline" disabled>
//                   <Users className="w-4 h-4 mr-2" />
//                   Update Availability (Coming Soon)
//                 </Button>
//                 <Button className="w-full" variant="outline" disabled>
//                   <Trophy className="w-4 h-4 mr-2" />
//                   View Challenges (Coming Soon)
//                 </Button>
//               </div>
//             </Card>

//             {/* Progress to Next Level */}
//             <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
//               <h3 className="text-lg font-semibold text-purple-900 mb-4">Next Level Progress</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-purple-700">Blood Guardian → Life Saver</span>
//                   <span className="text-purple-600 font-medium">75%</span>
//                 </div>
//                 <div className="w-full bg-purple-200 rounded-full h-3">
//                   <div className="bg-purple-600 h-3 rounded-full animate-pulse" style={{ width: '75%' }}></div>
//                 </div>
//                 <p className="text-xs text-purple-700">125 more points to unlock Life Saver status!</p>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DonorPortal;


// frontend/src/pages/DonorPortal.jsx

import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Trophy, Heart, Calendar, Shield, Star, Users, TrendingUp, Award, UserCheck, UserX, Gift, Zap } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { mockLeaderboard } from '../lib/mockData'; // Leaderboard remains mock for now
import { donorAPI } from '../lib/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DonorPortal = () => {
  const [donorData, setDonorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const fetchData = async (showLoader = false) => {
    if(showLoader) setLoading(true);
    try {
      const response = await donorAPI.getDashboard();
      setDonorData(response.data);
    } catch (err) {
      setError("Could not fetch your dashboard data. Please try again later.");
      console.error("Failed to fetch donor data:", err);
    } finally {
      if(showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true); // Show loader on initial fetch
  }, []);

  const handleUpdateAvailability = async () => {
    if (!newStatus) return;
    try {
      await donorAPI.updateAvailability(newStatus);
      setShowConfirmDialog(false);
      // Refresh data silently to show the updated status
      fetchData(false); 
    } catch (err) {
      console.error("Failed to update availability:", err);
      alert("There was an error updating your status. Please try again.");
      setShowConfirmDialog(false);
    }
  };

  const openConfirmation = (status) => {
    setNewStatus(status);
    setShowConfirmDialog(true);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="xl" />
          <p className="text-lg text-gray-600">Loading Your Portal...</p>
        </div>
      </div>
    );
  }

  if (error || !donorData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg p-4 text-center">
        {error || "An error occurred while loading your data."}
      </div>
    );
  }

  const donor = donorData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {donor.name}! 🩸</h1>
              <p className="text-blue-100 text-lg">Thank you for being a <span className="font-semibold">{donor.level}</span></p>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <Badge className="bg-white/20 text-white border-white/30">Level: {donor.level}</Badge>
                <Badge className="bg-white/20 text-white border-white/30">{donor.points} Points</Badge>
                <Badge className="bg-white/20 text-white border-white/30">{donor.streak} Month Streak</Badge>
              </div>
            </div>
            <div className="text-center flex-shrink-0">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <Heart className="w-10 h-10 text-white animate-pulse" />
              </div>
              <div className="text-2xl font-bold">{donor.donations_completed}</div>
              <div className="text-sm text-blue-100">Donations</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Impact Metrics */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><TrendingUp className="w-6 h-6 text-blue-600" />Your Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-all duration-300">
                  <Heart className="w-12 h-12 text-red-600 mx-auto mb-4 animate-pulse" />
                  <div className="text-3xl font-bold text-red-700 mb-2">{donor.impact_lives_saved}</div>
                  <div className="text-red-600 font-medium">Lives Saved</div>
                </Card>
                <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
                  <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-700 mb-2">{donor.streak}</div>
                  <div className="text-green-600 font-medium">Month Streak</div>
                </Card>
                <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
                  <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-700 mb-2">{donor.points}</div>
                  <div className="text-blue-600 font-medium">Total Points</div>
                </Card>
              </div>
            </div>

            {/* Achievement Badges */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2"><Award className="w-5 h-5 text-yellow-600" />Achievement Badges</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {donor.badges.map((badge) => {
                  const IconComponent = { award: Trophy, heart: Heart, calendar: Calendar, shield: Shield }[badge.icon] || Trophy;
                  return (
                    <Card key={badge.id} className={`p-4 text-center transition-all duration-300 ${badge.unlocked ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg hover:scale-105' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${badge.unlocked ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                        <IconComponent className={`w-6 h-6 ${badge.unlocked ? 'text-yellow-600' : 'text-gray-400'}`} />
                      </div>
                      <div className={`font-medium text-sm ${badge.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>{badge.name}</div>
                      {badge.unlocked ? (<Badge className="mt-2 bg-green-100 text-green-800 text-xs">Unlocked ✓</Badge>) : (<Badge className="mt-2 bg-gray-100 text-gray-600 text-xs">Locked</Badge>)}
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Donation Status */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-600" />Donation Status</h3>
              <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                <div>
                  <div className="font-semibold text-blue-900">Next Donation Eligibility</div>
                  <div className="text-blue-700">{donor.next_donation}</div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" disabled>Schedule Now (Soon)</Button>
              </div>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline" onClick={() => openConfirmation('available')}>
                  <UserCheck className="w-4 h-4 mr-2 text-green-600" /> Mark as Available
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => openConfirmation('unavailable')}>
                  <UserX className="w-4 h-4 mr-2 text-red-600" /> Mark as Unavailable
                </Button>
                <Button className="w-full justify-start" variant="outline" disabled><Calendar className="w-4 h-4 mr-2" /> Find Donation Center (Soon)</Button>
                <Button className="w-full justify-start" variant="outline" disabled><Trophy className="w-4 h-4 mr-2" /> View Challenges (Soon)</Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4"><Users className="w-5 h-5 text-gray-600" /><h3 className="text-lg font-semibold text-gray-900">Community Leaders</h3></div>
              <div className="space-y-3">
                {mockLeaderboard.slice(0, 5).map((leader, index) => (
                  <div key={leader.rank} className={`flex items-center justify-between p-3 rounded-lg ${leader.name === donor.name ? 'bg-blue-50 border border-blue-200' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700' : index === 1 ? 'bg-gray-100 text-gray-700' : index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>#{leader.rank}</div>
                      <div>
                        <div className={`font-medium text-sm ${leader.name === donor.name ? 'text-blue-700' : 'text-gray-900'}`}>{leader.name}{leader.name === donor.name && <span className="text-blue-500 ml-1">(You)</span>}</div>
                        <div className="text-xs text-gray-500">{leader.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">{leader.donations}</div>
                      <div className="text-xs text-gray-500">donations</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Availability Change</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark yourself as "{newStatus}"? This will affect your ability to receive emergency notifications.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdateAvailability}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DonorPortal;