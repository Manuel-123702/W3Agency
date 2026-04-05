import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ShieldAlert, Home, Lock } from 'lucide-react'

export default async function StudioPage() {
  const { userId } = await auth()
  const user = await currentUser()

  // 1. If not logged in, Clerk Middleware handles the redirect to Sign-In
  if (!userId || !user) {
    redirect('/SignIn')
  }

  // 2. Check the "role" from Clerk Metadata
  // This is much better than hardcoding an email!
  const isAdmin = user.publicMetadata?.role === "admin"

  if (!isAdmin) {
    return (
      <main className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-2xl text-center border border-slate-200">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-amber-50 rounded-full border border-amber-100">
              <Lock className="w-12 h-12 text-amber-600" />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Restricted Area</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Authentication successful as <span className="font-medium text-slate-800">{user.primaryEmailAddress?.emailAddress}</span>.
            However, your account lacks <span className="text-red-600 font-bold">Admin Privileges</span> required for the .
          </p>

          <div className="space-y-4">
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 bg-sky-300 hover:bg-sky-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md"
            >
              <Home className="w-5 h-5" />
              Return to Website
            </Link>

            <p className="text-xs text-slate-400">
              Contact the system administrator to request access.
            </p>
          </div>
        </div>
      </main>
    )
  }

  // 3. If Admin, show the Sanity 
  return <NextStudio config={config} />
}