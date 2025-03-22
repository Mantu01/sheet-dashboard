"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming you have a well-styled button component
import { useSelector } from "react-redux";
import { Cloud, ChartBar, LayoutDashboard } from "lucide-react"; // Example icons (install lucide-react if you don't have it)

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-100 to-gray-100 text-gray-900 py-20">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 to-transparent opacity-20 pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
            {/* Left Section: Hero Text and Description */}
            <div className="text-center md:text-left md:max-w-xl">
              <h1 className="text-5xl font-bold text-blue-700 mb-6 leading-tight">
                Unlock the Power of Your Google Sheets Data
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Transform raw data into actionable insights with our intuitive and
                powerful Sheet Dashboard. Visualize trends, track key metrics, and
                make data-driven decisions effortlessly.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                {isAuthenticated ? (
                  <Button size="lg" onClick={() => router.push("/dashboard")}>
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button size="lg" onClick={() => router.push("/login")}>
                      Sign In
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => router.push("/signup")}>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Right Section: Visual/Illustration (Replace with your actual image/component) */}
            <div className="md:max-w-lg">
              {/* You can replace this with an actual image or a custom component */}
              <div className="rounded-lg shadow-lg overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1742623583/Screenshot_2025-03-21_212244_tb2hgb.png"
                  alt="Dashboard Preview"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          <div className="py-16">
            <h2 className="text-3xl font-semibold text-blue-700 text-center mb-10">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <Cloud className="text-blue-500 h-8 w-8 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Seamless Integration
                </h3>
                <p className="text-gray-600">
                  Connect effortlessly with your Google Sheets in seconds. No
                  complex configurations required.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <ChartBar className="text-green-500 h-8 w-8 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Interactive Visualizations
                </h3>
                <p className="text-gray-600">
                  Create stunning charts and graphs to understand your data at a
                  glance.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <LayoutDashboard className="text-indigo-500 h-8 w-8 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Customizable Dashboards
                </h3>
                <p className="text-gray-600">
                  Tailor your dashboard to display the metrics that matter most to
                  you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}