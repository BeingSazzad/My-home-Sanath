"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

function RegisterRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const plan = searchParams.get("plan") || "free";
    const isLoggedIn = !!user?.user;

    if (isLoggedIn) {
      // If already logged in, redirect directly to subscription page with selected plan query
      router.replace(`/subscription?plan=${plan}`);
    } else {
      // Otherwise, direct to signup page
      router.replace(`/auth/signup?role=agent&plan=${plan}`);
    }
  }, [router, searchParams, user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1a3c6e] mb-4"></div>
      <p className="text-gray-500 font-medium">Redirecting you securely...</p>
    </div>
  );
}

export default function RegisterRedirectPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1a3c6e] mb-4"></div>
        <p className="text-gray-500 font-medium">Loading secure flow...</p>
      </div>
    }>
      <RegisterRedirectContent />
    </Suspense>
  );
}
