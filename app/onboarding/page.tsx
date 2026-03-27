import RoleSelection from '@/components/onboarding/role-selection'

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
      <RoleSelection />
    </main>
  )
}
