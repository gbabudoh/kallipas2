import NewListingForm from '@/components/dashboard/new-listing-form'

export default function NewListingPage() {
  return (
    <div className="min-h-full">
      <div className="mb-12">
        <h1 className="text-4xl font-bold italic mb-2 tracking-tight">Create Listing</h1>
        <p className="text-gray-500">List your property on the global marketplace for a flat $25 fee.</p>
      </div>

      <NewListingForm />
    </div>
  )
}
