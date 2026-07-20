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
  'cockroaches': {
    name: 'Cockroach',
    title: 'Cockroach control and prevention',
    subtitle: 'Eliminate cockroaches and keep them out with our effective treatments.',
    heroImage: '/images/cockroach.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Cockroaches are resilient pests that can spread disease and trigger allergies. They breed rapidly and are notoriously difficult to eliminate without professional pest control methods.',
    bullets: ['Can trigger asthma and allergies.', 'Spread bacteria and diseases.', 'Extremely resilient and hard to eliminate.'],
    tabs: ['Gel Bait', 'Residual Spray', 'IGR Treatment', 'Exclusion']
  },
  'rodents': {
    name: 'Rodent',
    title: 'Rodent control and exclusion',
    subtitle: 'Keep your home safe from destructive and disease-carrying rodents.',
    heroImage: '/images/rodent.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Rodents like rats and mice can cause significant structural damage to your home and pose serious health risks. Professional exclusion and monitoring are critical to keeping them out permanently.',
    bullets: ['Cause structural damage by chewing.', 'Contaminate food and spread disease.', 'Multiply quickly if left unchecked.'],
    tabs: ['Snap Traps', 'Glue Boards', 'Exclusion', 'Monitoring']
  },
  'spiders': {
    name: 'Spider',
    title: 'Spider control and prevention',
    subtitle: 'Reduce spider populations in and around your home.',
    heroImage: '/images/spider.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'While most spiders are harmless, some can be dangerous, and all can create unsightly webs. Our targeted treatments help reduce spider populations and prevent them from entering your living spaces.',
    bullets: ['Create unsightly webs around the home.', 'Some species have dangerous bites.', 'Often indicate the presence of other pests.'],
    tabs: ['Web Removal', 'Residual Spray', 'Perimeter Treatment', 'Habitat Reduction']
  },
  'mosquitoes': {
    name: 'Mosquito',
    title: 'Mosquito control and reduction',
    subtitle: 'Enjoy your yard again with our targeted mosquito control solutions.',
    heroImage: '/images/mosquito.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Mosquitoes are not only annoying but can also transmit serious diseases. Professional treatment targets resting areas and breeding grounds to significantly reduce mosquito populations around your property.',
    bullets: ['Can transmit dangerous diseases.', 'Make outdoor spaces unusable.', 'Breed rapidly in standing water.'],
    tabs: ['Inspection', 'Treatment', 'Prevention', 'Monitoring']
  },
  'bed-bugs': {
    name: 'Bed Bug',
    title: 'Bed Bug extermination',
    subtitle: 'Sleep soundly again with our comprehensive bed bug treatments.',
    heroImage: '/images/bedroom.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Bed bugs are parasitic insects that feed on human blood. They are masters at hiding and can easily spread throughout a home. Eradication requires a specialized, thorough professional approach.',
    bullets: ['Cause itchy welts and sleep loss.', 'Hide in mattresses, furniture, and cracks.', 'Extremely difficult to treat with DIY methods.'],
    tabs: ['Inspection', 'Treatment', 'Prevention', 'Monitoring']
  },
  'termites': {
    name: 'Termite',
    title: 'Termite protection and treatment',
    subtitle: 'Protect your biggest investment from costly termite damage.',
    heroImage: '/images/ant-macro.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Termites cause billions of dollars in structural damage every year. They silently consume wood from the inside out. Professional termite protection is essential for safeguarding your home.',
    bullets: ['Cause severe structural damage.', 'Often go unnoticed until damage is done.', 'Require specialized baiting or liquid treatments.'],
    tabs: ['Inspection', 'Treatment', 'Prevention', 'Monitoring']
  },
  'mice': {
    name: 'Mice',
    title: 'Mice control and exclusion',
    subtitle: 'Keep your home safe from destructive mice.',
    heroImage: '/images/rodent.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Mice can squeeze through surprisingly small openings to enter your home. They contaminate food and can chew through wires. Professional exclusion and trapping are needed for effective control.',
    bullets: ['Squeeze through tiny openings.', 'Chew wires and cause fire hazards.', 'Contaminate food sources.'],
    tabs: ['Snap Traps', 'Glue Boards', 'Exclusion', 'Monitoring']
  },
  'ticks': {
    name: 'Tick',
    title: 'Tick control and reduction',
    subtitle: 'Protect your family and pets from tick-borne diseases.',
    heroImage: '/images/mosquito.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Ticks are known carriers of Lyme disease and other serious illnesses. Our treatments target the areas where ticks hide, reducing the risk of tick bites on your property.',
    bullets: ['Transmit Lyme disease and other illnesses.', 'Hide in tall grass and wooded areas.', 'Pose risks to both humans and pets.'],
    tabs: ['Inspection', 'Treatment', 'Prevention', 'Monitoring']
  },
  'wasps': {
    name: 'Wasp',
    title: 'Wasp and stinging insect control',
    subtitle: 'Safely remove stinging insects from your property.',
    heroImage: '/images/ant-macro.jpg',
    covered: { essential: 25, complete: 39 },
    description: 'Wasps, hornets, and yellow jackets can be aggressive and their stings are painful and potentially dangerous to those with allergies. Professional removal is crucial for safety.',
    bullets: ['Can deliver painful, dangerous stings.', 'Build nests in eaves, attics, and trees.', 'Become aggressive when defending nests.'],
    tabs: ['Inspection', 'Treatment', 'Prevention', 'Monitoring']
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
  if (!PEST_DATA[slug]) {
    slug = 'ants'; // fallback
  }
  
  const pest = PEST_DATA[slug];
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
