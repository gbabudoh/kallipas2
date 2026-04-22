import { Metadata } from 'next'
import Navbar from "@/components/navigation/navbar"
import { MapPin, Star, CheckCircle2, MessageSquare, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Professional Directory",
  description: "Connect with verified private sellers, independent realtors, and legal professionals across the global real estate market.",
}

const CATEGORY_LABELS: Record<string, string> = {
  PRIVATE_SELLER:     'Private Sellers',
  INDEPENDENT_REALTOR:'Independent Realtors',
  AGENCY_AGENT:       'Agency Agents',
  PRIVATE_LANDLORD:   'Private Landlords',
  PROPERTY_MANAGER:   'Property Managers',
  LETTING_AGENT:      'Letting Agents',
  LEGAL_AGENT:        'Legal Agents',
  SURVEYOR:           'Surveyors',
  BUYER:              'Buyers',
}

type Member = {
  id: string
  name: string
  title: string
  location: string
  rating: number
  reviews: number
  type: string
  verified: boolean
  joined: string
  avatar: string
  tags: string[]
  bio: string
}

const MOCK_MEMBERS: Member[] = [
  // Private Sellers
  {
    id: '1', name: 'Sarah Mitchell', title: 'Private Seller', location: 'Manchester, UK',
    rating: 4.8, reviews: 12, type: 'PRIVATE_SELLER', verified: true, joined: 'Jan 2025',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    tags: ['Residential', '3-Bed', 'Freehold'],
    bio: 'Selling my family home of 14 years. Chain-free and motivated to proceed quickly.',
  },
  {
    id: '2', name: 'James Okafor', title: 'Private Seller', location: 'Birmingham, UK',
    rating: 4.6, reviews: 8, type: 'PRIVATE_SELLER', verified: true, joined: 'Mar 2025',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    tags: ['Apartment', 'City Centre', 'Leasehold'],
    bio: 'Relocating abroad. Motivated seller, all documents ready for a fast transaction.',
  },
  {
    id: '3', name: 'Priya Sharma', title: 'Private Seller', location: 'Leeds, UK',
    rating: 4.9, reviews: 5, type: 'PRIVATE_SELLER', verified: false, joined: 'Feb 2026',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    tags: ['Semi-Detached', '4-Bed', 'Garden'],
    bio: 'Recently renovated property with modern interiors throughout. No chain.',
  },

  // Independent Realtors
  {
    id: '4', name: 'Rick Fontaine', title: 'Independent Realtor', location: 'London, UK',
    rating: 4.9, reviews: 134, type: 'INDEPENDENT_REALTOR', verified: true, joined: 'Aug 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rick',
    tags: ['Sales', 'Lettings', 'Investment'],
    bio: '12 years experience across central London markets. Specialising in off-market deals and investor portfolios.',
  },
  {
    id: '5', name: 'Emma Devereux', title: 'Independent Realtor', location: 'Bristol, UK',
    rating: 4.7, reviews: 88, type: 'INDEPENDENT_REALTOR', verified: true, joined: 'Nov 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    tags: ['Residential', 'First-Time Buyers', 'Valuation'],
    bio: 'Passionate about helping first-time buyers navigate the market with confidence and clarity.',
  },
  {
    id: '6', name: 'Daniel Abara', title: 'Independent Realtor', location: 'Edinburgh, UK',
    rating: 4.8, reviews: 61, type: 'INDEPENDENT_REALTOR', verified: true, joined: 'Jan 2025',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel',
    tags: ['Commercial', 'Residential', 'Rural'],
    bio: 'Covering Edinburgh and the Lothians with deep local knowledge and a transparent approach.',
  },

  // Agency Agents
  {
    id: '7', name: 'Alice Thornton', title: 'Agency Agent', location: 'London, UK',
    rating: 4.7, reviews: 210, type: 'AGENCY_AGENT', verified: true, joined: 'Jun 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    tags: ['Luxury', 'New Builds', 'International'],
    bio: 'Senior negotiator at a top-tier London agency. Consistent top performer across prime postcodes.',
  },
  {
    id: '8', name: 'Marcus Webb', title: 'Agency Agent', location: 'Manchester, UK',
    rating: 4.5, reviews: 97, type: 'AGENCY_AGENT', verified: true, joined: 'Sep 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    tags: ['Sales', 'Lettings', 'HMO'],
    bio: 'Specialist in Northern England residential and HMO markets with a strong investor network.',
  },

  // Private Landlords
  {
    id: '9', name: 'Larry Goldstein', title: 'Private Landlord', location: 'Leeds, UK',
    rating: 4.5, reviews: 32, type: 'PRIVATE_LANDLORD', verified: true, joined: 'Oct 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Larry',
    tags: ['Long Let', 'Professional Tenants', 'Furnished'],
    bio: 'Portfolio landlord with 4 properties across Leeds. Long-term lets only. Prompt maintenance.',
  },
  {
    id: '10', name: 'Fatima Al-Hassan', title: 'Private Landlord', location: 'Cardiff, UK',
    rating: 4.9, reviews: 18, type: 'PRIVATE_LANDLORD', verified: true, joined: 'Dec 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
    tags: ['Student Lets', 'Bills Included', 'Short-Term'],
    bio: 'Student accommodation specialist near Cardiff University. All bills included. No DSS restrictions.',
  },

  // Property Managers
  {
    id: '11', name: 'Mike Reynolds', title: 'Property Manager', location: 'Liverpool, UK',
    rating: 4.6, reviews: 74, type: 'PROPERTY_MANAGER', verified: true, joined: 'Jul 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    tags: ['Full Management', 'Block Management', 'Commercial'],
    bio: 'Full-service property management across Merseyside. 45 units under management. 24/7 maintenance line.',
  },
  {
    id: '12', name: 'Sophie Clarkson', title: 'Property Manager', location: 'Sheffield, UK',
    rating: 4.8, reviews: 52, type: 'PROPERTY_MANAGER', verified: true, joined: 'Feb 2025',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    tags: ['Residential', 'Tenant Liaison', 'Compliance'],
    bio: 'ARLA qualified with 8 years in residential management. Expert in compliance and tenant relations.',
  },

  // Letting Agents
  {
    id: '13', name: 'Linda Park', title: 'Letting Agent', location: 'London, UK',
    rating: 4.8, reviews: 163, type: 'LETTING_AGENT', verified: true, joined: 'Apr 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linda',
    tags: ['Central London', 'Corporate Lets', 'Short-Term'],
    bio: 'Specialist in corporate and executive lets across Zone 1–2. NAEA accredited. Tenant referencing.',
  },
  {
    id: '14', name: 'Kwame Asante', title: 'Letting Agent', location: 'Nottingham, UK',
    rating: 4.6, reviews: 89, type: 'LETTING_AGENT', verified: true, joined: 'Aug 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame',
    tags: ['Student Lets', 'HMO Licencing', 'Affordable'],
    bio: 'Student and professional lets in Nottingham. Expert in HMO licensing and affordable housing.',
  },

  // Legal Agents
  {
    id: '15', name: 'Luke Hargreaves', title: 'Solicitor', location: 'London, UK',
    rating: 5.0, reviews: 47, type: 'LEGAL_AGENT', verified: true, joined: 'May 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luke',
    tags: ['Conveyancing', 'Commercial', 'Leasehold Reform'],
    bio: 'Senior property solicitor with 15 years in residential and commercial conveyancing. Fixed-fee service.',
  },
  {
    id: '16', name: 'Amara Osei', title: 'Property Lawyer', location: 'Birmingham, UK',
    rating: 4.9, reviews: 33, type: 'LEGAL_AGENT', verified: true, joined: 'Sep 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amara',
    tags: ['Residential Conveyancing', 'Remortgage', 'New Build'],
    bio: 'Fast, transparent conveyancing with online case tracking. Regulated by the SRA.',
  },

  // Surveyors
  {
    id: '17', name: 'Sam Whitfield', title: 'Chartered Surveyor', location: 'Manchester, UK',
    rating: 4.9, reviews: 128, type: 'SURVEYOR', verified: true, joined: 'Mar 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    tags: ['RICS Level 2', 'RICS Level 3', 'Valuation'],
    bio: 'RICS chartered surveyor. Level 2 and Level 3 surveys across Greater Manchester. 5-day turnaround.',
  },
  {
    id: '18', name: 'Niamh Brennan', title: 'Building Surveyor', location: 'Dublin, IE',
    rating: 4.8, reviews: 64, type: 'SURVEYOR', verified: true, joined: 'Jun 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Niamh',
    tags: ['Structural', 'Damp & Timber', 'Pre-Purchase'],
    bio: 'Specialist in pre-purchase structural assessments and damp investigations. Clear, jargon-free reports.',
  },

  // Buyers
  {
    id: '19', name: 'Ben Carter', title: 'Property Buyer', location: 'London, UK',
    rating: 4.2, reviews: 6, type: 'BUYER', verified: true, joined: 'Mar 2026',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ben',
    tags: ['Cash Buyer', 'Chain-Free', 'Residential'],
    bio: 'Cash buyer looking for a 3–4 bed family home in South London. Ready to proceed immediately.',
  },
  {
    id: '20', name: 'Chloe Barret', title: 'Property Buyer', location: 'Bristol, UK',
    rating: 4.5, reviews: 3, type: 'BUYER', verified: false, joined: 'Mar 2026',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe',
    tags: ['First-Time Buyer', 'Mortgage Approved', 'Apartment'],
    bio: 'First-time buyer with mortgage in principle approved. Looking for a 1–2 bed apartment near the city.',
  },
]

