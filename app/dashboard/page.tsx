import Link from 'next/link'
import { User, Briefcase, Users, Key, Home, Building, Scale, Map, ArrowRight } from 'lucide-react'

const DEMO_ACCOUNTS = [
  { slug: 'private-seller', title: 'Private Seller', description: 'Individual selling their own property', icon: User, color: 'bg-emerald-500' },
  { slug: 'independent-realtor', title: 'Independent Realtor', description: 'Freelance professional agent', icon: Briefcase, color: 'bg-blue-500' },
  { slug: 'agency-agent', title: 'Agency Agent', description: 'Agent working for a firm', icon: Users, color: 'bg-indigo-500' },
  { slug: 'private-landlord', title: 'Private Landlord', description: 'Individual renting out property', icon: Key, color: 'bg-amber-500' },
  { slug: 'property-manager', title: 'Property Manager', description: 'Professional management services', icon: Home, color: 'bg-orange-500' },
  { slug: 'letting-agent', title: 'Letting Agent', description: 'Broker for rental properties', icon: Building, color: 'bg-purple-500' },
  { slug: 'legal-agent', title: 'Legal Agent', description: 'Real estate lawyer or notary', icon: Scale, color: 'bg-rose-500' },
  { slug: 'surveyor', title: 'Surveyor', description: 'Property inspection and valuation', icon: Map, color: 'bg-teal-500' },
]

export default function DashboardSelector() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            ← Back to Homepage
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-500/20">
              K
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Select Demo Dashboard</h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl">
            Choose a role to experience their independent dashboard view. Each role has specialized tools, metrics, and workflows tailored for their position in the global property network.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_ACCOUNTS.map((account) => (
            <Link 
              key={account.slug}
              href={`/${account.slug}/dashboard`}
              className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 rounded-3xl hover:border-gray-700 transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`w-12 h-12 rounded-2xl ${account.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <account.icon className={`w-6 h-6 text-${account.color.replace('bg-', '')}`} />
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{account.title}</h3>
              <p className="text-sm text-gray-500 flex-1">{account.description}</p>
              
              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-white transition-colors">
                Enter Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
