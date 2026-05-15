import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function FeatureCard({ icon, title, description, className = '' }: FeatureCardProps) {
  return (
    <div className={`flex items-center bg-[#3562de] bg-opacity-15 rounded-xl p-4 shadow-sm ${className}`}>
      <span className="mr-4">{icon}</span>
      <div>
        <div className="font-medium text-white text-base">{title}</div>
        <div className="text-xs text-white opacity-90 font-normal">{description}</div>
      </div>
    </div>
  );
}
