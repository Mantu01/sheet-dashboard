import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({
  size = 'medium',
  variant = 'cosmic',
  message = 'Initializing systems...',
  showProgress = true,
  progress = null,
  theme = 'light',
  enableSound = false,
  speed = 1,
}) => {
  const [randomTip, setRandomTip] = useState('');
  const [particles, setParticles] = useState([]);
  const audioRef = useRef(null);

  // Enhanced loading tips with context
  const loadingTips = [
    'Syncing with the universe...',
    'Warping through data streams...',
    'Calibrating quantum nodes...',
    'Rendering reality matrix...',
    'Charging hyperspace engines...',
  ];

  // Particle effect for extra flair
  useEffect(() => {
    setRandomTip(loadingTips[Math.floor(Math.random() * loadingTips.length)]);
    const newParticles = Array.from({ length: 20 }, () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 2 + 1,
    }));
    setParticles(newParticles);

    // Optional subtle loading sound
    if (enableSound) {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAAA');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.1;
      audioRef.current.play();
    }

    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, [enableSound]);

  // Dynamic configurations
  const sizeStyles = {
    small: { spinner: 'h-12 w-12', container: 'p-6', text: 'text-lg', orbit: 60 },
    medium: { spinner: 'h-16 w-16', container: 'p-8', text: 'text-xl', orbit: 80 },
    large: { spinner: 'h-24 w-24', container: 'p-12', text: 'text-2xl', orbit: 120 },
  };

  const variants = {
    cosmic: {
      spinner: 'border-t-indigo-500 border-r-purple-400 border-b-blue-500 border-l-violet-300',
      text: 'text-indigo-500',
      progress: 'bg-gradient-to-r from-indigo-500 to-purple-500',
      bg: 'bg-indigo-50/30',
      particle: 'bg-purple-300',
    },
    neon: {
      spinner: 'border-t-cyan-400 border-r-pink-400 border-b-teal-400 border-l-purple-400',
      text: 'text-cyan-500',
      progress: 'bg-gradient-to-r from-cyan-400 to-pink-400',
      bg: 'bg-gray-900/30',
      particle: 'bg-cyan-300',
    },
    nature: {
      spinner: 'border-t-emerald-500 border-r-lime-400 border-b-teal-500 border-l-green-300',
      text: 'text-emerald-600',
      progress: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      bg: 'bg-emerald-50/30',
      particle: 'bg-lime-300',
    },
  };

  const themes = {
    light: 'bg-gray-100/90 text-gray-900',
    dark: 'bg-gray-900/90 text-white',
  };

  const currentSize = sizeStyles[size];
  const currentVariant = variants[variant];
  const currentTheme = themes[theme];

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center ${currentTheme} backdrop-blur-md z-50 transition-all duration-500`}
      role="status"
      aria-live="polite"
      style={{ animation: `fadeIn 0.5s ease-in` }}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`${currentVariant.particle} rounded-full absolute animate-particle`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration / speed}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      <div 
        className={`${currentSize.container} relative bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-3xl border border-gray-200/50 dark:border-gray-700/50 transform transition-all duration-300 hover:scale-105`}
      >
        {/* Orbital Spinner System */}
        <div className="relative flex flex-col items-center space-y-8">
          <div className={`relative ${currentSize.spinner}`}>
            {/* Orbiting Particles */}
            <div className="absolute inset-0">
              {[0, 120, 240].map((angle) => (
                <div
                  key={angle}
                  className={`${currentVariant.particle} w-2 h-2 rounded-full absolute animate-orbit`}
                  style={{
                    transform: `rotate(${angle}deg) translateX(${currentSize.orbit}px)`,
                    animationDuration: `${2 / speed}s`,
                  }}
                />
              ))}
            </div>

            {/* Main Spinner with Holographic Effect */}
            <div 
              className={`absolute inset-0 rounded-full border-4 ${currentVariant.spinner} animate-spin`}
              style={{ 
                animationDuration: `${1 / speed}s`,
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-white/10 animate-spin-slow" />
            </div>

            {/* Core with Energy Pulse */}
            <div 
              className={`absolute inset-2 rounded-full ${currentVariant.bg} animate-pulse`}
              style={{ 
                animationDuration: `${1.5 / speed}s`,
                boxShadow: `inset 0 0 15px ${currentVariant.text.replace('text-', '')}20`,
              }}
            >
              <div className="absolute inset-0 rounded-full animate-energy-pulse" />
            </div>
          </div>

          {/* Enhanced Text Display */}
          <div className="flex flex-col items-center space-y-3">
            <h3 
              className={`${currentSize.text} font-bold tracking-tight bg-gradient-to-r ${currentVariant.progress} bg-clip-text text-transparent`}
            >
              Loading Dashboard
            </h3>

            {/* Dynamic Micro-interaction Dots */}
            <div className="flex space-x-2" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`${currentVariant.text} text-xl animate-[bounce_0.6s_infinite]`}
                  style={{ animationDelay: `${i * 150 / speed}ms` }}
                >
                  •
                </span>
              ))}
            </div>
          </div>

          {/* Advanced Progress Bar */}
          {showProgress && (
            <div className="w-80 h-2.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden relative">
              <div 
                className={`${currentVariant.progress} h-full transition-all duration-500 ease-out relative`}
                style={{ 
                  width: progress !== null ? `${progress}%` : '70%',
                  animation: progress === null ? `progress-indeterminate ${2 / speed}s infinite` : 'none',
                }}
              >
                <div className="absolute inset-0 bg-white/30 animate-shimmer" />
              </div>
            </div>
          )}

          {/* Interactive Message with Tooltip */}
          <p 
            className="text-sm font-medium text-gray-600 dark:text-gray-300 animate-fade-in cursor-help relative group"
            title="Loading tip"
          >
            {randomTip || message}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Keep waiting!
            </span>
          </p>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(${currentSize.orbit}px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(${currentSize.orbit}px) rotate(-360deg); }
        }
        @keyframes particle {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
        @keyframes energy-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-orbit {
          animation: orbit linear infinite;
        }
        .animate-particle {
          animation: particle linear infinite;
        }
        .animate-energy-pulse {
          animation: energy-pulse ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['cosmic', 'neon', 'nature']),
  message: PropTypes.string,
  showProgress: PropTypes.bool,
  progress: PropTypes.number,
  theme: PropTypes.oneOf(['light', 'dark']),
  enableSound: PropTypes.bool,
  speed: PropTypes.number,
};

export default LoadingSpinner;