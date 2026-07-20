"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLocation } from "@/context/LocationContext";
import { Bug, BedDouble, BugOff, Rat, Bug as Mosquito, Shield, ShieldCheck, Search, UserCheck, PhoneCall, PawPrint, Leaf, HardHat, ChevronRight } from "lucide-react";

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
        <section className="relative w-full h-[600px] flex items-center bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/pest-technician.jpg" 
              alt="Pest Technician" 
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-black mb-2 drop-shadow-lg">PestIQ® Pest Control</h1>
              <p className="text-2xl font-light mb-8 drop-shadow-md">Protecting what matters most</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Link href="/pests/ants" className="border-2 border-[#071b4d] rounded-full px-6 py-3 text-white hover:bg-[#071b4d] hover:bg-opacity-50 transition-colors flex items-center justify-between font-bold backdrop-blur-sm">
                  <span className="flex items-center gap-3"><Bug className="w-5 h-5"/> Pest Control</span>
                  <ChevronRight className="w-5 h-5"/>
                </Link>
                <Link href="/pests/termites" className="border-2 border-[#071b4d] rounded-full px-6 py-3 text-white hover:bg-[#071b4d] hover:bg-opacity-50 transition-colors flex items-center justify-between font-bold backdrop-blur-sm">
                  <span className="flex items-center gap-3"><ShieldCheck className="w-5 h-5"/> Termite Control</span>
                  <ChevronRight className="w-5 h-5"/>
                </Link>
                <Link href="/pests/rodents" className="border-2 border-[#071b4d] rounded-full px-6 py-3 text-white hover:bg-[#071b4d] hover:bg-opacity-50 transition-colors flex items-center justify-between font-bold backdrop-blur-sm">
                  <span className="flex items-center gap-3"><Rat className="w-5 h-5"/> Rodent Control</span>
                  <ChevronRight className="w-5 h-5"/>
                </Link>
                <Link href="/pests/mosquitoes" className="border-2 border-[#071b4d] rounded-full px-6 py-3 text-white hover:bg-[#071b4d] hover:bg-opacity-50 transition-colors flex items-center justify-between font-bold backdrop-blur-sm">
                  <span className="flex items-center gap-3"><Mosquito className="w-5 h-5"/> Mosquito & Tick Control</span>
                  <ChevronRight className="w-5 h-5"/>
                </Link>
              </div>
              <button 
                onClick={() => { document.getElementById('pest-library')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="text-white hover:underline font-medium text-sm"
              >
                View more services ⌄
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-md mt-8 md:mt-0 relative">
              <div className="bg-[#0a2540] text-white text-center py-2 text-xs font-bold tracking-widest uppercase">
                🕐 SUMMER SAVINGS
              </div>
              <div className="p-8 text-center flex flex-col items-center">
                <h2 className="text-3xl font-black text-[#071b4d] mb-4">Save $50 on Pest Control</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Use code <strong className="text-gray-900">SAVE50</strong> at checkout to save $50 when starting a new pest control plan.
                </p>
                <button 
                  onClick={() => setIsAddressModalOpen(true)}
                  className="bg-[#ffc400] text-[#071b4d] px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg flex items-center space-x-2"
                >
                  <span>Get started</span>
                  <ChevronRight className="w-6 h-6"/>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Promo Banner */}
        <section className="bg-[#f5f5f5] w-full py-12 px-4 md:px-8 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-black text-[#071b4d] mb-4">Beat the Bite!</h2>
              <p className="text-xl text-gray-700 mb-6">
                Start Mosquito & Tick Control today and Save $50. <strong>Use code BITE50</strong> at checkout.
              </p>
              <button 
                onClick={() => setIsAddressModalOpen(true)}
                className="bg-[#ffc400] text-[#071b4d] px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors shadow"
              >
                Save Now
              </button>
            </div>
            <div className="flex-1 w-full md:max-w-md h-64 md:h-auto rounded-lg overflow-hidden shadow-md">
              <img src="/images/family-lawn.jpg" alt="Family playing on a lawn" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Section 3: Trust Copy Block */}
        <section className="bg-white py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-[#071b4d] mb-6">When pests show up, so do we.</h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              With over 20 years of experience protecting homes across New York and New Jersey, our local experts understand the unique pest challenges in your area. We deliver fast, effective solutions backed by an ironclad promise.
            </p>
            <div className="max-w-3xl mx-auto bg-[#071b4d] text-white rounded-2xl shadow-xl overflow-hidden mt-12 text-left transform hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-[#1a7a3c] px-8 py-5 flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-white" />
                <h3 className="text-2xl font-black tracking-wide">THE PESTIQ PROMISE</h3>
              </div>
              <div className="p-8 md:p-10">
                <p className="text-lg md:text-xl leading-relaxed text-blue-50 font-medium">
                  <strong className="text-[#ffc400] font-black text-2xl md:text-3xl block mb-4">100% Satisfaction Guarantee</strong>
                  If pests come back between treatments, so will we—at absolutely no additional cost to you. We stand behind our work because your peace of mind is our top priority.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Commitment 3-Column Grid */}
        <section className="bg-gray-50 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-center text-[#071b4d] mb-12 max-w-2xl mx-auto">
              Our commitment to you, your family, and the environment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-[#071b4d]">
                  <PawPrint className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-[#071b4d] mb-3">Pet and family safe</h3>
                <p className="text-gray-600">Applied with care for people and animals</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 text-[#1a7a3c]">
                  <Leaf className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-[#071b4d] mb-3">Eco-conscious solutions</h3>
                <p className="text-gray-600">Smart targeted approaches</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mb-6 text-[#ffc400]">
                  <HardHat className="w-10 h-10 text-[#071b4d]" />
                </div>
                <h3 className="text-xl font-bold text-[#071b4d] mb-3">Local experts</h3>
                <p className="text-gray-600">Local technicians who understand your area</p>
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
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-12 border-b border-gray-200 pb-4">
              {pestLibrary.map(pest => (
                <button 
                  key={pest.name}
                  onClick={() => setActiveTab(pest.name)}
                  className={`flex flex-col items-center p-2 transition-colors relative ${activeTab === pest.name ? "text-[#1a7a3c]" : "text-gray-500 hover:text-gray-800"}`}
                >
                  <div className="mb-2 text-current">{pest.icon}</div>
                  <span className="text-sm font-semibold">{pest.name}</span>
                  {activeTab === pest.name && (
                    <span className="absolute -bottom-4 w-full h-1 bg-[#1a7a3c] rounded-t"></span>
                  )}
                </button>
              ))}
            </div>

            <div className="bg-gray-50 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-lg border border-gray-100 max-w-5xl mx-auto">
              <div className="w-full md:w-1/2 h-64 md:h-auto">
                <img src={currentPest.image} alt={currentPest.name} className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                <h3 className="text-3xl font-black text-[#071b4d] mb-4">{currentPest.name}</h3>
                <p className="text-lg text-gray-700 mb-6">{currentPest.description}</p>
                <blockquote className="border-l-4 border-[#1a7a3c] pl-4 italic text-gray-600 mb-8 font-medium">
                  "Protect your home from {currentPest.name.toLowerCase()} with our targeted, eco-friendly approach."
                </blockquote>
                <button 
                  onClick={() => setIsAddressModalOpen(true)}
                  className="bg-[#ffc400] text-[#071b4d] px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors shadow self-start flex items-center space-x-2"
                >
                  <span>View {currentPest.name.toLowerCase()} control plans</span>
                  <ChevronRight className="w-5 h-5"/>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Process Grid */}
        <section className="bg-[#f5f7fa] py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-center text-[#071b4d] mb-12">
              Local pest control technicians with a process you can trust
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex items-start space-x-6 hover:shadow-md transition-shadow">
                <div className="text-[#071b4d] bg-blue-50 p-4 rounded-full shrink-0">
                  <Search className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#071b4d] mb-3">Thorough inspections</h3>
                  <p className="text-gray-600 leading-relaxed">Our trained exterminators will identify your local pest problem, spot existing and potential issues, and deliver the best, most comprehensive treatments that start working immediately.</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex items-start space-x-6 hover:shadow-md transition-shadow">
                <div className="text-[#1a7a3c] bg-green-50 p-4 rounded-full shrink-0">
                  <UserCheck className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#071b4d] mb-3">Customized treatments</h3>
                  <p className="text-gray-600 leading-relaxed">We'll explain your pest problem and work with you to develop a customized pest management plan to help eliminate pests and prevent them from returning.</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex items-start space-x-6 hover:shadow-md transition-shadow">
                <div className="text-[#ffc400] bg-yellow-50 p-4 rounded-full shrink-0">
                  <ShieldCheck className="w-8 h-8 text-[#071b4d]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#071b4d] mb-3">Lasting protection</h3>
                  <p className="text-gray-600 leading-relaxed">Once we start treatment, you can relax. We guarantee we'll fix your pests and keep them from coming back. Or we'll come back between treatments at no additional cost to you.</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex items-start space-x-6 hover:shadow-md transition-shadow">
                <div className="text-[#071b4d] bg-blue-50 p-4 rounded-full shrink-0">
                  <PhoneCall className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#071b4d] mb-3">Always on support</h3>
                  <p className="text-gray-600 leading-relaxed">We're always here when you need us. With convenient online scheduling and 24/7 customer service, managing your pest control service has never been easier.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Customer Reviews Strip */}
        <section className="bg-[#1a7a3c] py-16 px-4">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3 text-white">
              <h2 className="text-4xl font-black mb-4">The PestIQ Difference</h2>
              <p className="text-xl opacity-90 font-medium">Here's what our customers have to say...</p>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                  <span className="text-xs font-bold text-gray-400">Google</span>
                </div>
                <p className="text-gray-700 text-sm italic mb-4">"Having an account with PestIQ on a quarterly basis gives me peace of mind. They are professional, knowledgeable and kind from beginning to end. Thank you for a great job!"</p>
                <div className="text-xs font-bold text-[#071b4d] uppercase tracking-wider">Carol Swann, Lakewood NJ</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                  <span className="text-xs font-bold text-gray-400">Google</span>
                </div>
                <p className="text-gray-700 text-sm italic mb-4">"From my initial interaction with the specialist over the phone, the Residential Inspector and the Field Professional — this was such a pleasant experience. Each of them were helpful, honest, genuine, and answered all my questions. I highly recommend calling PestIQ for quality work, great pricing, and a positive experience."</p>
                <div className="text-xs font-bold text-[#071b4d] uppercase tracking-wider">Armando Jimenez, Yonkers NY</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                  <span className="text-xs font-bold text-gray-400">Google</span>
                </div>
                <p className="text-gray-700 text-sm italic mb-4">"I have a monthly technician in place, and I feel completely at ease in my home. Highly recommend!"</p>
                <div className="text-xs font-bold text-[#071b4d] uppercase tracking-wider">Bonnie Chen, New Rochelle NY</div>
              </div>
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