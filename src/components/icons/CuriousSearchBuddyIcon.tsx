
import React from "react";

interface CuriousSearchBuddyIconProps {
  className?: string;
  size?: number;
  variant?: "default" | "animated" | "simple";
}

const CuriousSearchBuddyIcon: React.FC<CuriousSearchBuddyIconProps> = ({
  className,
  size = 24,
  variant = "default",
}) => {
  if (variant === "simple") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M15 15L21 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 6.5V10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="13" r="1" fill="currentColor" />
      </svg>
    );
  }
  
  if (variant === "animated") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <style>
          {`
            @keyframes pulse {
              0% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.1); opacity: 1; }
              100% { transform: scale(1); opacity: 0.8; }
            }
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .search-pulse {
              animation: pulse 2s infinite ease-in-out;
              transform-origin: center;
            }
            .search-rotate {
              animation: rotate 10s infinite linear;
              transform-origin: center;
            }
          `}
        </style>
        <circle 
          cx="10" 
          cy="10" 
          r="8" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none" 
          className="search-rotate"
        />
        <path
          d="M10 6.5V10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="13" r="1" fill="currentColor" />
        <path
          d="M15 15L21 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="search-pulse"
        />
        <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.2" className="search-pulse" />
      </svg>
    );
  }
  
  // default variant
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9b87f5" />
        <stop offset="100%" stopColor="#7E69AB" />
      </linearGradient>
      <circle 
        cx="10" 
        cy="10" 
        r="8" 
        stroke="url(#grad)" 
        strokeWidth="2" 
        fill="none" 
      />
      <path
        d="M10 6.5V10"
        stroke="url(#grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="13" r="1" fill="url(#grad)" />
      <path
        d="M15 15L21 21"
        stroke="url(#grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CuriousSearchBuddyIcon;
