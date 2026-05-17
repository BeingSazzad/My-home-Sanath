"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function RegisterRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const plan = searchParams.get("plan") || "free";
    // Redirect /register?plan=pro to /auth/signup?role=agent&plan=${plan}
    router.replace(`/auth/signup?role=agent&plan=${plan}`);
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1a3c6e] mb-4"></div>
      <p className="text-gray-500 font-medium">Redirecting you to secure registration...</p>
    </div>
  );
}

export default function RegisterRedirectPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1a3c6e] mb-4"></div>
        <p className="text-gray-500 font-medium">Loading checkout flow...</p>
      </div>
    }>
      <RegisterRedirectContent />
    </Suspense>
  );
}