export default async function AgentsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const { type } = await searchParams
  const label = type ? CATEGORY_LABELS[type] || 'Our Members' : 'Our Members'

  const members = type
    ? MOCK_MEMBERS.filter((m) => m.type === type)
    : MOCK_MEMBERS

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0eaa99] mb-3">
            Kallipas Directory
          </p>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 italic mb-4">
            {label}
          </h1>
          <p className="text-slate-500 font-medium">
            {members.length} verified member{members.length !== 1 ? 's' : ''} in this category
          </p>
        </div>

        {/* Grid */}
        {members.length === 0 ? (
          <div className="bg-white rounded-[3rem] border border-slate-100 p-24 text-center shadow-sm">
            <p className="text-slate-400 font-bold text-lg">No members found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:shadow-[#0eaa99]/10 hover:border-[#0eaa99]/30 transition-all duration-500 flex flex-col gap-6 cursor-pointer group/card"
              >
                {/* Top row */}
                <div className="flex items-start gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-14 h-14 rounded-2xl bg-slate-100 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-black text-slate-900 tracking-tight truncate">{member.name}</h3>
                      {member.verified && (
                        <CheckCircle2 className="w-4 h-4 text-[#0eaa99] flex-shrink-0 cursor-pointer" />
                      )}
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{member.title}</p>
                    <div className="flex items-center gap-1.5 mt-1.5 cursor-pointer group/loc">
                      <MapPin className="w-3 h-3 text-slate-300 flex-shrink-0 group-hover/loc:text-[#0eaa99] transition-colors cursor-pointer" />
                      <span className="text-xs text-slate-400 font-medium group-hover/loc:text-slate-600 transition-colors cursor-pointer">{member.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{member.bio}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-pointer hover:bg-[#0eaa99]/10 hover:text-[#0eaa99] transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Rating + joined */}
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                  <div className="flex items-center gap-1.5 text-amber-400 cursor-pointer hover:scale-105 transition-transform origin-left">
                    <Star className="w-3.5 h-3.5 fill-amber-400 cursor-pointer" />
                    <span className="text-slate-700 cursor-pointer">{member.rating}</span>
                    <span className="text-slate-300 cursor-pointer">({member.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                    <Calendar className="w-3.5 h-3.5 cursor-pointer" />
                    <span className="cursor-pointer">Joined {member.joined}</span>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full py-3.5 bg-slate-950 hover:bg-[#0eaa99] text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]">
                  <MessageSquare className="w-3.5 h-3.5 cursor-pointer" />
                  Contact
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
