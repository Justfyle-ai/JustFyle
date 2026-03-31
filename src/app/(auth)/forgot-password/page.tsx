'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-100 via-brand-50 to-surface-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-gray-900">
            Just<span className="text-brand-500">Fyle</span>.ai
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-surface-300 p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Reset password</h2>
          <p className="text-gray-500 text-center mt-1 mb-6">
            We&apos;ll send you a link to reset your password
          </p>

          {success ? (
            <div className="text-center space-y-4">
              <div className="bg-brand-50 text-brand-700 px-4 py-3 rounded-xl text-sm">
                Check your email for a password reset link.
              </div>
              <Link
                href="/login"
                className="text-brand-500 font-medium hover:text-brand-600 text-sm"
              >
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <p className="text-center text-sm text-gray-500">
                <Link href="/login" className="text-brand-500 font-medium hover:text-brand-600">
                  Back to login
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
