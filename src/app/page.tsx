import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-surface-100 via-brand-50 to-surface-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Just<span className="text-brand-500">Fyle</span>.ai
        </h1>
        <p className="text-lg text-gray-600 max-w-md">
          AI-powered tax filing. CPA-reviewed. Done in 10 minutes.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-6 py-3 bg-white text-brand-500 border-2 border-brand-500 rounded-xl font-semibold hover:bg-brand-50 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
