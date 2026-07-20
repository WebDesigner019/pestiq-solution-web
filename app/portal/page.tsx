'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { Calendar, Clock, AlertTriangle, FileText, DollarSign, CalendarCheck } from 'lucide-react'

export default function CustomerPortal() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <div className="flex-grow flex w-full max-w-7xl mx-auto overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-64 bg-[#071b4d] text-white flex-shrink-0 hidden md:block rounded-bl-lg">
          <div className="p-6">
            <div className="font-extrabold text-2xl tracking-wider mb-8 text-[#ffc400]">PEST<span className="text-white">IQ</span></div>
            <nav className="space-y-2 text-sm font-medium">
              <Link href="/portal" className="block px-4 py-3 bg-[#133075] rounded-md text-white border-l-4 border-[#ffc400]">
                Dashboard
              </Link>
              <Link href="#" className="block px-4 py-3 text-gray-300 hover:bg-[#133075] hover:text-white rounded-md transition-colors">
                My Subscriptions
              </Link>
              <Link href="#" className="block px-4 py-3 text-gray-300 hover:bg-[#133075] hover:text-white rounded-md transition-colors">
                Service History
              </Link>
              <Link href="#" className="block px-4 py-3 text-gray-300 hover:bg-[#133075] hover:text-white rounded-md transition-colors">
                Schedule Service
              </Link>
              <Link href="#" className="block px-4 py-3 text-gray-300 hover:bg-[#133075] hover:text-white rounded-md transition-colors">
                Billing & Payment
              </Link>
              <Link href="#" className="block px-4 py-3 text-gray-300 hover:bg-[#133075] hover:text-white rounded-md transition-colors">
                Report a Pest Sighting
              </Link>
              <Link href="#" className="block px-4 py-3 text-gray-300 hover:bg-[#133075] hover:text-white rounded-md transition-colors">
                Account Settings
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6 md:p-10 bg-slate-50">
          
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John Smith!</h1>
              <p className="text-gray-500">Manage your services, billing, and upcoming appointments.</p>
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 font-bold text-sm border border-green-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                PestFree365+ — ACTIVE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Next Scheduled Service */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-4 bg-gray-50 flex justify-between items-center">
                <h2 className="font-bold text-[#071b4d]">Next Scheduled Service</h2>
                <span className="text-xs font-bold text-[#1a7a3c] bg-green-50 px-2 py-1 rounded">UPCOMING</span>
              </div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Routine Exterior Treatment</h3>
                    <p className="text-gray-500 text-sm mb-4">Technician: <span className="font-medium text-gray-700">Mike Rodriguez</span></p>
                    
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 inline-block mb-6">
                      <div className="flex items-center gap-3 text-[#071b4d] font-bold mb-1">
                        <Calendar className="w-5 h-5 text-[#1557b8]" /> Tuesday, August 5, 2026
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 text-sm">
                        <Clock className="w-5 h-5 text-gray-400" /> Arrival Window: 8:00 AM – 12:00 PM
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-3 justify-center">
                    <button className="flex-1 sm:flex-none px-6 py-2 border border-gray-300 text-gray-700 font-bold rounded hover:bg-gray-50 transition-colors text-sm">
                      Reschedule
                    </button>
                    <button className="flex-1 sm:flex-none px-6 py-2 bg-[#1a7a3c] text-white font-bold rounded hover:bg-green-700 transition-colors shadow text-sm">
                      Confirm ✓
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Pest Activity CTA */}
            <div className="bg-[#071b4d] rounded-xl shadow-sm border border-gray-200 text-white p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              </div>
              <div className="text-4xl mb-4 text-[#ffc400] flex justify-center"><AlertTriangle className="w-12 h-12" /></div>
              <h3 className="text-xl font-bold mb-2">Noticed unusual pest activity?</h3>
              <p className="text-sm text-gray-300 mb-6 px-4">Don't wait for your next service. Let us know and we'll dispatch a technician.</p>
              <button className="w-full py-3 bg-[#1a7a3c] hover:bg-green-600 text-white font-bold rounded-full transition-colors shadow-lg text-sm">
                Log a sighting for priority dispatch
              </button>
            </div>
          </div>

          {/* Subscription Overview */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">Subscription Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#071b4d]"><FileText className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">Current Plan</p>
                <p className="font-bold text-gray-900">PestFree365+ Complete Protection</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#1a7a3c]"><DollarSign className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">Monthly Rate</p>
                <p className="font-bold text-gray-900">$54.99 / month</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600"><CalendarCheck className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">Next Billing</p>
                <p className="font-bold text-gray-900">August 15, 2026</p>
              </div>
            </div>
          </div>

          {/* Service History Table */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Service History</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Service Type</th>
                    <th className="px-6 py-4 font-semibold">Technician</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">May 10, 2026</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">Spring Preventative</td>
                    <td className="px-6 py-4 text-gray-600">Sarah Jenkins</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Completed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500"><a href="#" className="text-blue-600 hover:underline">View Report</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">Feb 14, 2026</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">Winter Inspection</td>
                    <td className="px-6 py-4 text-gray-600">Mike Rodriguez</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Completed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500"><a href="#" className="text-blue-600 hover:underline">View Report</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">Nov 02, 2025</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">Initial Service Call</td>
                    <td className="px-6 py-4 text-gray-600">Sarah Jenkins</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Completed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500"><a href="#" className="text-blue-600 hover:underline">View Report</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center">
              <a href="#" className="text-sm font-semibold text-[#071b4d] hover:text-blue-700">View Full History →</a>
            </div>
          </div>

        </main>
      </div>
      
      <Footer />
    </div>
  );
}
