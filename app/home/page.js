'use client'
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { auth, database } from '../../firebase';
import Script from 'next/script';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [userData, setUserData] = useState({ username: '', phone: '', city: '' });



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData({
            username: data.username || '',
            phone: data.phone || '',
            city: data.city || '',
          });
        }
        setLoading(false);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) return <p className="text-center mt-10">Checking authentication...</p>;

  return (
    <>
      {/* ✅ Load Dialogflow script */}
      <Script
        src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
        strategy="afterInteractive"
      />
      
      {/* ✅ Fix Chatbot Positioning */}
      <Script id="df-messenger-style" strategy="afterInteractive">
        {`
          df-messenger {
            position: fixed !important;
            bottom: 16px;
            right: 16px;
            z-index: 999;
          }
        `}
      </Script>

      {/* ✅ UI Content */}
      <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-green-700 mb-4">Welcome to Homepage 🎉</h1>
          <p className="text-lg text-gray-700 mb-1">
            Logged in as: <span className="font-semibold">{userEmail}</span>
          </p>
          <p className="text-md text-gray-600">Username: <span className="font-semibold">{userData.username}</span></p>
          <p className="text-md text-gray-600">Phone: <span className="font-semibold">{userData.phone}</span></p>
          <p className="text-md text-gray-600 mb-6">City: <span className="font-semibold">{userData.city}</span></p>

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

      {/* ✅ Chatbot Widget */}
      <df-messenger
        intent="WELCOME"
        chat-title="KhudaHafizAssistant"
        agent-id="f6b9ec20-b62f-482e-b185-566f0767329e"
        language-code="en"
        chat-icon="https://instagram.fskt12-1.fna.fbcdn.net/v/t51.2885-19/482749231_2277686359298366_270671872563719339_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fskt12-1.fna.fbcdn.net&_nc_cat=102&_nc_oc=Q6cZ2QHe08xG_zO1BqxBndE6jJusY8RQg-lCuzOuDSpX24aotVavGvpclDxsGlh3iWs9k2E&_nc_ohc=cKkK_kYQgpkQ7kNvwEZs3TH&_nc_gid=QXcwS92Sjd-uK2_yvcCA0Q&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfSwJohaNs3FadSpNY8QrMVFGiA1qg86U2UYs5mfvhfyIQ&oe=68879A15&_nc_sid=7a9f4b"
      ></df-messenger>
      
    </>
    
  );
}
