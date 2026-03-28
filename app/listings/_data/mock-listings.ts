export type MockListing = {
  id: string
  title: string
  address: string
  city: string
  country: string
  price: string
  listingType: string
  propertyType: string
  beds: number
  baths: number
  sqft: number
  tag: string
  verified: boolean
  seller: string
  description: string
  amenities: string[]
  isMock: true
}

export const MOCK_LISTINGS: MockListing[] = [
  // United Kingdom
  {
    id: 'm1', title: 'Victorian Terrace House', address: '14 Elmwood Road', city: 'Manchester', country: 'United Kingdom',
    price: '£485,000', listingType: 'sale', propertyType: 'residential',
    beds: 3, baths: 2, sqft: 1340, tag: 'New to Market', verified: true, seller: 'Sarah Mitchell',
    description: 'A beautifully presented Victorian terrace house situated in the heart of Manchester. The property features original period features throughout, including exposed brick, high ceilings, and bay windows. The ground floor offers an open-plan kitchen/dining room and a spacious lounge. Three double bedrooms upstairs, with a master en-suite. South-facing rear garden. No chain.',
    amenities: ['Central Heating', 'Double Glazing', 'South-Facing Garden', 'Off-Street Parking', 'Period Features'],
    isMock: true,
  },
  {
    id: 'm2', title: 'Modern City Apartment', address: '9th Floor, Harbour Tower', city: 'Liverpool', country: 'United Kingdom',
    price: '£310,000', listingType: 'sale', propertyType: 'residential',
    beds: 2, baths: 1, sqft: 890, tag: 'Price Reduced', verified: true, seller: 'Rick Fontaine',
    description: 'Stunning 9th-floor apartment in the iconic Harbour Tower development with panoramic views of the River Mersey. Modern open-plan living space, high-spec kitchen with integrated appliances, floor-to-ceiling windows. Concierge service, gymnasium, and roof terrace.',
    amenities: ['Concierge', 'Gymnasium', 'Roof Terrace', 'Secure Parking', 'River Views'],
    isMock: true,
  },
  {
    id: 'm3', title: '4-Bed Detached Home', address: '7 Birchwood Close', city: 'Leeds', country: 'United Kingdom',
    price: '£625,000', listingType: 'sale', propertyType: 'residential',
    beds: 4, baths: 3, sqft: 2100, tag: 'Featured', verified: true, seller: 'Emma Devereux',
    description: 'Exceptional detached family home on a quiet cul-de-sac. Fully renovated to the highest standard with a designer kitchen, four double bedrooms — master with walk-in wardrobe and en-suite — and a large landscaped rear garden. Double garage and ample off-road parking.',
    amenities: ['Double Garage', 'Landscaped Garden', 'Underfloor Heating', 'Smart Home', 'Walk-In Wardrobe'],
    isMock: true,
  },
  {
    id: 'm4', title: 'Studio Flat — City Centre', address: 'Flat 3B, Central Quarter', city: 'Birmingham', country: 'United Kingdom',
    price: '£1,450 / mo', listingType: 'rent', propertyType: 'residential',
    beds: 1, baths: 1, sqft: 420, tag: 'Available Now', verified: true, seller: 'Linda Park',
    description: 'Stylish studio flat in the heart of Birmingham city centre. Modern fitted kitchen, sleek bathroom, and plenty of natural light. Ideal for a professional or couple. Available immediately. Bills negotiable. Close to Grand Central, Bullring, and major transport links.',
    amenities: ['Furnished', 'Bills Negotiable', 'City Centre Location', 'Secure Entry', 'Broadband Included'],
    isMock: true,
  },
  {
    id: 'm5', title: 'Grade A Office Suite', address: 'Unit 12, Innovation Quarter', city: 'Sheffield', country: 'United Kingdom',
    price: '£2,800 / mo', listingType: 'rent', propertyType: 'commercial',
    beds: 0, baths: 2, sqft: 1800, tag: 'Commercial', verified: false, seller: 'Marcus Webb',
    description: 'Premium Grade A office suite in Sheffield\'s thriving Innovation Quarter. Open-plan floor plate with dedicated meeting rooms, breakout areas, and a private terrace. Air conditioning, raised flooring, and Category 6 data cabling throughout. Available on flexible lease terms.',
    amenities: ['Air Conditioning', 'Meeting Rooms', 'Private Terrace', 'Cat 6 Data', 'Raised Flooring'],
    isMock: true,
  },
  {
    id: 'm6', title: 'Riverside New Build', address: 'Plot 4, Waterfront Quarter', city: 'Bristol', country: 'United Kingdom',
    price: '£520,000', listingType: 'sale', propertyType: 'residential',
    beds: 3, baths: 2, sqft: 1150, tag: 'New Build', verified: true, seller: 'Alice Thornton',
    description: 'Brand-new riverside home in Bristol\'s Waterfront Quarter. Contemporary open-plan design with French doors opening to a private terrace overlooking the River Avon. High-specification finishes, energy-efficient heating, and a 10-year NHBC warranty. Fully chain-free.',
    amenities: ['New Build Warranty', 'River Views', 'Private Terrace', 'Energy Efficient', 'EV Charging'],
    isMock: true,
  },
  {
    id: 'm7', title: 'Development Land Plot', address: 'Off Highfields Lane', city: 'Nottingham', country: 'United Kingdom',
    price: '£195,000', listingType: 'sale', propertyType: 'land',
    beds: 0, baths: 0, sqft: 8400, tag: 'Planning Permission', verified: true, seller: 'Daniel Abara',
    description: 'A rare opportunity to acquire a consented development plot with full planning permission for 3 detached residential units. Situated on the edge of a well-connected suburban area. Services nearby. Detailed planning drawings and soil surveys available on request.',
    amenities: ['Full Planning Permission', 'Services Nearby', 'Detailed Drawings', 'Survey Report Available'],
    isMock: true,
  },
  {
    id: 'm8', title: 'Converted Warehouse Loft', address: '32 Foundry Street', city: 'Glasgow', country: 'United Kingdom',
    price: '£3,200 / mo', listingType: 'rent', propertyType: 'residential',
    beds: 2, baths: 2, sqft: 1600, tag: 'Unique', verified: false, seller: 'Kwame Asante',
    description: 'A truly unique loft apartment occupying the top floor of a converted Victorian foundry. Exposed steel beams, polished concrete floors, 5m ceilings, and an incredible original industrial aesthetic. Two mezzanine bedrooms, open-plan kitchen/living, and a rooftop access hatch.',
    amenities: ['5m Ceilings', 'Exposed Beams', 'Polished Concrete', 'Rooftop Access', 'Industrial Design'],
    isMock: true,
  },
  {
    id: 'm9', title: 'Semi-Detached Family Home', address: '19 Oak Avenue', city: 'Edinburgh', country: 'United Kingdom',
    price: '£389,000', listingType: 'sale', propertyType: 'residential',
    beds: 3, baths: 1, sqft: 1120, tag: 'Chain-Free', verified: true, seller: 'Niamh Brennan',
    description: 'Well-presented semi-detached property in a sought-after Edinburgh suburb. Features a bright lounge, separate dining room, modern fitted kitchen, and three bedrooms. Gas central heating, double glazing, and a well-maintained rear garden. Walking distance to excellent local schools.',
    amenities: ['Gas Central Heating', 'Double Glazing', 'Rear Garden', 'Driveway', 'Near Top Schools'],
    isMock: true,
  },
  {
    id: 'm10', title: 'Distribution Warehouse Unit', address: 'Bay 7, Centrix Park', city: 'Coventry', country: 'United Kingdom',
    price: '£6,500 / mo', listingType: 'rent', propertyType: 'industrial',
    beds: 0, baths: 2, sqft: 12400, tag: 'Industrial', verified: true, seller: 'Mike Reynolds',
    description: 'Modern distribution warehouse on the established Centrix Park industrial estate. 12,400 sq ft of clear-span warehouse space with an 8m eaves height, two dock-level loading doors, one level access door, and 35 car parking spaces. Secure, fenced site with CCTV.',
    amenities: ['8m Eaves Height', 'Dock Loading', 'Level Access', '35 Parking Spaces', 'CCTV Security'],
    isMock: true,
  },
  {
    id: 'm11', title: 'Thriving Coffee Shop Business', address: 'High Street Retail Unit', city: 'Bath', country: 'United Kingdom',
    price: '£85,000', listingType: 'sale', propertyType: 'business',
    beds: 0, baths: 1, sqft: 640, tag: 'Going Concern', verified: true, seller: 'Sophie Clarkson',
    description: 'Established and profitable independent coffee shop for sale as a going concern. Prime high-street location with strong footfall. Turnover in excess of £280,000 p.a. with solid margins. Full equipment and fit-out included. Loyal customer base, experienced staff willing to stay.',
    amenities: ['Going Concern', 'Full Fit-Out Included', 'Prime Location', 'Loyal Customer Base', 'Staff Included'],
    isMock: true,
  },
  {
    id: 'm12', title: 'Ground Floor Retail + 2 Flats', address: '44 Market Street', city: 'Oxford', country: 'United Kingdom',
    price: '£780,000', listingType: 'sale', propertyType: 'mixed_use',
    beds: 4, baths: 3, sqft: 2600, tag: 'Investment', verified: true, seller: 'Alice Thornton',
    description: 'Excellent mixed-use investment opportunity in central Oxford. Ground floor let to a national retail tenant on a 5-year FRI lease. Two residential flats above (1 x 2-bed, 1 x 2-bed) each let on ASTs. Combined gross income of £52,000 p.a. Long leasehold title.',
    amenities: ['Retail Tenant', 'Two Residential Flats', 'FRI Lease', 'Central Location', 'Strong Rental Income'],
    isMock: true,
  },
  {
    id: 'm13', title: 'Coastal Holiday Cottage', address: "Harbour View, Fisherman's Row", city: 'Cornwall', country: 'United Kingdom',
    price: '£1,100 / wk', listingType: 'rent', propertyType: 'holiday',
    beds: 3, baths: 2, sqft: 980, tag: 'Holiday Let', verified: true, seller: 'Emma Devereux',
    description: 'Charming fisherman\'s cottage steps from the harbour in a picturesque Cornish village. Tastefully restored with modern comforts while retaining original character. Sleeps 6. Fully equipped kitchen, wood-burning stove, enclosed courtyard garden. Available May–September.',
    amenities: ['Sea Views', 'Wood Burning Stove', 'Enclosed Garden', 'Fully Equipped', 'Sleeps 6'],
    isMock: true,
  },
  {
    id: 'm14', title: 'Arable Farm with Farmhouse', address: 'Greenfield Farm, Rural Road', city: 'Norfolk', country: 'United Kingdom',
    price: '£1,250,000', listingType: 'sale', propertyType: 'agricultural',
    beds: 5, baths: 3, sqft: 42000, tag: 'Agricultural', verified: false, seller: 'Larry Goldstein',
    description: 'A rare opportunity to acquire a productive arable farm extending to approximately 42 acres, including a substantial 5-bedroom farmhouse, range of traditional and modern outbuildings, grain store, and workshop. Predominantly Grade 2 arable land in good heart. Currently farmed in-hand.',
    amenities: ['42 Acres', 'Grain Store', 'Workshop', 'Outbuildings', 'Grade 2 Arable Land'],
    isMock: true,
  },
  // Ireland
  {
    id: 'm15', title: 'Georgian Townhouse', address: '8 Merrion Square', city: 'Dublin', country: 'Ireland',
    price: '€1,150,000', listingType: 'sale', propertyType: 'residential',
    beds: 5, baths: 4, sqft: 3200, tag: 'Heritage', verified: true, seller: 'Niamh Brennan',
    description: 'Magnificent five-storey Georgian townhouse on one of Dublin\'s finest squares. Extensively restored, retaining original fanlight, cornicing, and marble fireplaces. Five reception rooms, five double bedrooms, modern kitchen extension to the rear. Walled garden. A true landmark address.',
    amenities: ['Period Features', 'Walled Garden', 'Original Cornicing', 'Marble Fireplaces', 'Wine Cellar'],
    isMock: true,
  },
  {
    id: 'm16', title: 'City Centre Office Floor', address: 'IFSC, North Wall Quay', city: 'Dublin', country: 'Ireland',
    price: '€8,500 / mo', listingType: 'rent', propertyType: 'commercial',
    beds: 0, baths: 3, sqft: 4100, tag: 'Prime Location', verified: true, seller: 'Marcus Webb',
    description: 'Premium office floor in the IFSC, Dublin\'s premier financial district. 4,100 sq ft of open-plan space with a fit-out ready for occupation. Raised floors, VRF air conditioning, LED lighting, shower facilities, and secure bicycle storage. Strong transport links.',
    amenities: ['IFSC Location', 'Raised Floors', 'VRF Air Conditioning', 'Shower Facilities', 'Cycle Storage'],
    isMock: true,
  },
  // UAE
  {
    id: 'm17', title: 'Marina View Penthouse', address: 'Dubai Marina Tower', city: 'Dubai', country: 'UAE',
    price: 'AED 4,200,000', listingType: 'sale', propertyType: 'residential',
    beds: 4, baths: 4, sqft: 4800, tag: 'Sea View', verified: true, seller: 'Rick Fontaine',
    description: 'Breathtaking full-floor penthouse with unobstructed views of the Dubai Marina and Arabian Gulf. Expansive wraparound terrace, private plunge pool, home cinema room, and a chef\'s kitchen. Full concierge service, private elevator lobby, and direct beach club access.',
    amenities: ['Private Pool', 'Wraparound Terrace', 'Home Cinema', 'Concierge', 'Beach Club Access'],
    isMock: true,
  },
  {
    id: 'm18', title: 'Downtown Retail Unit', address: 'Ground Level, Emaar Square', city: 'Dubai', country: 'UAE',
    price: 'AED 18,000 / mo', listingType: 'rent', propertyType: 'commercial',
    beds: 0, baths: 1, sqft: 1200, tag: 'Prime Retail', verified: true, seller: 'Alice Thornton',
    description: 'Ground-floor retail unit in the prestigious Emaar Square, directly adjacent to the Dubai Mall and Burj Khalifa. Exceptional footfall and international visitor profile. Glass frontage, high ceilings, and back-of-house storage. Ideal for F&B, fashion, or lifestyle brands.',
    amenities: ['Glass Frontage', 'High Ceilings', 'Storage Room', 'Premium Footfall', 'Emaar Square'],
    isMock: true,
  },
  // France
  {
    id: 'm19', title: 'Haussmann Boulevard Apartment', address: '24 Boulevard Saint-Germain', city: 'Paris', country: 'France',
    price: '€980,000', listingType: 'sale', propertyType: 'residential',
    beds: 3, baths: 2, sqft: 1450, tag: 'Classic Parisian', verified: true, seller: 'Emma Devereux',
    description: 'Elegant Haussmann-era apartment on one of Paris\'s most celebrated boulevards. Features herringbone parquet floors, ornate ceiling mouldings, marble fireplaces, and floor-to-ceiling windows with juliet balconies. Three generous bedrooms, a formal dining room, and a cave.',
    amenities: ['Herringbone Parquet', 'Marble Fireplaces', 'Cave (Cellar)', 'Juliet Balconies', 'Concierge'],
    isMock: true,
  },
  {
    id: 'm20', title: 'Provence Vineyard Estate', address: 'Route des Vignes, Luberon', city: 'Aix-en-Provence', country: 'France',
    price: '€2,400,000', listingType: 'sale', propertyType: 'agricultural',
    beds: 7, baths: 5, sqft: 18000, tag: 'Estate', verified: false, seller: 'Daniel Abara',
    description: 'Magnificent Provençal domaine set amidst 12 hectares of Luberon hillside. The estate comprises a 700m² bastide, two guest cottages, a working winery producing AOC Luberon rosé and rouge, a cave vinaire, swimming pool, and olive grove. Stunning views across the Luberon valley.',
    amenities: ['12 Hectares', 'Working Winery', 'Swimming Pool', 'Guest Cottages', 'Olive Grove'],
    isMock: true,
  },
  // Spain
  {
    id: 'm21', title: 'Seafront Villa with Pool', address: 'Passeig Maritim 14', city: 'Barcelona', country: 'Spain',
    price: '€1,850,000', listingType: 'sale', propertyType: 'residential',
    beds: 5, baths: 4, sqft: 5200, tag: 'Sea Views', verified: true, seller: 'Linda Park',
    description: 'Spectacular contemporary villa directly on the Barcelona seafront. Architect-designed with five en-suite bedrooms, a rooftop infinity pool, and vast terraces spanning every level. Private garage, smart home technology, and direct access to the Passeig Maritim promenade.',
    amenities: ['Infinity Pool', 'Rooftop Terrace', 'Smart Home', 'Sea Views', 'Direct Beach Access'],
    isMock: true,
  },
  {
    id: 'm22', title: 'Costa del Sol Holiday Apartment', address: 'Urb. Las Brisas', city: 'Marbella', country: 'Spain',
    price: '€2,800 / mo', listingType: 'rent', propertyType: 'holiday',
    beds: 2, baths: 2, sqft: 1100, tag: 'Holiday Let', verified: true, seller: 'Sophie Clarkson',
    description: 'Beautiful holiday apartment in the prestigious Las Brisas urbanisation, moments from Puerto Banús. Two bedrooms, two bathrooms, a bright open-plan lounge, and a large south-facing terrace with sea and mountain views. Access to communal pool, gardens, and tennis courts.',
    amenities: ['Communal Pool', 'Tennis Courts', 'Sea Views', 'South-Facing Terrace', 'Near Puerto Banús'],
    isMock: true,
  },
  // USA
  {
    id: 'm23', title: 'Tribeca Loft', address: '120 Franklin Street', city: 'New York', country: 'USA',
    price: '$3,200,000', listingType: 'sale', propertyType: 'residential',
    beds: 3, baths: 2, sqft: 2800, tag: 'Manhattan', verified: true, seller: 'Rick Fontaine',
    description: 'Exceptional full-floor loft in a landmark cast-iron Tribeca building. Soaring 14ft ceilings, original timber columns, exposed brick, and south-facing windows flooding the space with light. Chef\'s kitchen, two luxurious bathrooms, generous storage, and a private wine room.',
    amenities: ['14ft Ceilings', 'Exposed Brick', 'Wine Room', 'Chef\'s Kitchen', 'Full-Floor Loft'],
    isMock: true,
  },
  {
    id: 'm24', title: 'Brickell Avenue Office Tower', address: '1200 Brickell Ave, Suite 2100', city: 'Miami', country: 'USA',
    price: '$12,500 / mo', listingType: 'rent', propertyType: 'commercial',
    beds: 0, baths: 4, sqft: 3600, tag: 'Skyline Views', verified: true, seller: 'Marcus Webb',
    description: 'Class A office suite on the 21st floor of a prestigious Brickell Avenue tower. Panoramic views of Biscayne Bay and the Miami skyline. Includes private reception, boardroom, four executive offices, and an open trading floor. Building amenities include concierge, valet, and restaurants.',
    amenities: ['Bay Views', 'Private Boardroom', 'Valet Parking', 'Concierge', 'On-Site Restaurant'],
    isMock: true,
  },
  // Australia
  {
    id: 'm25', title: 'Harbour Bridge View Apartment', address: '88 Cumberland Street', city: 'Sydney', country: 'Australia',
    price: 'AUD 2,100,000', listingType: 'sale', propertyType: 'residential',
    beds: 3, baths: 2, sqft: 1650, tag: 'Harbour Views', verified: true, seller: 'Emma Devereux',
    description: 'Exquisitely appointed apartment in the Rocks precinct with unobstructed views of the Sydney Harbour Bridge and Opera House. Three bedrooms, two bathrooms, an entertainer\'s terrace, and a gourmet kitchen. Two secure car spaces. Walking distance to Circular Quay ferry.',
    amenities: ['Harbour Views', 'Entertainer\'s Terrace', 'Two Car Spaces', 'Concierge', 'Ferry Walk'],
    isMock: true,
  },
  {
    id: 'm26', title: 'Industrial Park Warehouse', address: 'Unit 5, Silverwater Industrial Estate', city: 'Sydney', country: 'Australia',
    price: 'AUD 9,800 / mo', listingType: 'rent', propertyType: 'industrial',
    beds: 0, baths: 2, sqft: 8200, tag: 'Industrial', verified: false, seller: 'Mike Reynolds',
    description: 'Modern warehouse/factory unit on the well-established Silverwater Industrial Estate in Western Sydney. 8,200 sq ft of clear-span warehouse with an office mezzanine, 6m eaves height, container-height roller doors, 3-phase power, and 20 car spaces. Good motorway access.',
    amenities: ['6m Eaves Height', 'Container Roller Doors', '3-Phase Power', '20 Car Spaces', 'Motorway Access'],
    isMock: true,
  },
]

export const PROPERTY_TYPE_COLOURS: Record<string, string> = {
  residential:  'bg-[#0eaa99]/10 text-[#0eaa99] border-[#0eaa99]/20',
  commercial:   'bg-violet-50 text-violet-500 border-violet-100',
  industrial:   'bg-slate-100 text-slate-500 border-slate-200',
  land:         'bg-amber-50 text-amber-500 border-amber-100',
  business:     'bg-blue-50 text-blue-500 border-blue-100',
  mixed_use:    'bg-rose-50 text-rose-500 border-rose-100',
  holiday:      'bg-orange-50 text-orange-500 border-orange-100',
  agricultural: 'bg-lime-50 text-lime-600 border-lime-100',
}

export const PROPERTY_CATEGORIES: Record<string, string> = {
  residential: 'Residential', commercial: 'Commercial', industrial: 'Industrial',
  land: 'Land', business: 'Business', mixed_use: 'Mixed Use',
  holiday: 'Holiday', agricultural: 'Agricultural',
}

export const LISTING_TYPE_LABEL: Record<string, string> = {
  sale: 'For Sale',
  rent: 'To Let',
}
