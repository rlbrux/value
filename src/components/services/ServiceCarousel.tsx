import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquare, Phone, Calendar, Workflow, UserPlus } from 'lucide-react';
import ServiceCard from './ServiceCard';

const services = [
  {
    icon: MessageSquare,
    title: 'Customer Service AI Agent',
    description: 'An AI assistant that handles customer inquiries 24/7, ensuring fast and efficient support.'
  },
  {
    icon: Phone,
    title: 'AI Virtual Receptionist',
    description: 'A virtual receptionist managing calls and messages with professionalism and ease.'
  },
  {
    icon: Calendar,
    title: 'AI Appointment Setter',
    description: 'An AI tool that schedules appointments accurately, handling time zones and confirmations.'
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Automates repetitive tasks to boost productivity and streamline operations.'
  },
  {
    icon: UserPlus,
    title: 'One Click Onboarding',
    description: 'Simplifies onboarding by automating setup with a single click.'
  }
];

export default function ServiceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-orange-100 dark:bg-gray-700 hover:bg-orange-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-orange-500 dark:text-orange-400" />
        </button>

        <div className="flex-1 mx-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[-1, 0, 1].map((offset) => {
                const index = (currentIndex + offset + services.length) % services.length;
                return <ServiceCard key={index} {...services[index]} />;
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-orange-100 dark:bg-gray-700 hover:bg-orange-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-orange-500 dark:text-orange-400" />
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-orange-500'
                : 'bg-orange-200 dark:bg-gray-700 hover:bg-orange-300 dark:hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}