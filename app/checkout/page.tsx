"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLocation } from "@/context/LocationContext";
import Link from "next/link";

const LockIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-8a2 2 0 00-2-2h-12a2 2 0 00-2 2v8a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const ShieldIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const StarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const StarHalfIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const SpinnerIcon = ({ className = "w-5 h-5 animate-spin" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function CheckoutPage() {
  const { cartItem, streetAddress, propertySqFt, clearCart } = useLocation();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((s) => s + 1);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setReferenceCode(`PIQ-2026-${Math.floor(10000 + Math.random() * 90000)}`);
      clearCart();
      setStep(4);
    }, 2000);
  };

  const planName = cartItem?.planName || "PestFree365+ Plan";
  const monthlyRate = cartItem?.monthlyPrice || "$54.99";
  const initialFee = cartItem?.initialFee || "$149.00";

  return (
    <div className="site-shell site-v3">
      <Header />
      <main className="checkout-page">
        {step === 4 ? (
          <div className="flex justify-center items-center py-16 px-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-2xl w-full overflow-hidden">
              {/* Header Banner */}
              <div className="bg-[#071b4d] px-8 py-10 text-center relative">
                <div className="w-20 h-20 bg-[#ffc400] text-[#071b4d] rounded-full flex items-center justify-center shadow-lg mx-auto mb-6">
                  <CheckIcon className="w-10 h-10" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">Order Confirmed</h1>
                <p className="text-blue-100 text-lg font-medium">Your PestIQ service is officially booked.</p>
              </div>

              {/* Receipt Body */}
              <div className="p-8 sm:p-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-6 mb-6">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Reference Number</p>
                    <p className="text-xl font-bold text-[#071b4d]">{referenceCode}</p>
                  </div>
                  <div className="mt-4 sm:mt-0 text-left sm:text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Status</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                      Processing
                    </span>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Plan Purchased</p>
                      <p className="text-lg font-bold text-gray-900">{planName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Service Address</p>
                      <p className="text-base font-medium text-gray-800">{streetAddress || "Address not provided"}</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <p className="text-xs text-[#1557b8] uppercase tracking-widest font-bold mb-1">Next Steps</p>
                    <p className="text-sm text-gray-800 font-medium">We'll contact you within 24 hours to confirm your final appointment time. Keep an eye on your email.</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-200">
                  <Link href="/portal" className="w-full sm:w-auto flex-1 text-center bg-[#ffc400] hover:bg-[#e6af00] text-[#071b4d] px-8 py-4 rounded-full font-extrabold text-sm uppercase tracking-wider transition-colors shadow-md">
                    Go to My Portal ›
                  </Link>
                  <Link href="/" className="w-full sm:w-auto flex-1 text-center px-8 py-4 rounded-full font-extrabold text-sm uppercase tracking-wider text-gray-500 hover:text-[#071b4d] hover:bg-gray-50 transition-colors">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="header-container checkout-layout">
            <div className="checkout-steps">
              <div className={step > 1 ? "done" : step === 1 ? "active" : ""}>
                <span>{step > 1 ? "✓" : "1"}</span>
                <p><strong>Customer Info</strong><small>Contact details</small></p>
              </div>
              <i />
              <div className={step > 2 ? "done" : step === 2 ? "active" : ""}>
                <span>{step > 2 ? "✓" : "2"}</span>
                <p><strong>Schedule</strong><small>Time & access</small></p>
              </div>
              <i />
              <div className={step === 3 ? "active" : ""}>
                <span>3</span>
                <p><strong>Payment</strong><small>Secure checkout</small></p>
              </div>
            </div>
            
            <div className="checkout-form-area">
              {step === 1 && (
                <form className="review-panel shadow-sm rounded-lg" onSubmit={handleNext}>
                  <header>
                    <p>Step 1 of 3</p>
                    <h1>Let's get started</h1>
                    <span>Please provide your contact information.</span>
                  </header>
                  <div className="checkout-form-grid">
                    <div>
                      <label>First Name</label>
                      <input type="text" required />
                    </div>
                    <div>
                      <label>Last Name</label>
                      <input type="text" required />
                    </div>
                    <div className="wide">
                      <label>Email Address</label>
                      <input type="email" required />
                    </div>
                    <div className="wide">
                      <label>Phone Number</label>
                      <input type="tel" required />
                    </div>
                    <div className="wide">
                      <label>Service Address</label>
                      <input type="text" defaultValue={streetAddress || ""} required />
                    </div>
                    <div className="wide">
                      <label>Property Type</label>
                      <select required>
                        <option value="single">Single Family Home</option>
                        <option value="condo">Condo/Apartment</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="multi">Multi-Family</option>
                      </select>
                    </div>
                    <div className="wide">
                      <label>Pest concern (optional)</label>
                      <textarea rows={3} placeholder="Tell us what you're seeing..."></textarea>
                    </div>
                  </div>
                  <div className="checkout-button-row" style={{ justifyContent: "flex-end" }}>
                    <button type="submit" className="checkout-next hover:bg-[#e6af00] transition-colors shadow-md">
                      Continue to Schedule <ArrowRightIcon />
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form className="review-panel shadow-sm rounded-lg" onSubmit={handleNext}>
                  <header>
                    <p>Step 2 of 3</p>
                    <h1>When works best for you?</h1>
                    <span>Choose a preferred date for your initial service.</span>
                  </header>
                  <div className="checkout-form-grid">
                    <div>
                      <label>Preferred Date</label>
                      <input type="date" required />
                    </div>
                    <div>
                      <label>Arrival Window</label>
                      <select required>
                        <option value="8-12">8am - 12pm</option>
                        <option value="12-4">12pm - 4pm</option>
                        <option value="4-6">4pm - 6pm</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                    <div className="wide">
                      <label>Alternate Date (Optional)</label>
                      <input type="date" />
                    </div>
                    <div className="wide">
                      <label>Access Notes</label>
                      <textarea rows={3} placeholder="Gate codes, dogs in yard, etc."></textarea>
                    </div>
                  </div>
                  <div className="checkout-button-row">
                    <button type="button" onClick={() => setStep(1)} className="hover:text-[#0b2a66]">← Back</button>
                    <button type="submit" className="checkout-next hover:bg-[#e6af00] transition-colors shadow-md">
                      Continue to Payment <ArrowRightIcon />
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <form className="review-panel shadow-sm rounded-lg" onSubmit={handleProcessPayment}>
                  <header>
                    <p>Step 3 of 3</p>
                    <h1>Complete your subscription</h1>
                    <span>Your first service is {initialFee}. Recurring monthly rate: {monthlyRate}/month after first service. Cancel anytime.</span>
                  </header>
                  
                  <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 relative mb-8 shadow-inner">
                    <div className="absolute top-4 right-4 flex items-center gap-1 text-gray-500 text-xs font-semibold">
                      <LockIcon /> Powered by Stripe
                    </div>
                    
                    <div className="checkout-form-grid mt-4">
                      <div className="wide">
                        <label>Card Number</label>
                        <input type="text" placeholder="4242 4242 4242 4242" required className="font-mono tracking-widest text-lg" />
                      </div>
                      <div>
                        <label>Expiration (MM/YY)</label>
                        <input type="text" placeholder="MM/YY" required className="font-mono tracking-widest" />
                      </div>
                      <div>
                        <label>CVC</label>
                        <input type="text" placeholder="123" required className="font-mono tracking-widest" />
                      </div>
                      <div className="wide">
                        <label>Cardholder Name</label>
                        <input type="text" placeholder="Name on card" required />
                      </div>
                      <div className="wide">
                        <label>Billing ZIP</label>
                        <input type="text" placeholder="ZIP code" required />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className={`w-full text-white py-4 rounded-full font-bold text-lg flex justify-center items-center gap-3 transition-all shadow-md ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1a7a3c] hover:bg-[#15612f]'}`}
                  >
                    {isProcessing ? (
                      <>
                        <SpinnerIcon /> Processing payment...
                      </>
                    ) : (
                      `Subscribe — ${monthlyRate}/month`
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                    <LockIcon className="w-3 h-3 text-[#1a7a3c]" /> Your payment info is encrypted and secure. You can cancel anytime from your portal.
                  </p>

                  <div className="checkout-button-row">
                    <button type="button" onClick={() => setStep(2)} disabled={isProcessing} className="hover:text-[#0b2a66]">← Back</button>
                  </div>
                </form>
              )}
            </div>
            
            <aside className="order-summary rounded-xl">
              <div className="mb-6 flex items-center gap-2 text-[#071b4d]">
                <ShieldIcon /> <span className="font-bold text-lg tracking-tight">PestIQ</span>
              </div>
              
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Your Order</span>
              <h2 className="text-xl font-bold text-[#071b4d] mb-4">{planName}</h2>
              
              <div className="text-sm text-gray-600 mb-6 leading-relaxed">
                {streetAddress ? (
                  <p>{streetAddress}</p>
                ) : (
                  <p>Address not provided</p>
                )}
                <p className="mt-1 font-medium">{propertySqFt ? `${propertySqFt} sq ft` : 'TBD'}</p>
              </div>

              <div className="border-t border-gray-200 py-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Initial Service Fee</span>
                  <strong className="text-[#071b4d]">{initialFee}</strong>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Monthly Rate</span>
                  <strong className="text-[#071b4d]">{monthlyRate}</strong>
                </div>
              </div>

              <div className="bg-[#e9f1fb] border border-[#b9c0ca] rounded-md p-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="text-[#1a7a3c] w-5 h-5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#071b4d] text-xs block mb-1">No payment collected today</strong>
                    <p className="text-gray-600 text-[10px] leading-tight">Your appointment request will be reviewed before confirmation.</p>
                  </div>
                </div>
              </div>

              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block pt-4 border-t border-gray-200">Your Protection</span>
              <ul className="space-y-2 mb-6">
                <li className="flex gap-2 text-xs text-gray-600 font-medium">
                  <CheckIcon className="text-[#1a7a3c] w-4 h-4 flex-shrink-0" /> PestIQ Guarantee included
                </li>
                <li className="flex gap-2 text-xs text-gray-600 font-medium">
                  <CheckIcon className="text-[#1a7a3c] w-4 h-4 flex-shrink-0" /> Licensed technician dispatched
                </li>
                <li className="flex gap-2 text-xs text-gray-600 font-medium">
                  <CheckIcon className="text-[#1a7a3c] w-4 h-4 flex-shrink-0" /> Service notes provided after each visit
                </li>
              </ul>

              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block pt-4 border-t border-gray-200">Trust Signals</span>
              <div className="flex items-center gap-1 mb-2">
                <div className="flex text-[#ffc400]">
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarHalfIcon />
                </div>
                <span className="text-xs font-bold text-gray-700 ml-1">4.5</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Rated by 89,000+ customers</p>
              
              <div className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 rounded border border-gray-200 text-xs text-gray-600 font-medium">
                <LockIcon className="w-3 h-3 text-[#1557b8]" /> Secure booking — no payment today
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
