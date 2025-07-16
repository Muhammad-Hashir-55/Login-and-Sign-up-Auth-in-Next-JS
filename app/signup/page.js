'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '../../firebase';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // ✅ Create user with Firebase Auth
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // ✅ Store user details in Realtime Database
      await set(ref(database, 'users/' + uid), {
        email,
        username,
        phone,
        city,
        createdAt: new Date().toISOString()
      });

      alert('Sign up successful! Redirecting to login...');
      router.push('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Sign Up</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={e => setCity(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <div className="flex flex-col items-center gap-2 mt-6 text-sm">
          <p>
            Already have an account?{' '}
            <button onClick={() => router.push('/login')} className="text-blue-600 hover:text-blue-700 underline transition">
              Log in here
            </button>
          </p>
          <button onClick={() => router.push('/')} className="text-gray-600 hover:text-gray-800 underline transition">
            ⬅ Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
