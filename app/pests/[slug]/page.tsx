'use client'

import { useLocation } from '@/context/LocationContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import Image from 'next/image'

const PEST_DATA: Record<string, any> = {
  'ants': {
    name: 'Ant',
    title: 'Ant control and prevention',
    subtitle: 'Protect your home from ant invasions with our comprehensive treatment plans.',
    heroImage: '/images/ant-macro.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Ants are one of the most common pests found in homes. They can quickly establish large colonies and become a major nuisance. Professional treatment is necessary to effectively target the entire colony and prevent future infestations.',
    bullets: ['Can contaminate food and surfaces.', 'Some species can cause structural damage.', 'Quickly build large, complex colonies.'],
    tabs: ['Residual Spray', 'Bait Stations', 'Perimeter Barrier', 'Colony Elimination']
  },
  'bats': {
    name: 'Bat',
    title: 'Humane bat control & exclusion',
    subtitle: 'Protect your attic and chimney with professional, humane bat exclusion services.',
    heroImage: '/images/spider.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Bats can nest in attics, eaves, and wall cavities, posing health risks through guano accumulation. PestIQ uses one-way exclusion devices to safely remove bats and seal entry points.',
    bullets: ['Prevent guano buildup and odor risks.', 'Humane one-way exclusion valves.', 'Comprehensive entry point sealing.'],
    tabs: ['Attic Inspection', 'One-Way Exclusion', 'Entry Sealing', 'Sanitizing']
  },
  'bed-bugs': {
    name: 'Bed Bug',
    title: 'Bed bug extermination & treatment',
    subtitle: 'Sleep soundly again with our comprehensive thermal & chemical bed bug solutions.',
    heroImage: '/images/bedroom.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Bed bugs hide deep in mattresses, headboards, and baseboards. Our targeted heat and residual treatments target bed bugs at all life stages, including eggs.',
    bullets: ['Cause itchy welts and severe sleep loss.', 'Hide in microscopic cracks and upholstery.', 'Targeted treatments for complete eradication.'],
    tabs: ['Thermal Heat', 'Targeted Chemical', 'Mattress Encasement', 'Follow-up Guarantee']
  },
  'birds': {
    name: 'Bird',
    title: 'Commercial & residential bird control',
    subtitle: 'Deter pest birds safely with netting, spikes, and humane repellent barriers.',
    heroImage: '/images/suburban-houses.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Pigeons, sparrows, and starlings can damage roofs, gutters, and solar panels. We install discrete netting, gel repellents, and bird spikes to keep your property clean.',
    bullets: ['Prevent corrosive bird droppings.', 'Protect solar panels, ledges, and roofs.', 'Humane deterrents and exclusion.'],
    tabs: ['Anti-Roosting Spikes', 'Discreet Netting', 'Solar Panel Guards', 'Site Cleanup']
  },
  'carpenter-ants': {
    name: 'Carpenter Ant',
    title: 'Carpenter ant damage control',
    subtitle: 'Stop wood-destroying carpenter ants before they compromise your home structure.',
    heroImage: '/images/ant-macro.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Unlike termites, carpenter ants excavate wood to build galleries for their colonies. Our specialists locate parent and satellite nests to stop destruction.',
    bullets: ['Excavate wooden beams and wall studs.', 'Form hidden satellite nests in moist wood.', 'Requires specialized perimeter & void baiting.'],
    tabs: ['Void Injection', 'Perimeter Barrier', 'Nest Tracking', 'Moisture Inspection']
  },
  'centipedes-millipedes': {
    name: 'Centipede & Millipede',
    title: 'Centipede & millipede control',
    subtitle: 'Keep multi-legged crawlers out of your basement, crawlspaces, and perimeter.',
    heroImage: '/images/spider.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'House centipedes and millipedes thrive in high-humidity areas like damp basements and crawlspaces. We treat moisture zones and seal foundation cracks.',
    bullets: ['Drawn to high indoor humidity.', 'Indicative of underlying moisture issues.', 'Targeted perimeter granular barriers.'],
    tabs: ['Granular Barrier', 'Crawlspace Treatment', 'Foundation Sealing', 'Dehumidification Advice']
  },
  'cockroaches': {
    name: 'Cockroach',
    title: 'Cockroach control & elimination',
    subtitle: 'Eliminate German, American, and Oriental cockroaches with long-lasting baits.',
    heroImage: '/images/cockroach.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Cockroaches are resilient pests that multiply rapidly and contaminate food prep areas. Our multi-stage treatment combines insect growth regulators (IGRs) and targeted gel baits.',
    bullets: ['Spread harmful bacteria and trigger allergies.', 'Multiply rapidly in kitchens and bathrooms.', 'Dual-action IGR and bait placement.'],
    tabs: ['Gel Baiting', 'IGR Application', 'Crack & Crevice Dusting', 'Sanitation Audit']
  },
  'crickets': {
    name: 'Cricket',
    title: 'Cricket control & noise relief',
    subtitle: 'Stop annoying cricket chirping and protect fabric and wallpaper from damage.',
    heroImage: '/images/ant-macro.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Camel crickets and field crickets invade dark, cool spaces during seasonal weather changes. We apply perimeter barriers and interior monitoring.',
    bullets: ['Damage clothes, carpet, and curtains.', 'Attracted to damp basements and garages.', 'Targeted perimeter barrier application.'],
    tabs: ['Perimeter Dusting', 'Glue Traps', 'Foundation Seal', 'Vegetation Clearing']
  },
  'fleas': {
    name: 'Flea',
    title: 'Flea extermination & yard protection',
    subtitle: 'Eradicate persistent fleas from carpets, furniture, and outdoor pet areas.',
    heroImage: '/images/mosquito.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Flea infestations quickly spread through carpet fibers and pet bedding. Our dual-action indoor and yard treatments break the flea life cycle instantly.',
    bullets: ['Bite humans and pets relentlessly.', 'Eggs fall into carpets and floor cracks.', 'Adulticides + IGR for complete elimination.'],
    tabs: ['Carpet Treatment', 'Upholstery Care', 'Yard Mist', 'Lifecycle IGR']
  },
  'flies': {
    name: 'Fly',
    title: 'House & drain fly management',
    subtitle: 'Eliminate fruit flies, drain flies, and house flies with targeted bio-treatments.',
    heroImage: '/images/mosquito.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Flies land on unsanitary surfaces and transfer pathogens to food areas. We utilize bio-enzymatic drain cleaners and light traps for total control.',
    bullets: ['Contaminate food and cooking counters.', 'Breeds in plumbing drains and trash bins.', 'Bio-enzymatic drain treatment.'],
    tabs: ['Drain Foam', 'Light Traps', 'Bait Stations', 'Source Removal']
  },
  'mice': {
    name: 'Mice',
    title: 'Mice control & structural exclusion',
    subtitle: 'Seal entry points and trap invading mice to keep your kitchen rodent-free.',
    heroImage: '/images/rodent.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Mice can fit through holes as small as a dime. PestIQ technicians conduct thorough inspections to identify and seal entryways while setting tamper-proof stations.',
    bullets: ['Fits through dime-sized entry holes.', 'Chew electrical wires causing fire hazards.', 'Comprehensive exclusion sealing included.'],
    tabs: ['Steel Mesh Exclusion', 'Tamper-Proof Stations', 'Sanitization', 'Monitoring']
  },
  'mosquitoes': {
    name: 'Mosquito',
    title: 'Mosquito control & yard misting',
    subtitle: 'Enjoy your yard all summer with automated seasonal mosquito barrier mists.',
    heroImage: '/images/mosquito.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Mosquitoes breed in standing water and rest under foliage. Our recurring outdoor treatments coat leaf undersides to eliminate mosquitoes on contact.',
    bullets: ['Transmits West Nile & Zika viruses.', 'Targets foliage and shaded resting zones.', 'Eco-friendly barrier treatments.'],
    tabs: ['Foliage Mist', 'Larvicide Placement', 'Gutter Inspection', 'Monthly Protection']
  },
  'moths': {
    name: 'Moth',
    title: 'Pantry & clothes moth treatment',
    subtitle: 'Protect your wardrobes, carpets, and pantry items from moth larvae damage.',
    heroImage: '/images/ant-macro.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Pantry moths infest dry grains, while clothes moths destroy wool and silk. We use pheromone monitoring traps and targeted micro-encapsulated treatments.',
    bullets: ['Larvae eat natural fibers and wool.', 'Infest cereal, flour, and pet food.', 'Pheromone monitoring and targeted spray.'],
    tabs: ['Pheromone Traps', 'Cabinet Cleaning', 'Targeted Treatment', 'Preventative Seal']
  },
  'rats': {
    name: 'Rat',
    title: 'Rat control & baiting systems',
    subtitle: 'Eliminate Norway and roof rats with heavy-duty exclusion and baiting.',
    heroImage: '/images/rodent.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Rats pose serious health risks and can gnaw through pipes and wiring. Our rat control plan incorporates heavy exclusion, exterior baiting, and interior trapping.',
    bullets: ['Gnaw through wood, plastic, and soft metal.', 'Vector for serious bacterial diseases.', 'Heavy-duty tamper-proof bait boxes.'],
    tabs: ['Exterior Rodent Stations', 'Structural Exclusion', 'Attic Trapping', 'Sanitation']
  },
  'rodents': {
    name: 'Rodent',
    title: 'Complete rodent control & exclusion',
    subtitle: 'Keep your home safe from destructive mice and rats with full 365 protection.',
    heroImage: '/images/rodent.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Integrated rat and mouse control designed for residential and commercial properties. We inspect crawlspaces, attics, and foundations.',
    bullets: ['Covers all species of mice and rats.', 'Prevents food contamination and fire risks.', 'Includes 100% money-back guarantee.'],
    tabs: ['Full Inspection', 'Foundation Sealing', 'Baiting & Trapping', 'Seasonal Checks']
  },
  'scorpions': {
    name: 'Scorpion',
    title: 'Scorpion exclusion & barrier spray',
    subtitle: 'Prevent scorpions from creeping into shoes, bedding, and patio areas.',
    heroImage: '/images/spider.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Scorpions enter homes seeking water and shade. We apply specialized micro-encapsulated perimeter barriers and conduct blacklight nocturnal audits.',
    bullets: ['Painful stings, especially to children and pets.', 'Hides in dark cracks, boots, and palm trees.', 'Blacklight night inspection available.'],
    tabs: ['Blacklight Audit', 'Perimeter Barrier', 'Weep Hole Screen', 'Harborage Removal']
  },
  'silverfish': {
    name: 'Silverfish',
    title: 'Silverfish control & humidity reduction',
    subtitle: 'Stop silverfish from damaging books, documents, and linen closets.',
    heroImage: '/images/ant-macro.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Silverfish consume starches, paper, and adhesive bindings. We apply long-lasting perimeter dusts and recommend humidity control tactics.',
    bullets: ['Feeds on paper, book bindings, and starch.', 'Thrives in high indoor humidity.', 'Precision crack and crevice treatment.'],
    tabs: ['Dusting Injections', 'Attic Treatment', 'Moisture Audit', 'Dehumidifier Tips']
  },
  'spiders': {
    name: 'Spider',
    title: 'Spider control & web removal',
    subtitle: 'Clear away unsightly webs and keep dangerous spiders away from your family.',
    heroImage: '/images/spider.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'From common house spiders to black widows and brown recluses, our technician sweeps eaves and applies barrier sprays to curb spider prey.',
    bullets: ['De-webbing service up to 2 stories.', 'Targets black widows and brown recluses.', 'Eliminates underlying insect prey.'],
    tabs: ['Eave De-Webbing', 'Perimeter Spray', 'Window Sill Treatment', 'Basement Seal']
  },
  'stinging-pests': {
    name: 'Stinging Pest',
    title: 'Stinging pest nest removal',
    subtitle: 'Protect your family from yellowjackets, hornets, bees, and wasps.',
    heroImage: '/images/ant-macro.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Stinging insects built dangerous nests in roof eaves, soffits, and underground cavities. Our certified technicians safely neutralize and remove nests.',
    bullets: ['Protects against painful allergic stings.', 'Safe removal of aerial and ground nests.', 'Preventative eave treatment.'],
    tabs: ['Nest Neutralization', 'Safe Removal', 'Eave Treatment', 'Preventative Dust']
  },
  'ticks': {
    name: 'Tick',
    title: 'Tick reduction & lawn barrier',
    subtitle: 'Keep your pets and kids safe from Lyme disease with yard tick sprays.',
    heroImage: '/images/mosquito.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Ticks cling to tall grass and leaf litter waiting for hosts. We treat perimeter vegetation borders to stop ticks before they reach your lawn.',
    bullets: ['Prevents Lyme disease and tick bites.', 'Focuses on woodlines and high grass.', 'Pet-friendly after drying.'],
    tabs: ['Lawn Edge Mist', 'Leaf Litter Spray', 'Pet Safety Audit', 'Bi-Monthly Service']
  },
  'wasps': {
    name: 'Wasp',
    title: 'Wasp nest extermination',
    subtitle: 'Prompt wasp and hornet nest removal with guaranteed eave protection.',
    heroImage: '/images/ant-macro.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Wasps build paper nests under eaves, porch ceilings, and deck railings. PestIQ provides fast-response nest knockdown and lingering deterrents.',
    bullets: ['Prevents aggressive swarm attacks.', 'Knocks down paper nests safely.', 'Applies invisible eave repellents.'],
    tabs: ['Knockdown Pole', 'Aerosol Treatment', 'Eave Seal', 'Seasonal Guarantee']
  }
};

