'use client'
import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      alert('Please enter your email first!');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Check your inbox. In case also check Spam Folder');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition"
            type="submit"
          >
            Login
          </button>
        </form>

        {/* Forgot password */}
        <div className="text-center mt-3">
          <button
            onClick={handleResetPassword}
            className="text-sm text-red-600 hover:text-red-700 underline transition"
          >
            Forgot Password?
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center gap-2 mt-6 text-sm">
          <p>
            Don&apos;t have an account?{' '}
            <button
              onClick={() => router.push('/signup')}
              className="text-green-600 hover:text-green-700 underline transition"
            >
              Sign up here
            </button>
          </p>
          <button
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-800 underline transition"
          >
            ⬅ Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
