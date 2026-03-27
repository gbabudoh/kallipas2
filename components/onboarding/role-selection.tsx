'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Building2, Briefcase, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

const roles = [
  {
    id: 'private',
    title: 'Private Seller',
    description: 'Selling your own property. Simple and direct.',
    icon: User,
  },
  {
    id: 'realtor',
    title: 'Realtor',
    description: 'Professional realtor managing multiple listings.',
    icon: Building2,
  },
  {
    id: 'agent',
    title: 'Real Estate Agent',
    description: 'Listing properties on behalf of clients.',
    icon: Briefcase,
  },
] as const

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCompleteOnboarding = async () => {
    if (!selectedRole) return
    setLoading(true)
    // TODO: Update profile role via Prisma server action
    router.push('/dashboard')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome to Kallipas
        </h1>
        <p className="text-lg text-gray-400">
          How will you be using the platform? Choose the role that fits you best.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {roles.map((role) => {
          const Icon = role.icon
          const isSelected = selectedRole === role.id

          return (
            <motion.button
              key={role.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRole(role.id)}
              className={clsx(
                'relative p-8 rounded-2xl border-2 transition-all text-left flex flex-col items-center justify-center text-center',
                isSelected
                  ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
              )}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 text-blue-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              )}
              <div
                className={clsx(
                  'w-16 h-16 rounded-full flex items-center justify-center mb-6',
                  isSelected ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'
                )}
              >
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{role.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{role.description}</p>
            </motion.button>
          )
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleCompleteOnboarding}
          disabled={!selectedRole || loading}
          className={clsx(
            'px-12 py-4 rounded-full font-bold transition-all',
            selectedRole && !loading
              ? 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          )}
        >
          {loading ? 'Finalizing...' : 'Continue to Dashboard'}
        </button>
      </div>
    </div>
  )
}