const getPrices = (priceTier: string, propertySqFt: number) => {
  let base = { essential: 44.99, complete: 54.99, onetime: 229.99 };
  if (priceTier === 'westchester') base = { essential: 49.99, complete: 59.99, onetime: 249.99 };
  if (priceTier === 'newjersey') base = { essential: 44.99, complete: 54.99, onetime: 229.99 };
  
  let adj = 0;
  if (propertySqFt > 1500 && propertySqFt <= 2500) adj = 5;
  else if (propertySqFt > 2500 && propertySqFt <= 3500) adj = 10;
  else if (propertySqFt > 3500) adj = 15;
  
  return {
    essential: (base.essential + adj).toFixed(2),
    complete: (base.complete + adj).toFixed(2),
    onetime: (base.onetime + adj * 3).toFixed(2)
  };
};

export default function PestServicePage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  
  // Use context
  const { isAddressModalOpen, setIsAddressModalOpen, zipCode, priceTier, propertySqFt, setCartItem } = useLocation();
  const isAddressVerified = !!zipCode;
  
  let slug = params.slug;
  let pest = PEST_DATA[slug];
  if (!pest) {
    const formattedName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    pest = {
      name: formattedName.replace(/ Control$/i, ''),
      title: `${formattedName} & treatment`,
      subtitle: `Protect your home from ${formattedName.toLowerCase()} with targeted extermination solutions.`,
      heroImage: '/images/ant-macro.jpg',
      covered: { essential: 25, complete: 39 },
      description: `Professional ${formattedName.toLowerCase()} service customized for residential and commercial properties. Our certified technicians target harborages and implement long-lasting barriers.`,
      bullets: ['Targeted perimeter application.', 'Safe for pets and family members.', 'Prevents recurring seasonal infestations.'],
      tabs: ['Inspection', 'Targeted Treatment', 'Exclusion', 'Monitoring']
    };
  }
  const prices = getPrices(priceTier || 'nyc', propertySqFt || 2000);

  const handleAddToCart = (planId: "essential" | "complete" | "onetime", planName: string, monthlyPrice: string, initialFee: string, isSubscription: boolean) => {
    setCartItem({ planId, planName, monthlyPrice, initialFee, isSubscription });
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
          Home / {pest.name} control
        </div>

        {/* Hero Section */}
        <section className="relative w-full h-[400px] flex items-center justify-center bg-gray-900">
          <div className="absolute inset-0 z-0">
            {/* Fallback color if image is missing */}
            <div className="absolute inset-0 bg-[#071b4d] opacity-80 z-10" />
            <img src={pest.heroImage} alt={pest.name} className="w-full h-full object-cover" />
          </div>
          <div className="relative z-20 text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{pest.title}</h1>
            <p className="text-lg md:text-xl mb-8">{pest.subtitle}</p>
            <button 
              onClick={() => {
                const el = document.getElementById('plans');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setIsAddressModalOpen(true);
              }}
              className="bg-[#ffc400] text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-colors shadow-lg"
            >
              See plans
            </button>
          </div>
        </section>

        {/* Star Rating Bar */}
        <section className="bg-[#071b4d] text-white py-3 text-center">
          <p className="font-semibold text-sm md:text-base flex items-center justify-center gap-2">
            <span className="text-[#ffc400] text-xl">★★★★★</span> 4.5 | Based on 89k verified reviews
          </p>
        </section>

        {/* Promo Banner */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row rounded-lg overflow-hidden shadow-md">
            <div className="bg-white p-6 md:w-2/3 flex flex-col justify-center border-l-4 border-green-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Save BIG on your first pest control service</h3>
              <p className="text-gray-600 mb-4">Get your first pest control service for only $149</p>
              <div>
                <button className="bg-[#ffc400] text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors">
                  Act and save now
                </button>
              </div>
            </div>
            <div className="bg-[#104d4f] text-white p-6 md:w-1/3 flex flex-col items-center justify-center text-center">
              <span className="bg-white text-[#104d4f] text-xs font-bold px-2 py-1 rounded mb-3">START YOUR SERVICE FOR $149!</span>
              <h4 className="text-3xl font-extrabold leading-tight">OUR BIG<br/>SUMMER<br/>SAVINGS</h4>
            </div>
          </div>
        </section>

        {/* Pest Info Section */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2 w-full h-64 md:h-96 relative rounded-lg overflow-hidden shadow-lg">
               <img src={pest.heroImage} alt={pest.name} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#071b4d] mb-4">Need a {pest.name.toLowerCase()} exterminator?</h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {pest.description}
              </p>
              <ul className="space-y-3">
                {pest.bullets.map((bullet: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#1a7a3c] mr-2 text-xl font-bold">✓</span>
                    <span className="text-gray-700">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section id="plans" className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#071b4d] mb-4">
                {pest.name}s are one of the {pest.covered.complete} pests covered with a PestIQ pest control plan.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              
              {/* Essential Card */}
              <div className="border border-gray-200 rounded-xl bg-white shadow-sm flex flex-col">
                <div className="bg-gray-100 py-3 text-center rounded-t-xl text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Better Protection
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-extrabold text-[#071b4d] mb-4">Essential365 Plan</h3>
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-start"><span className="text-gray-400 mr-2">✓</span> <span className="text-gray-700 text-sm">Interior and exterior pest inspection</span></li>
                    <li className="flex items-start"><span className="text-gray-400 mr-2">✓</span> <span className="text-gray-700 text-sm">Protection from {pest.covered.essential} common household pests</span></li>
                    <li className="flex items-start"><span className="text-gray-400 mr-2">✓</span> <span className="text-gray-700 text-sm">Regularly scheduled pest treatments</span></li>
                    <li className="flex items-start"><span className="text-gray-400 mr-2">✓</span> <span className="text-gray-700 text-sm">PestIQ Guarantee which means if pests come back between treatments, so will we — at no additional cost</span></li>
                  </ul>
                  
                  <div className="mt-auto pt-6 border-t border-gray-100 text-center">
                    {isAddressVerified ? (
                      <div>
                        <div className="text-3xl font-extrabold text-[#1a7a3c]">${prices.essential}</div>
                        <div className="text-xs text-gray-500 mb-4">per month</div>
                        <button 
                          onClick={() => handleAddToCart('essential', 'Essential365 Plan', prices.essential, '149.00', true)}
                          className="w-full bg-[#ffc400] text-black font-bold py-3 rounded-full hover:bg-yellow-400 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setIsAddressModalOpen(true)}
                        className="w-full bg-[#ffc400] text-black font-bold py-3 rounded-full hover:bg-yellow-400 transition-colors"
                      >
                        See Pricing
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Complete Card */}
              <div className="border-2 border-[#1a7a3c] rounded-xl bg-white shadow-xl relative flex flex-col z-10 scale-105">
                <div className="bg-[#1a7a3c] py-3 text-center rounded-t-lg text-sm font-bold text-white uppercase tracking-wider shadow-md">
                  Best Protection
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-3xl font-extrabold text-[#071b4d] mb-4">PestFree365+ Plan</h3>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start"><span className="text-[#1a7a3c] font-bold mr-2">✓</span> <span className="text-gray-700 text-sm font-medium">Interior and exterior pest inspection</span></li>
                    <li className="flex items-start"><span className="text-[#1a7a3c] font-bold mr-2">✓</span> <span className="text-gray-700 text-sm font-medium">Protection from {pest.covered.complete} pests, including 14 pests that may be costly to eliminate</span></li>
                    <li className="flex items-start"><span className="text-[#1a7a3c] font-bold mr-2">✓</span> <span className="text-gray-700 text-sm font-medium">Regularly scheduled pest treatments</span></li>
                    <li className="flex items-start"><span className="text-[#1a7a3c] font-bold mr-2">✓</span> <span className="text-gray-700 text-sm font-medium">PestIQ Guarantee which means if pests come back between treatments, so will we — at no additional cost</span></li>
                    <li className="flex items-start"><span className="text-[#ffc400] text-xl font-bold mr-2">★</span> <span className="text-gray-900 font-bold text-sm">PLUS unlimited protection from seasonal pests</span></li>
                  </ul>
                  
                  <div className="mt-auto pt-6 border-t border-gray-100 text-center">
                    {isAddressVerified ? (
                      <div>
                        <div className="text-4xl font-extrabold text-[#1a7a3c]">${prices.complete}</div>
                        <div className="text-sm text-gray-500 mb-4 font-medium">per month</div>
                        <button 
                          onClick={() => handleAddToCart('complete', 'PestFree365+ Plan', prices.complete, '149.00', true)}
                          className="w-full bg-[#ffc400] text-black text-lg font-bold py-4 rounded-full hover:bg-yellow-400 transition-colors shadow-lg"
                        >
                          Add to Cart
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setIsAddressModalOpen(true)}
                        className="w-full bg-[#ffc400] text-black text-lg font-bold py-4 rounded-full hover:bg-yellow-400 transition-colors shadow-lg"
                      >
                        See Pricing
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* One-time Card */}
              <div className="border border-gray-200 rounded-xl bg-white shadow-sm flex flex-col">
                <div className="bg-gray-100 py-3 text-center rounded-t-xl text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Good Protection
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-extrabold text-[#071b4d] mb-4">One-time Pest Plan</h3>
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-start"><span className="text-gray-400 mr-2">✓</span> <span className="text-gray-700 text-sm">Interior and exterior inspection</span></li>
                    <li className="flex items-start"><span className="text-gray-400 mr-2">✓</span> <span className="text-gray-700 text-sm">One pest treatment</span></li>
                    <li className="flex items-start"><span className="text-gray-400 mr-2">✓</span> <span className="text-gray-700 text-sm">PestIQ Guarantee which means if pests come back within 30 days of your treatment, so will we — at no additional cost</span></li>
                  </ul>
                  
                  <div className="mt-auto pt-6 border-t border-gray-100 text-center">
                    {isAddressVerified ? (
                      <div>
                        <div className="text-3xl font-extrabold text-[#1a7a3c]">${prices.onetime}</div>
                        <div className="text-xs text-gray-500 mb-4">one-time payment</div>
                        <button 
                          onClick={() => handleAddToCart('onetime', 'One-time Pest Plan', '0.00', prices.onetime, false)}
                          className="w-full bg-white text-[#071b4d] border-2 border-[#071b4d] font-bold py-3 rounded-full hover:bg-gray-50 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setIsAddressModalOpen(true)}
                        className="w-full bg-[#ffc400] text-black font-bold py-3 rounded-full hover:bg-yellow-400 transition-colors"
                      >
                        See Pricing
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Treatment Options Section */}
        <section className="bg-slate-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#071b4d] mb-10">Your {pest.name.toLowerCase()} treatment options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pest.tabs.map((tab: string, i: number) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow border border-gray-100 text-left">
                  <h4 className="text-xl font-bold text-[#1a7a3c] mb-2">{tab}</h4>
                  <p className="text-gray-600 text-sm">
                    Targeted application focusing on critical points to stop pest progression. Designed specifically for optimal effectiveness against {pest.name.toLowerCase()}s in residential settings.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
