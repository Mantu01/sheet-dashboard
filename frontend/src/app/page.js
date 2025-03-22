"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Cloud, ChartBar, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion"; // Install framer-motion for advanced animations

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-indigo-950 to-black text-white overflow-hidden">
      <div className="relative">
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),_transparent_60%)] animate-pulse-slow pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_rgba(59,130,246,0.05)_0%,_rgba(168,85,247,0.05)_100%)] animate-gradient-shift" />

        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-32 relative z-10">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            {/* Left Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center md:text-left md:max-w-2xl"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight tracking-tighter uppercase">
                Data Reimagined
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light leading-relaxed max-w-lg mx-auto md:mx-0 drop-shadow-md">
                Elevate your Google Sheets into a futuristic dashboard. Unravel insights with breathtaking visuals and unparalleled precision.
              </p>
              <div className="flex gap-6 justify-center md:justify-start">
                {isAuthenticated ? (
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 transform hover:scale-105"
                    onClick={() => router.push("/dashboard")}
                  >
                    <LayoutDashboard className="mr-2 h-6 w-6 animate-spin-slow" />
                    Enter Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-105"
                      onClick={() => router.push("/login")}
                    >
                      Sign In
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400/10 font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-purple-400/50 transition-all duration-500 transform hover:scale-105"
                      onClick={() => router.push("/signup")}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </motion.div>

            {/* Right Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="md:max-w-lg relative"
            >
              <div className="relative rounded-2xl shadow-3xl overflow-hidden border border-blue-500/30 transform hover:scale-110 transition-transform duration-700 ease-out">
                <img
                  src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1742623583/Screenshot_2025-03-21_212244_tb2hgb.png"
                  alt="Dashboard Preview"
                  className="w-full h-auto object-cover transform hover:brightness-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-transparent pointer-events-none animate-gradient-flow" />
                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-blue-400 rounded-full opacity-30 animate-float"
                      style={{
                        width: `${Math.random() * 8 + 4}px`,
                        height: `${Math.random() * 8 + 4}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${Math.random() * 5 + 5}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="py-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              Next-Level Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  icon: <Cloud className="text-blue-400 h-12 w-12 mb-6 animate-pulse" />,
                  title: "Instant Sync",
                  desc: "Connect to Google Sheets with zero friction, powered by cutting-edge tech.",
                },
                {
                  icon: <ChartBar className="text-purple-400 h-12 w-12 mb-6 animate-pulse" />,
                  title: "Hyper Visuals",
                  desc: "Immersive, interactive charts that redefine data storytelling.",
                },
                {
                  icon: <LayoutDashboard className="text-pink-400 h-12 w-12 mb-6 animate-pulse" />,
                  title: "Infinite Customization",
                  desc: "Craft dashboards that mirror your vision, pixel by pixel.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-8 border border-gray-800/50 hover:border-purple-500/70 hover:bg-gray-900/90 transition-all duration-500 shadow-xl hover:shadow-purple-500/30 relative overflow-hidden group"
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {feature.icon}
                  <h3 className="text-2xl font-semibold text-white mb-4 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Advanced CSS Animations */}
      <style jsx>{`
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        @keyframes gradientFlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 4s infinite ease-in-out;
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradientShift 15s infinite alternate;
        }
        .animate-gradient-flow {
          animation: gradientFlow 8s infinite linear;
        }
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
        .animate-spin-slow {
          animation: spinSlow 10s infinite linear;
        }
      `}</style>
    </main>
  );
}