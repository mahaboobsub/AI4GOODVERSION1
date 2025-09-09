import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';

const SuccessStories = ({ stories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === stories.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [stories.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? stories.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === stories.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
              <Heart className="w-4 h-4" />
              Real Impact Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Stories of Hope
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real patients, real impact. Discover how BloodBridge AI is transforming
              lives across India, one transfusion at a time.
            </p>
          </div>

          {/* Stories Carousel */}
          <div className="relative">
            <Card className="p-8 md:p-12 bg-white shadow-xl border-0 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Story Content */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Quote className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {stories[currentIndex].name}
                      </h3>
                      <div className="text-red-600 font-medium mb-4">
                        Age {stories[currentIndex].age} • Thalassemia Patient
                      </div>
                    </div>
                  </div>

                  <blockquote className="text-lg text-gray-700 leading-relaxed italic">
                    "{stories[currentIndex].story}"
                  </blockquote>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-green-600">
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">{stories[currentIndex].impact}</span>
                    </div>
                  </div>
                </div>

                {/* Story Image */}
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-red-100 to-blue-100 p-8">
                    <img
                      src={stories[currentIndex].image}
                      alt={stories[currentIndex].name}
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                    />
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevious}
                  className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {stories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-red-600 scale-125'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNext}
                  className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
              <div className="text-gray-600">Patient Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Emergency Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">Zero</div>
              <div className="text-gray-600">Missed Appointments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;