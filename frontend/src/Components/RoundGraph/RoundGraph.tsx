import React from 'react';

interface RoundGraphProps {
  progress: number;
  children?: React.ReactNode;
}

const RoundGraph: React.FC<RoundGraphProps> = ({ progress, children }) => {
  const radius = 50;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="roundGraphContainer">
      <svg width="100%" height="100%" viewBox="0 0 120 120">
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="31.82%" stopColor="#3045FF" />
            <stop offset="44.84%" stopColor="#12B8FF" />
            <stop offset="73.86%" stopColor="#01FA75" />
          </linearGradient>
        </defs>
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="rgba(99, 189, 201, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={0}
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        {children}
      </svg>
    </div>
  );
};

export default RoundGraph;
