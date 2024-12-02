import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/forms/ContactForm';
import ServiceCarousel from '../components/services/ServiceCarousel';

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-6xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
              AI Value Assessment
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover how AI can transform your business operations and boost your bottom line
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
                  Start Your Assessment
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Find out how much value AI can add to your business
                </p>
              </div>

              <ContactForm />
            </motion.div>
          </div>

          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
                Our AI Solutions
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Explore our suite of AI-powered tools designed to revolutionize your business operations
              </p>
            </div>
            <ServiceCarousel />
          </div>
        </motion.div>
      </div>
    </div>
  );
}