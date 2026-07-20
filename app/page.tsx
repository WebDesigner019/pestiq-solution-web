"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLocation } from "@/context/LocationContext";
import { Bug, BedDouble, BugOff, Rat, Bug as Mosquito, Shield, ShieldCheck, Search, UserCheck, PhoneCall, PawPrint, Leaf, HardHat, ChevronRight, ChevronLeft, Star, ChevronDown, Clock } from "lucide-react";

export default function HomePage() {
  const { setIsAddressModalOpen, zipCode, cartItem } = useLocation();
  const [activeTab, setActiveTab] = useState("Ants");

  const pestLibrary = [
    {
      name: "Ants",
      icon: <Bug className="w-7 h-7" />,
      image: "/images/ant-macro.jpg",
      description: "Trails, colonies, and recurring entry points around food or moisture.",
      link: "/pests/ants"
    },
    {
      name: "Bed Bugs",
      icon: <BedDouble className="w-7 h-7" />,
      image: "/images/bedroom.jpg",
      description: "Careful inspection and treatment planning for suspected bed bug activity.",
      link: "/pests/bed-bugs"
    },
    {
      name: "Centipedes",
      icon: <BugOff className="w-7 h-7" />,
      image: "/images/centipede.jpg",
      description: "Fast-moving pests typically found in damp, dark areas of the home.",
      link: "/pests/centipedes-millipedes"
    },
    {
      name: "Cockroaches",
      icon: <Bug className="w-7 h-7" />,
      image: "/images/cockroach.jpg",
      description: "Inspection-led service for kitchen, bathroom, and utility-area activity.",
      link: "/pests/cockroaches"
    },
    {
      name: "Mice & Rats",
      icon: <Rat className="w-7 h-7" />,
      image: "/images/rodent.jpg",
      description: "Help with mice, droppings, travel paths, and possible entry gaps.",
      link: "/pests/rodents"
    },
    {
      name: "Mosquito",
      icon: <Mosquito className="w-7 h-7" />,
      image: "/images/mosquito.jpg",
      description: "Seasonal exterior service based on shade, water, and breeding conditions.",
      link: "/pests/mosquitoes"
    },
    {
      name: "Spiders",
      icon: <Bug className="w-7 h-7" />,
      image: "/images/spider.jpg",
      description: "Web reduction, activity assessment, and practical prevention planning.",
      link: "/pests/spiders"
    },
    {
      name: "Termites",
      icon: <BugOff className="w-7 h-7" />,
      image: "/images/termite.jpg",
      description: "Comprehensive protection against wood-destroying insects.",
      link: "/pests/termites"
    },
    {
      name: "Ticks",
      icon: <Bug className="w-7 h-7" />,
      image: "/images/tick.jpg",
      description: "Protect your family and pets from tick-borne diseases.",
      link: "/pests/ticks"
    },
    {
      name: "Wildlife",
      icon: <Rat className="w-7 h-7" />,
      image: "/images/wildlife.jpg",
      description: "Humane removal and exclusion services for larger pests.",
      link: "/pests/wildlife"
    }
  ];

  const currentPest = pestLibrary.find(p => p.name === activeTab) || pestLibrary[0];

  return (
    <div className="site-shell site-v3 font-sans">
      <Header />
      <main className="w-full">
        {/* Section 1: HERO */}
        <section className="relative w-full h-[600px] flex items-center bg-[#f4f3f0] overflow-hidden">
          {/* Background Image Container */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/pest-technician.jpg" 
              alt="Pest Technician" 
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text readability on left */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
          </div>
          
          {/* Diagonal Dark Blue Shape on Right */}
          <div 
            className="absolute top-0 right-0 bottom-0 w-[20%] bg-[#0a2540] z-0 hidden lg:block"
            style={{ clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0% 100%)" }}
          ></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-white w-full md:w-[55%]">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight drop-shadow-md">PestIQ<sup className="text-lg md:text-xl lg:text-2xl top-[-0.5em]">®</sup> Pest Control</h1>
              <p className="text-xl md:text-2xl font-bold mb-8 drop-shadow-md">Protecting what matters most</p>
              
              <div className="bg-[#0a2540]/85 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl w-max mt-4">
                <div className="flex flex-wrap gap-4 mb-6 max-w-[500px]">
                  <Link href="/pests/ants" className="bg-white hover:bg-gray-100 rounded-full px-6 py-3.5 transition-colors flex items-center gap-2.5 shadow-md w-max">
                    <Bug className="w-5 h-5 text-[#ffc400]"/> 
                    <span className="font-extrabold text-slate-900 text-sm tracking-wide">Pest Control ›</span>
                  </Link>
                  <Link href="/pests/termites" className="bg-white hover:bg-gray-100 rounded-full px-6 py-3.5 transition-colors flex items-center gap-2.5 shadow-md w-max">
                    <ShieldCheck className="w-5 h-5 text-[#ffc400]"/> 
                    <span className="font-extrabold text-slate-900 text-sm tracking-wide">Termite Control ›</span>
                  </Link>
                  <Link href="/pests/rodents" className="bg-white hover:bg-gray-100 rounded-full px-6 py-3.5 transition-colors flex items-center gap-2.5 shadow-md w-max">
                    <Rat className="w-5 h-5 text-[#ffc400]"/> 
                    <span className="font-extrabold text-slate-900 text-sm tracking-wide">Rodent Control ›</span>
                  </Link>
                  <Link href="/pests/mosquitoes" className="bg-white hover:bg-gray-100 rounded-full px-6 py-3.5 transition-colors flex items-center gap-2.5 shadow-md w-max">
                    <Mosquito className="w-5 h-5 text-[#ffc400]"/> 
                    <span className="font-extrabold text-slate-900 text-sm tracking-wide">Mosquito & Tick Control ›</span>
                  </Link>
                </div>
                <button 
                  onClick={() => { document.getElementById('pest-library')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="text-[#ffc400] hover:text-white font-bold text-[15px] transition-colors flex items-center gap-1"
                >
                  View more services <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="w-full md:w-[45%] flex justify-end md:pr-4 mt-8 md:mt-0">
              <div className="bg-[#f4f5f7] rounded shadow-2xl overflow-hidden w-full max-w-sm relative">
                {/* Floating Green Badge */}
                <div className="absolute top-0 left-0 bg-[#1a7a3c] text-white px-4 py-2 font-bold text-[12px] uppercase tracking-wider flex items-center gap-2 rounded-br-lg z-20">
                  <Clock className="w-4 h-4" /> SUMMER SAVINGS
                </div>
                
                <div className="p-8 pt-16">
                  <h2 className="text-[26px] leading-tight font-black text-[#0a2540] mb-4">Save $50 on Pest Control</h2>
                  <p className="text-[#0a2540] font-medium mb-8 text-[15px] leading-relaxed">
                    Use code <strong className="font-bold">SAVE50</strong> at checkout to save $50 when starting a new pest control plan.
                  </p>
                  <button 
                    onClick={() => setIsAddressModalOpen(true)}
                    className="bg-[#ffc400] hover:bg-[#e6af00] text-[#0a2540] font-bold text-[15px] px-8 py-3.5 rounded-full transition-all flex items-center gap-1 w-max shadow-sm"
                  >
                    Get started <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Promo Banner */}
        <div className="w-full h-4 bg-[#1a7a3c]"></div>
        <section className="bg-[#f5f5f5] w-full flex flex-col md:flex-row min-h-[350px]">
          <div className="w-full md:w-1/2 py-16 px-6 md:px-12 flex justify-end" style={{ backgroundImage: 'radial-gradient(#d1d5db 2px, transparent 2px)', backgroundSize: '16px 16px' }}>
            <div className="max-w-lg w-full flex flex-col justify-center">
              <h2 className="text-3xl font-black text-[#071b4d] mb-4">Beat the Bite!</h2>
              <p className="text-lg text-[#071b4d] mb-8 font-medium">
                Start Mosquito & Tick Control today and Save $50. <strong className="font-bold">Use code BITE50</strong> at checkout.²
              </p>
              <button 
                onClick={() => setIsAddressModalOpen(true)}
                className="bg-[#ffc400] text-[#071b4d] px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors shadow-sm w-max text-sm tracking-wide"
              >
                Save Now
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <img src="/images/family-lawn.jpg" alt="Family playing on a lawn" className="w-full h-full object-cover absolute inset-0" />
          </div>
        </section>
        <div className="w-full h-4 bg-[#1a7a3c]"></div>

        {/* Section 3: Trust Copy Block */}
        <section className="bg-white pt-20 pb-12 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-[#071b4d] mb-6">When pests show up, so do we.</h2>
            <p className="text-lg text-[#071b4d] font-medium mb-4 leading-relaxed max-w-3xl mx-auto">
              For nearly a century, PestIQ has been one of America's most trusted names in pest control. Every day, our exterminators serve thousands of homes and businesses nationwide, combining national service with local knowledge to provide best-in-class, proactive pest management solutions. We stop problems before they start and respond quickly if issues arise, keeping your property protected.
            </p>
            <p className="text-lg text-[#071b4d] font-bold mb-10">
              And for extra peace of mind, if pests come back, so do we-guaranteed.<sup>3</sup>
            </p>
            <div className="flex justify-center mt-6">
              <h1 className="text-6xl md:text-8xl font-black italic text-[#1a7a3c] tracking-tighter">PESTIQ IT.</h1>
            </div>
          </div>
        </section>

        {/* Section 3.5: Guarantee Separator */}
        <section className="bg-[#f0f0f0] py-10 px-4 flex justify-center items-center">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 text-left">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-16 h-16 text-[#071b4d] mb-1" strokeWidth={1.5} />
              <span className="font-black text-[#1a7a3c] italic text-xl tracking-tight">PESTIQ IT</span>
              <span className="font-bold text-[#071b4d] text-[11px] uppercase tracking-[0.2em] border-t-2 border-[#071b4d] pt-1">GUARANTEE</span>
            </div>
            <div className="w-full md:w-px h-px md:h-20 bg-gray-300"></div>
            <div className="flex-1 text-[#071b4d] max-w-3xl">
              <p className="text-lg leading-relaxed font-medium">
                The <strong className="font-black">PestIQ It Guarantee</strong> means that if pests come back, so do we – to re-treat at no additional cost. No excuses, just a commitment to care for your home like it's our own with protection you can trust.<sup>3</sup>
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Commitment 3-Column Grid */}
        <section className="bg-white py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-[34px] font-black text-center text-[#071b4d] mb-16 max-w-2xl mx-auto leading-tight">
              Our commitment to you, your family, and the environment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 text-center">
              <div className="px-8 py-6 md:py-0 flex flex-col items-center">
                <div className="mb-6 text-[#071b4d]">
                  <PawPrint className="w-16 h-16" strokeWidth={1.2} />
                </div>
                <h3 className="text-lg font-extrabold text-[#071b4d] mb-3">Pet and family safe</h3>
                <p className="text-gray-500 text-[15px] font-medium leading-snug">PestIQ treats homes with pets by using EPA-approved products</p>
              </div>
              <div className="px-8 py-6 md:py-0 flex flex-col items-center">
                <div className="mb-6 text-[#071b4d]">
                  <Leaf className="w-16 h-16" strokeWidth={1.2} />
                </div>
                <h3 className="text-lg font-extrabold text-[#071b4d] mb-3">Environmentally responsible approach</h3>
                <p className="text-gray-500 text-[15px] font-medium leading-snug">PestIQ practices Integrated Pest Management (IPM)</p>
              </div>
              <div className="px-8 py-6 md:py-0 flex flex-col items-center">
                <div className="mb-6 text-[#071b4d]">
                  <ShieldCheck className="w-16 h-16" strokeWidth={1.2} />
                </div>
                <h3 className="text-lg font-extrabold text-[#071b4d] mb-3">Humane pest removal</h3>
                <p className="text-gray-500 text-[15px] font-medium leading-snug">PestIQ prioritizes humane pest removal and control</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Pest Library Tabs */}
        <section id="pest-library" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-center text-[#071b4d] mb-12">
              Here are some of the most common pests we protect against
            </h2>
            
            <div className="flex flex-wrap justify-center mb-12 border-b border-gray-200">
              {pestLibrary.map(pest => (
                <button 
                  key={pest.name}
                  onClick={() => setActiveTab(pest.name)}
                  className={`flex flex-col items-center p-4 transition-colors relative w-24 h-28 justify-center ${activeTab === pest.name ? "bg-[#f4f5f7] text-[#0a2540]" : "bg-white text-[#0a2540] hover:bg-gray-50"}`}
                >
                  <div className="mb-2 text-[#0a2540]">{pest.icon}</div>
                  <span className="text-[13px] font-extrabold">{pest.name}</span>
                  {activeTab === pest.name && (
                    <span className="absolute bottom-0 w-full h-1 bg-[#1a7a3c]"></span>
                  )}
                </button>
              ))}
            </div>

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8 md:gap-12 mt-8">
              <div className="w-full md:w-[35%]">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                  <img src={currentPest.image} alt={currentPest.name} className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="w-full md:w-[65%] flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="flex-1">
                  <p className="text-[#0a2540] text-[15.5px] leading-relaxed font-medium mb-6">
                    {currentPest.name === 'Ants' ? 'Ants are common insects that can be found in most parts of the world. While there are many different species of ants, all ants have a few defining characteristics. They have bodies with three sections: a head, an abdomen and a thorax. In addition, all ants have six legs and bent antennae.' : currentPest.description}
                  </p>
                  <Link href={`/pests/${currentPest.name.toLowerCase()}`} className="text-[#1a7a3c] font-bold text-[15px] hover:underline">
                    Learn more about {currentPest.name.toLowerCase()}
                  </Link>
                </div>
                
                <div className="hidden md:block w-px bg-[#0a2540]/20 self-stretch"></div>
                
                <div className="flex-1 flex flex-col justify-start md:pl-2">
                  <h3 className="text-2xl font-black text-[#0a2540] mb-8 leading-tight tracking-tight">
                    If {currentPest.name.toLowerCase()} come marching in, we'll help send them packing.
                  </h3>
                  <button 
                    onClick={() => setIsAddressModalOpen(true)}
                    className="bg-[#ffc400] hover:bg-[#e6af00] text-[#0a2540] px-6 py-3 rounded-full font-bold transition-all shadow-sm flex items-center gap-2 w-max text-sm tracking-wide"
                  >
                    View {currentPest.name.toLowerCase().replace(/s$/, '')} control plans ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Process Timeline */}
        <section className="bg-white py-24 px-4 border-t border-gray-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center text-[#071b4d] mb-16 leading-tight max-w-2xl mx-auto">
              Local pest control technicians with a process you can trust
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-6 md:p-8 flex flex-col">
                <span className="text-4xl font-black text-[#f0f0f0] mb-4 leading-none">01</span>
                <h3 className="text-lg font-extrabold text-[#071b4d] mb-3">Thorough inspections</h3>
                <p className="text-gray-500 text-[14.5px] font-medium leading-relaxed">Our trained exterminators identify the root of your local pest problem, spotting existing and potential issues.</p>
              </div>
              <div className="p-6 md:p-8 flex flex-col">
                <span className="text-4xl font-black text-[#f0f0f0] mb-4 leading-none">02</span>
                <h3 className="text-lg font-extrabold text-[#071b4d] mb-3">Custom treatments</h3>
                <p className="text-gray-500 text-[14.5px] font-medium leading-relaxed">We work with you to develop a customized management plan to eliminate pests and prevent them from returning.</p>
              </div>
              <div className="p-6 md:p-8 flex flex-col">
                <span className="text-4xl font-black text-[#f0f0f0] mb-4 leading-none">03</span>
                <h3 className="text-lg font-extrabold text-[#071b4d] mb-3">Lasting protection</h3>
                <p className="text-gray-500 text-[14.5px] font-medium leading-relaxed">Once we start treatment, you can relax. We guarantee we'll fix your pests and keep them from coming back.</p>
              </div>
              <div className="p-6 md:p-8 flex flex-col">
                <span className="text-4xl font-black text-[#f0f0f0] mb-4 leading-none">04</span>
                <h3 className="text-lg font-extrabold text-[#071b4d] mb-3">Always on support</h3>
                <p className="text-gray-500 text-[14.5px] font-medium leading-relaxed">With convenient online scheduling and 24/7 customer service, managing your pest control has never been easier.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Threats & Reviews */}
        <section className="bg-[#1a7a3c] text-white">
          <div className="max-w-7xl mx-auto pt-16 pb-12 px-4 md:px-8">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-2 tracking-tight">The PestIQ Difference</h2>
            <p className="text-center text-green-100 text-lg font-medium mb-12">Here's what our customers have to say...</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white text-gray-900 p-8 shadow-xl relative transform transition-transform hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-[#1557b8] text-sm">Carol Swann</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Lakewood, NJ</p>
                  </div>
                  <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">C</div>
                </div>
                <div className="flex text-[#ffc400] mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-sm font-medium text-gray-700 leading-relaxed line-clamp-4">
                  "Having an account with PestIQ on a quarterly basis gives me peace of mind. They are professional, knowledgeable and kind from beginning to end. Thank you for a great job!"
                </p>
                <p className="text-[10px] text-gray-400 mt-6 font-bold uppercase tracking-widest">2 Months Ago</p>
              </div>

              <div className="bg-white text-gray-900 p-8 shadow-xl relative transform transition-transform hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-[#1557b8] text-sm">Armando Jimenez</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Yonkers, NY</p>
                  </div>
                  <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">A</div>
                </div>
                <div className="flex text-[#ffc400] mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-sm font-medium text-gray-700 leading-relaxed line-clamp-4">
                  "From my initial interaction with the specialist over the phone, the Residential Inspector and the Field Professional — this was such a pleasant experience. Each of them were helpful, honest, genuine, and answered all my questions. I highly recommend calling PestIQ for quality work, great pricing, and a positive experience."
                </p>
                <p className="text-[10px] text-gray-400 mt-6 font-bold uppercase tracking-widest">3 Months Ago</p>
              </div>

              <div className="bg-white text-gray-900 p-8 shadow-xl relative transform transition-transform hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-[#1557b8] text-sm">Bonnie Chen</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">New Rochelle, NY</p>
                  </div>
                  <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">B</div>
                </div>
                <div className="flex text-[#ffc400] mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-sm font-medium text-gray-700 leading-relaxed line-clamp-4">
                  "I have a monthly technician in place, and I feel completely at ease in my home. Highly recommend!"
                </p>
                <p className="text-[10px] text-gray-400 mt-6 font-bold uppercase tracking-widest">5 Months Ago</p>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
              <button className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-[#1a7a3c] transition-colors"><ChevronLeft className="w-5 h-5" /></button>
              <button className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-[#1a7a3c] transition-colors"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
        </section>

        {/* Section 8: Local Experts Split */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl h-96">
              <img src="/images/pest-technician.jpg" alt="Local expert waving" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-black text-[#071b4d] mb-6 leading-tight">Local experts, global support</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                PestIQ combines global expertise with the knowledge of your neighborhood. Using Integrated Pest Management (IPM), an eco-friendly approach that focuses on targeted treatments to solve your problem.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: Email Signup Bar */}
        <section className="bg-[#071b4d] py-10 px-4 border-t-4 border-[#ffc400]">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <h3 className="text-2xl font-bold text-white text-center md:text-left">
              Sign up for deals, updates and a free guide
            </h3>
            <form className="flex w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="px-4 py-3 rounded-l w-full md:w-64 focus:outline-none"
                required
              />
              <button 
                type="submit" 
                className="bg-[#1a7a3c] text-white font-bold px-6 py-3 rounded-r hover:bg-green-700 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </section>

        {/* Section 10: FAQ Accordions */}
        <section className="bg-gray-50 py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center text-[#071b4d] mb-12">
              FAQs about PestIQ pest control services
            </h2>
            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded p-4 shadow-sm group">
                <summary className="font-bold text-lg text-[#071b4d] cursor-pointer list-none flex justify-between items-center">
                  How much does PestIQ cost?
                  <span className="text-xl group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed border-t pt-4">
                  Costs depend on location, property size, and pest type. PestIQ's initial inspections are free. We will come out and create a plan to provide you with the best pest control possible at no cost to you.
                </p>
              </details>
              <details className="bg-white border border-gray-200 rounded p-4 shadow-sm group">
                <summary className="font-bold text-lg text-[#071b4d] cursor-pointer list-none flex justify-between items-center">
                  What services does PestIQ provide?
                  <span className="text-xl group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed border-t pt-4">
                  We offer protection against ants, cockroaches, rodents, spiders, mosquitoes, bed bugs, and more across NYC, Westchester, and Ocean County NJ.
                </p>
              </details>
              <details className="bg-white border border-gray-200 rounded p-4 shadow-sm group">
                <summary className="font-bold text-lg text-[#071b4d] cursor-pointer list-none flex justify-between items-center">
                  How do I pay my PestIQ bill?
                  <span className="text-xl group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed border-t pt-4">
                  Manage billing through your Customer Portal after signup.
                </p>
              </details>
              <details className="bg-white border border-gray-200 rounded p-4 shadow-sm group">
                <summary className="font-bold text-lg text-[#071b4d] cursor-pointer list-none flex justify-between items-center">
                  Is service guaranteed?
                  <span className="text-xl group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed border-t pt-4">
                  Yes. If pests return between treatments, we return at no additional cost.
                </p>
              </details>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}