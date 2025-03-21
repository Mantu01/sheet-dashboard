"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming you have a button component
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const {isAuthenticated}=useSelector(state=>state.auth)

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to Sheet Dashboard</h1>
        <p className="text-lg text-gray-700">
          A powerful and easy-to-use dashboard to manage and analyze your Google Sheets data efficiently.
        </p>

        <div className="flex gap-4 justify-center mt-6">
          {
            isAuthenticated? (
              <Button onClick={() => router.push("/dashboard")}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button onClick={() => router.push("/login")}>Sign In</Button>
                <Button onClick={() => router.push("/signup")}>Sign Up</Button>
              </>
            )
          }
        </div>
      </div>
    </main>
  );
}
