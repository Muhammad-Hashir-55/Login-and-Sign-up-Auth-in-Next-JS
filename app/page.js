'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold">Welcome to Hashir`s Authentication and Login and Sign up App</h1>
      <button onClick={() => router.push('/login')} className="bg-blue-600 text-white px-6 py-2 rounded">Login</button>
      <button onClick={() => router.push('/signup')} className="bg-green-600 text-white px-6 py-2 rounded">Sign Up</button>
    </div>
  )
}
