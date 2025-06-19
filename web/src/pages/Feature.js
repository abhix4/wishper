import React from "react";
import { Button } from "../components/ui/button";
import { Brain, Lock, Share2, Sparkles, Cloud, Palette } from "lucide-react";
import Login from "./Elements/Login";

function Features() {
  const features = [
    {
      icon: <Brain className="w-12 h-12 text-purple-600" />,
      title: "Thought Capture",
      description: "Quickly capture your ideas, insights, and reflections in a beautiful, distraction-free environment. Let your thoughts flow naturally.",
      highlight: "Seamless writing experience"
    },
    
  
    {
      icon: <Cloud className="w-12 h-12 text-purple-600" />,
      title: "Cloud Sync",
      description: "Access your thoughts from anywhere. Your ideas are always in sync across all your devices.",
      highlight: "Always available"
    },
    {
      icon: <Palette className="w-12 h-12 text-purple-600" />,
      title: "Beautiful Experience",
      description: "Enjoy a thoughtfully designed interface that makes writing and organizing your ideas a delightful experience.",
      highlight: "Designed for focus"
    }
  ];

  return (
    <div className=" h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white mt-[40px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0" dangerouslySetInnerHTML={{
        __html: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice"  width="100%"
        >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#f3e8ff;stop-opacity:0.5" />
                <stop offset="100%" style="stop-color:#e0f2fe;stop-opacity:0.5" />
              </linearGradient>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1" fill="#6b46c1" fillOpacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad1)" />
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        `
      }} />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="py-16 px-6 text-center">
          <h1 className="text-2xl md:text-6xl font-serif text-gray-800 mb-6">
            Powerful Features for Your Ideas
          </h1>
          <p className="text-[16px] md:text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to capture, organize, and nurture your thoughts in one beautiful place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg 
                         hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6 w-[50px] m-auto">{feature.icon}</div>
                <h3 className="text-[18px] md:text-2xl  font-medium text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-[14px] md:text-base text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <div className="text-[12px] md:text-sm font-medium text-purple-600">
                  {feature.highlight} →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className=" text-purple-400 pb-4">
           <Login/>
         
        </div>

        {/* Footer */}
        <div className="bg-Mypurple">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="text-center text-[12px] sm:text-[16px] text-gray-600">
              <p>© 2025 IdeaVault. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;