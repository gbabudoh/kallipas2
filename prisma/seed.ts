import prisma from '../lib/prisma'
import { UserRole } from '../prisma/client'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('Start seeding...')

  const hashedPassword = await bcrypt.hash('Kallipas2026!', 12)

  const demoUsers = [
    {
      username: 'demo_seller',
      email: 'privateseller@kallipas.com',
      password: hashedPassword,
      fullName: 'Sarah (Private Seller)',
      role: UserRole.PRIVATE_SELLER,
      trustScore: 4.8,
      isVerified: true,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
      username: 'demo_realtor',
      email: 'realtor@kallipas.com',
      password: hashedPassword,
      fullName: 'Rick (Independent Realtor)',
      role: UserRole.INDEPENDENT_REALTOR,
      trustScore: 4.9,
      isVerified: true,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rick',
    },
    {
      username: 'demo_agency',
      email: 'agency@kallipas.com',
      password: hashedPassword,
      fullName: 'Alice (Agency Agent)',
      role: UserRole.AGENCY_AGENT,
      trustScore: 4.7,
      isVerified: true,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    },
    {
      username: 'demo_landlord',
      email: 'landlord@kallipas.com',
      password: hashedPassword,
      fullName: 'Larry (Private Landlord)',
      role: UserRole.PRIVATE_LANDLORD,
      trustScore: 4.5,
      isVerified: true,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Larry',
    },
    {
      username: 'demo_manager',
      email: 'manager@kallipas.com',
      password: hashedPassword,
      fullName: 'Mike (Property Manager)',
      role: UserRole.PROPERTY_MANAGER,
      trustScore: 4.6,
      isVerified: true,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    {
      username: 'demo_letting',
      email: 'letting@kallipas.com',
      password: hashedPassword,
      fullName: 'Linda (Letting Agent)',
      role: UserRole.LETTING_AGENT,
      trustScore: 4.8,
      isVerified: true,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linda',
    },
    {
      username: 'demo_legal',
      email: 'legal@kallipas.com',
      password: hashedPassword,
      fullName: 'Luke (Legal Agent)',
      role: UserRole.LEGAL_AGENT,
      trustScore: 5.0,
      isVerified: true,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luke',
    },
    {
      username: 'demo_surveyor',
      email: 'surveyor@kallipas.com',
      password: hashedPassword,
      fullName: 'Sam (Surveyor)',
      role: UserRole.SURVEYOR,
      trustScore: 4.9,
      isVerified: true,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    },
    {
      username: 'demo_buyer',
      email: 'buyer@kallipas.com',
      password: hashedPassword,
      fullName: 'Ben (Buyer)',
      role: UserRole.BUYER,
      trustScore: 4.2,
      isVerified: true,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ben',
    },
  ]

  for (const user of demoUsers) {
    const profile = await prisma.profile.upsert({
      where: { username: user.username },
      update: user,
      create: user,
    })
    console.log(`Created/Updated profile for ${profile.username} with email ${profile.email}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
