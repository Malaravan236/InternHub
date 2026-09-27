import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

function FallbackLoader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 size={40} className="animate-spin text-emerald-600" />
    </div>
  );
}

export default function SuspenseLayout() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <Outlet />
    </Suspense>
  );
}
