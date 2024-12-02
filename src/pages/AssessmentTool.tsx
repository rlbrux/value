import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CustomerServiceSection from '../components/assessment/CustomerServiceSection';
import VirtualReceptionistSection from '../components/assessment/VirtualReceptionistSection';
import AppointmentSetterSection from '../components/assessment/AppointmentSetterSection';
import WorkflowAutomationSection from '../components/assessment/WorkflowAutomationSection';
import OneClickOnboardingSection from '../components/assessment/OneClickOnboardingSection';
import TotalSavingsDisplay from '../components/assessment/TotalSavingsDisplay';
import BookingModal from '../components/modals/BookingModal';
import { formatCurrency } from '../utils/formatters';

export default function AssessmentTool() {
  const [showModal, setShowModal] = useState(false);
  const [totalSavings, setTotalSavings] = useState(0);

  const updateTotalSavings = () => {
    const sections = document.querySelectorAll('[data-savings]');
    const total = Array.from(sections).reduce((sum, section) => {
      const savings = parseFloat(section.getAttribute('data-savings') || '0');
      return sum + savings;
    }, 0);
    setTotalSavings(total);
  };

  useEffect(() => {
    const observer = new MutationObserver(updateTotalSavings);
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['data-savings']
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4 filter drop-shadow-lg">
          AI Value Assessment Tool
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Calculate the potential impact of AI on your business operations
        </p>
      </div>

      <div className="space-y-8">
        <CustomerServiceSection />
        <VirtualReceptionistSection />
        <AppointmentSetterSection />
        <WorkflowAutomationSection />
        <OneClickOnboardingSection />

        <div className="flex flex-col items-center justify-center mt-16 space-y-8">
          <TotalSavingsDisplay savings={totalSavings} />
          
          <button
            onClick={() => setShowModal(true)}
            className="w-full md:max-w-md px-8 py-4 text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <span className="flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">Book a FREE AI Audit</span>
              <span className="text-base opacity-90 mt-1 line-through decoration-black">
                Usual Value: {formatCurrency(997)}
              </span>
            </span>
          </button>
        </div>

        <BookingModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>
    </div>
  );
}