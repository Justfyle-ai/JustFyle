import { PiggyBank, TrendingUp, Shield } from 'lucide-react'

export default function TaxPlanningPage() {
  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tax Planning Report</h1>
        <p className="text-gray-500 mt-1">
          Personalized recommendations to save you money next year.
        </p>
      </div>

      {/* Placeholder state */}
      <div className="bg-white border border-surface-300 rounded-2xl p-12 text-center">
        <PiggyBank size={48} className="mx-auto text-brand-300 mb-4" />
        <h2 className="text-lg font-semibold text-gray-900">
          Your tax planning report will appear here
        </h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          Once you&apos;ve completed your tax return through the AI chat, we&apos;ll generate a
          personalized report showing exactly how much you could save next year.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="bg-surface-200 rounded-xl p-4">
            <TrendingUp size={24} className="text-brand-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Avg. $4,340 savings</p>
          </div>
          <div className="bg-surface-200 rounded-xl p-4">
            <Shield size={24} className="text-brand-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">5 action items</p>
          </div>
          <div className="bg-surface-200 rounded-xl p-4">
            <PiggyBank size={24} className="text-brand-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">100% free</p>
          </div>
        </div>
      </div>
    </div>
  )
}
