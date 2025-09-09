// import React, { useState, useEffect, useRef } from 'react';
// import { Card } from '../ui/card';
// import * as Icons from 'lucide-react';

// const FeatureShowcase = ({ features }) => {
//   const [visibleCards, setVisibleCards] = useState([]);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             // Stagger the animation of feature cards
//             features.forEach((_, index) => {
//               setTimeout(() => {
//                 setVisibleCards(prev => [...new Set([...prev, index])]);
//               }, index * 150);
//             });
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, [features]);

//   return (
//     <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-gray-50">
//       <div className="container mx-auto px-6">
//         <div className="max-w-6xl mx-auto">
//           {/* Enhanced Section Header */}
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce">
//               <Icons.Zap className="w-4 h-4" />
//               Revolutionary Technology
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
//               <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Cutting-Edge Healthcare
//               </span>
//               <br />
//               <span className="text-gray-900">Platform</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
//               Our comprehensive platform combines artificial intelligence, real-time matching,
//               and seamless communication to transform blood donation in India.
//             </p>
//           </div>

//           {/* Enhanced Features Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => {
//               const IconComponent = Icons[feature.icon] || Icons.Heart;
//               const isVisible = visibleCards.includes(index);

//               return (
//                 <Card
//                   key={index}
//                   className={`p-8 text-center hover:shadow-2xl transition-all duration-700 border-gray-100 hover:border-blue-200 group cursor-pointer transform hover:scale-105 hover:-translate-y-3 ${
//                     isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
//                   }`}
//                   style={{
//                     animationDelay: `${index * 0.1}s`,
//                     background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)'
//                   }}
//                 >
//                   <div className="relative mb-6">
//                     <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 rounded-3xl flex items-center justify-center mx-auto transition-all duration-500 transform group-hover:rotate-6 group-hover:scale-110">
//                       <IconComponent className="w-10 h-10 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
//                     </div>
//                     {/* Floating animation circles */}
//                     <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
//                     <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" style={{animationDelay: '0.2s'}}></div>
//                   </div>

//                   <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
//                     {feature.title}
//                   </h3>

//                   <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
//                     {feature.description}
//                   </p>

//                   {/* Progress bar animation */}
//                   <div className="mt-6 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
//                     <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-1000 transform origin-left group-hover:scale-x-100 scale-x-0"></div>
//                   </div>

//                   {/* Hover effect overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
//                 </Card>
//               );
//             })}
//           </div>

//           {/* Enhanced Bottom CTA */}
//           <div className="text-center mt-20 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
//             <div className="relative max-w-4xl mx-auto">
//               <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-blue-200 to-purple-200 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
//               <div className="relative bg-gradient-to-br from-red-50 via-blue-50 to-purple-50 p-12 rounded-3xl border border-red-100 shadow-lg hover:shadow-2xl transition-all duration-500">
//                 <div className="flex items-center justify-center mb-6">
//                   <div className="flex space-x-2">
//                     <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
//                     <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
//                     <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
//                   </div>
//                 </div>

//                 <h3 className="text-3xl font-bold text-gray-900 mb-6">
//                   Ready to{' '}
//                   <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
//                     Transform Lives
//                   </span>
//                   ?
//                 </h3>

//                 <p className="text-gray-700 mb-8 text-lg">
//                   Join thousands of donors who are already making a difference through our platform.
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl">
//                     <span className="flex items-center justify-center">
//                       Become a Donor
//                       <Icons.ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
//                     </span>
//                   </button>
//                   <button className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//                     <span className="flex items-center justify-center">
//                       Find Support
//                       <Icons.Heart className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Animation Styles */}
//       <style jsx>{`
//         @keyframes slide-up {
//           from {
//             opacity: 0;
//             transform: translateY(40px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-slide-up {
//           animation: slide-up 0.8s ease-out both;
//         }

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

//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s ease-out both;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default FeatureShowcase;



// frontend/src/components/landing/FeatureShowcase.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/card';
import * as Icons from 'lucide-react';
import './FeatureShowcase.css'; // <-- IMPORT THE CSS FILE HERE

const FeatureShowcase = ({ features }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...new Set([...prev, index])]);
              }, index * 150);
            });
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [features]);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icons.Zap className="w-4 h-4" />
              Revolutionary Technology
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cutting-Edge Healthcare
              </span> Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines AI, real-time matching, and seamless communication to transform blood donation in India.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = Icons[feature.icon] || Icons.Heart;
              const isVisible = visibleCards.includes(index);
              return (
                <Card
                  key={index}
                  className={`p-8 text-center hover:shadow-2xl transition-all duration-700 border-gray-100 hover:border-blue-200 group cursor-pointer transform hover:scale-105 hover:-translate-y-3 ${
                    isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 rounded-3xl flex items-center justify-center mx-auto transition-all duration-500 transform group-hover:rotate-6 group-hover:scale-110">
                      <IconComponent className="w-10 h-10 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;