'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Shield, MessageSquare, FileCheck, TrendingUp, CheckCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/chat')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <Link href="/" className="text-3xl font-bold text-gray-900">
              Just<span className="text-brand-500">Fyle</span>.ai
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mt-8">Welcome back</h2>
            <p className="text-gray-500 mt-2">Sign in to continue filing your taxes</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-brand-500 hover:text-brand-600 font-medium">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-brand-500 font-semibold hover:text-brand-600">
              Create one free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Feature Showcase */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 items-center justify-center p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border-2 border-white rounded-full" />
          <div className="absolute bottom-32 right-16 w-64 h-64 border-2 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-white rounded-full" />
        </div>

        <div className="relative z-10 max-w-lg">
          {/* Phone mockup */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-6 mb-8">
            <div className="bg-white rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JF</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">JustFyle AI</p>
                  <p className="text-xs text-brand-500">CPA Verified</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl rounded-bl-sm p-3">
                  <p className="text-xs text-gray-700">I found 3 deductions you missed last year. Want me to apply them? This could save you $2,847.</p>
                </div>
                <div className="bg-brand-500 rounded-xl rounded-br-sm p-3 ml-8">
                  <p className="text-xs text-white">Yes, apply them all!</p>
                </div>
                <div className="bg-gray-50 rounded-xl rounded-bl-sm p-3">
                  <p className="text-xs text-gray-700">Done! Your estimated refund just went from $1,200 to $4,047.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Value propositions */}
          <div className="space-y-4 text-white">
            <h3 className="text-2xl font-bold">File taxes as easily as sending a text</h3>
            <p className="text-brand-100 text-sm leading-relaxed">No 50 screens of questions. Just a conversation with your AI tax assistant, reviewed by a real CPA.</p>

            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={16} className="text-white" />
                </div>
                <p className="text-sm text-brand-50">Chat-based filing in under 10 minutes</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileCheck size={16} className="text-white" />
                </div>
                <p className="text-sm text-brand-50">Every return reviewed by a licensed CPA</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={16} className="text-white" />
                </div>
                <p className="text-sm text-brand-50">Free tax planning to save you money next year</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield size={16} className="text-white" />
                </div>
                <p className="text-sm text-brand-50">Money-back guarantee on tax savings</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="flex items-start gap-2">
                <CheckCircle size={18} className="text-green-300 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-brand-100 leading-relaxed">
                  <span className="font-semibold text-white">Savings Guarantee:</span> We&apos;ll find tax planning strategies that actually work for next year, or your money back. No gimmicks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
