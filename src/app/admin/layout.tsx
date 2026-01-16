import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { signOut } from '@/app/auth/actions';
import { SessionProvider } from '@/components/SessionProvider';
import { LogOut, User } from 'lucide-react';
import { Suspense } from 'react';
import Navigation from '@/components/Navigation';

function LoadingState() {
  return (
    <div className="animate-pulse min-h-screen flex">
      <div className="w-64 bg-gray-900">
        <div className="h-24 border-b border-gray-800" />
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-gray-800 rounded" />
          ))}
        </div>
      </div>
      <div className="flex-1">
        <div className="h-16 bg-gray-100" />
      </div>
    </div>
  );
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return (
    <SessionProvider>
      <ProtectedRoute>
        <Suspense fallback={<LoadingState />}>
          <div className="min-h-screen flex bg-gray-50 isolate relative z-[100]">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 text-gray-900 flex flex-col shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold leading-none text-gray-900">
                      Admin Dashboard
                    </h1>
                    <p className="text-sm text-gray-600 mt-1 truncate max-w-[180px]">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
              <Navigation />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen bg-white">
              <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Admin Panel
                    </h2>
                    <form action={signOut}>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg
                                                         bg-gray-100 hover:bg-gray-200
                                                         text-gray-700 text-sm font-medium
                                                         transition-all duration-200
                                                         hover:shadow-sm active:scale-95"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </form>
                  </div>
                </div>
              </header>

              <main className="flex-1 w-full bg-white">
                <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
              </main>
            </div>
          </div>
        </Suspense>
      </ProtectedRoute>
    </SessionProvider>
  );
}
