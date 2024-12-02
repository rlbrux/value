import React from 'react';
import { Calculator, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/formatters';

interface TotalSavingsDisplayProps {
  savings: number;
}

export default function TotalSavingsDisplay({ savings }: TotalSavingsDisplayProps) {
  const annualSavings = savings * 12;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-xl shadow-lg p-6 w-full md:max-w-md"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calculator className="h-6 w-6 text-orange-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Total AI Benefits
          </h3>
        </div>
        <TrendingUp className="h-6 w-6 text-orange-500" />
      </div>

      <div className="space-y-4">
        <div className="rounded-lg p-4 border border-orange-200 dark:border-orange-800">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Impact</p>
          <p className="text-3xl font-bold text-orange-500">
            {formatCurrency(savings)}
          </p>
        </div>

        <div className="rounded-lg p-4 border border-orange-200 dark:border-orange-800">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Annual Projection</p>
          <p className="text-3xl font-bold text-orange-500">
            {formatCurrency(annualSavings)}
          </p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Based on your current inputs across all AI solutions
      </div>
    </motion.div>
  );
}