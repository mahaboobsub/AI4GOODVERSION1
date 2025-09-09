// import React, { useState, useEffect } from 'react';
// import { ArrowRight, Heart, Users, Activity, Star } from 'lucide-react';
// import { Button } from '../ui/button';
// import { Card } from '../ui/card';
// import { useNavigate } from 'react-router-dom';

// const HeroSection = ({ stats, loading }) => {
//   const navigate = useNavigate();
//   const [animatedStats, setAnimatedStats] = useState({
//     total_donors: 0,
//     patients_helped: 0,
//     active_donors: 0
//   });

//   useEffect(() => {
//     // Animate counters on mount
//     const animateCounter = (target, key) => {
//       let current = 0;
//       const increment = target / 100;
//       const timer = setInterval(() => {
//         current += increment;
//         if (current >= target) {
//           current = target;
//           clearInterval(timer);
//         }
//         setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
//       }, 20);
//     };

//     const timer = setTimeout(() => {
//       animateCounter(stats.total_donors, 'total_donors');
//       animateCounter(stats.patients_helped, 'patients_helped');
//       animateCounter(stats.active_donors, 'active_donors');
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [stats]);

//   return (
//     <section className="relative bg-gradient-to-br from-red-50 via-white to-red-100 py-20 overflow-hidden">
//       {/* Animated Background Pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-red-600 animate-pulse"></div>
//         <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-red-400 animate-bounce" style={{animationDelay: '1s'}}></div>
//         <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-red-300 animate-pulse" style={{animationDelay: '2s'}}></div>
//         <div className="absolute top-1/2 right-1/3 w-12 h-12 rounded-full bg-red-500 animate-bounce" style={{animationDelay: '0.5s'}}></div>
//       </div>

//       {/* Heartbeat Animation */}
//       <div className="absolute top-16 right-16 opacity-20">
//         <Heart className="w-32 h-32 text-red-500 animate-pulse" />
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="max-w-6xl mx-auto">
//           {/* Main Hero Content with Slide-in Animation */}
//           <div className="text-center mb-16 transform transition-all duration-1000 ease-out">
//             <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6 transform transition-all duration-500 hover:scale-105 hover:bg-red-200 cursor-pointer">
//               <Heart className="w-4 h-4 animate-pulse" />
//               Mission 2030
//             </div>

//             <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
//               <span className="text-red-600 animate-gradient bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Thalassemia-Free</span>
//               <br />
//               <span className="transform transition-all duration-700 hover:scale-105 inline-block">India</span>{' '}
//               <span className="text-red-600 animate-gradient bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">2030</span>
//             </h1>

//             <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto animate-fade-in-up" style={{animationDelay: '0.3s'}}>
//               Connecting blood donors with thalassemia patients through AI-powered matching,
//               creating lifelong bridges of hope and healing across India.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
//               <Button
//                 size="lg"
//                 onClick={() => navigate('/login')}
//                 className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
//               >
//                 Join the Mission
//                 <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
//               >
//                 Learn More
//               </Button>
//             </div>
//           </div>

//           {/* Enhanced Impact Statistics */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up" style={{animationDelay: '0.9s'}}>
//             <Card className="p-6 text-center bg-white/90 backdrop-blur-sm border-red-100 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
//               <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-red-200 group-hover:scale-110">
//                 <Users className="w-6 h-6 text-red-600 transition-transform duration-300 group-hover:scale-110" />
//               </div>
//               <div className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-red-600">
//                 {loading ? '...' : animatedStats.total_donors.toLocaleString()}+
//               </div>
//               <div className="text-gray-600 font-medium">Registered Donors</div>
//               <div className="w-full bg-red-100 rounded-full h-2 mt-3 overflow-hidden">
//                 <div className="bg-red-500 h-2 rounded-full animate-pulse" style={{width: '85%'}}></div>
//               </div>
//             </Card>

//             <Card className="p-6 text-center bg-white/90 backdrop-blur-sm border-red-100 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-green-200 group-hover:scale-110">
//                 <Heart className="w-6 h-6 text-green-600 transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse" />
//               </div>
//               <div className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-green-600">
//                 {loading ? '...' : animatedStats.patients_helped}+
//               </div>
//               <div className="text-gray-600 font-medium">Lives Transformed</div>
//               <div className="w-full bg-green-100 rounded-full h-2 mt-3 overflow-hidden">
//                 <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
//               </div>
//             </Card>

