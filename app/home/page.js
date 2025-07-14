'use client'
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setLoading(false);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) return <p className="text-center mt-10">Checking authentication...</p>;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Welcome to Homepage 🎉</h1>
        <p className="text-lg text-gray-600 mb-6">Logged in as: <span className="font-semibold">{userEmail}</span></p>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            Logout
          </button>

          <button
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-800 underline transition"
          >
            ⬅ Back to Start Page
          </button>
        </div>
      </div>
    </div>
  );
}