//             <Card className="p-6 text-center bg-white/90 backdrop-blur-sm border-red-100 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-blue-200 group-hover:scale-110">
//                 <Activity className="w-6 h-6 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
//               </div>
//               <div className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-blue-600">
//                 {loading ? '...' : animatedStats.active_donors}
//               </div>
//               <div className="text-gray-600 font-medium">Active This Month</div>
//               <div className="w-full bg-blue-100 rounded-full h-2 mt-3 overflow-hidden">
//                 <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{width: '90%'}}></div>
//               </div>
//             </Card>
//           </div>

//           {/* Enhanced Mission Statement */}
//           <div className="text-center mt-16 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '1.2s'}}>
//             <div className="relative group">
//               <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
//               <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-red-100 shadow-lg hover:shadow-xl transition-all duration-300">
//                 <p className="text-lg text-gray-700">
//                   <strong className="text-red-600 text-xl">"Every 20 days, a thalassemia patient needs your help."</strong>
//                   <br />
//                   <span className="block mt-4 text-base">
//                     Together, we're building an AI-powered ecosystem that ensures no patient waits for blood,
//                     no donor feels disconnected, and every drop of blood creates a bridge to better health.
//                   </span>
//                 </p>
//                 <div className="flex items-center justify-center mt-6 space-x-2">
//                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
//                   <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
//                   <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes gradient {
//           0%, 100% {
//             background-size: 200% 200%;
//             background-position: left center;
//           }
//           50% {
//             background-size: 200% 200%;
//             background-position: right center;
//           }
//         }

//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s ease-out both;
//         }

//         .animate-gradient {
//           animation: gradient 3s ease infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSection;


// frontend/src/components/landing/HeroSection.jsx

import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, Users, Activity } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css'; // This line imports the styles and fixes the warning

const HeroSection = ({ stats, loading }) => {
  const navigate = useNavigate();
  const [animatedStats, setAnimatedStats] = useState({
    total_donors: 0,
    patients_helped: 0,
    active_donors: 0
  });

  useEffect(() => {
    const animateCounter = (target, key) => {
      const numericTarget = Number(target) || 0;
      if (numericTarget === 0) return;
      
      let current = 0;
      const increment = numericTarget / 100;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericTarget) {
          current = numericTarget;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 20);
      return () => clearInterval(timer);
    };

    if (stats) {
        const timerId = setTimeout(() => {
            animateCounter(stats.total_donors, 'total_donors');
            animateCounter(stats.patients_helped, 'patients_helped');
            animateCounter(stats.active_donors, 'active_donors');
        }, 500);
        return () => clearTimeout(timerId);
    }
  }, [stats]);

  return (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-red-100 py-20 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-red-600 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-red-400 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-red-300 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 rounded-full bg-red-500 animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Heartbeat Animation */}
      <div className="absolute top-16 right-16 opacity-20">
        <Heart className="w-32 h-32 text-red-500 animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:bg-red-200 cursor-pointer">
              <Heart className="w-4 h-4 animate-pulse" />
              Mission 2030
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
              <span className="text-red-600 animate-gradient bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Thalassemia-Free</span>
              <br />
              <span>India</span>{' '}
              <span className="text-red-600 animate-gradient bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">2030</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              Connecting blood donors with thalassemia patients through AI-powered matching,
              creating lifelong bridges of hope and healing across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <Button
                size="lg"
                onClick={() => navigate('/login')}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
              >
                Join the Mission
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <Card className="p-6 text-center bg-white/90 backdrop-blur-sm border-red-100 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-red-200 group-hover:scale-110">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-red-600">
                {loading ? '...' : animatedStats.total_donors.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Registered Donors</div>
            </Card>

            <Card className="p-6 text-center bg-white/90 backdrop-blur-sm border-red-100 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-green-200 group-hover:scale-110">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-green-600">
                {loading ? '...' : animatedStats.patients_helped}+
              </div>
              <div className="text-gray-600 font-medium">Lives Transformed</div>
            </Card>

            <Card className="p-6 text-center bg-white/90 backdrop-blur-sm border-red-100 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-blue-200 group-hover:scale-110">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                {loading ? '...' : animatedStats.active_donors}
              </div>
              <div className="text-gray-600 font-medium">Active This Month</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;