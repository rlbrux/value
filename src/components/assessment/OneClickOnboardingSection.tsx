import React, { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/formatters';

export default function OneClickOnboardingSection() {
  const [clientVolume, setClientVolume] = useState<string>('');
  const [salary, setSalary] = useState<string>('');
  const [savings, setSavings] = useState(0);

  const calculateValue = (newClientsPerMonth: number, onboardingSalary: number) => {
    const onboardingTimeReduction = 0.90; // 90% reduction
    const oldOnboardingTimeHours = 20; // Standard onboarding time per client
    const newOnboardingTimeHours = oldOnboardingTimeHours * (1 - onboardingTimeReduction);
    
    const hourlyRate = onboardingSalary / 160; // Monthly salary to hourly rate
    const currentMonthlyCost = newClientsPerMonth * oldOnboardingTimeHours * hourlyRate;
    const newMonthlyCost = newClientsPerMonth * newOnboardingTimeHours * hourlyRate;
    
    return {
      savings: currentMonthlyCost - newMonthlyCost,
      currentCost: currentMonthlyCost,
      newCost: newMonthlyCost
    };
  };

  const numericClientVolume = parseInt(clientVolume) || 0;
  const numericSalary = parseInt(salary) || 0;
  const result = calculateValue(numericClientVolume, numericSalary);

  // Update savings data attribute for total calculation
  useEffect(() => {
    const section = document.getElementById('one-click-onboarding');
    if (section) {
      section.setAttribute('data-savings', result.savings.toString());
      setSavings(result.savings);
    }
  }, [result.savings]);

  const sources = [
    {
      text: 'Companies report reducing onboarding time from 5+ days to just 10 minutes through automation, representing a 90% reduction in processing time',
      url: 'https://qflowbpm.com/process-onboarding/'
    },
    {
      text: 'Organizations with automated onboarding processes experience up to 60% year-over-year revenue growth and show 82% improvement in new hire retention',
      url: 'https://enboarder.com/blog/employee-engagement-onboarding-stats/'
    },
    {
      text: 'Poor onboarding leads to significant costs, with companies losing up to 20% of an employee\'s salary when they leave within the first 6-12 months',
      url: 'https://withe.co/blog/employee-onboarding-statistics'
    }
  ];

  return (
    <motion.div
      id="one-click-onboarding"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl"
      data-savings={savings}
    >
      <div className="flex items-center space-x-4 mb-4">
        <UserPlus className="h-8 w-8 text-orange-500" />
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          One-Click Onboarding
        </h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How many new clients do you onboard monthly?
            </label>
            <input
              type="number"
              min="0"
              value={clientVolume}
              onChange={(e) => setClientVolume(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What is your onboarding staff's monthly salary?
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                min="0"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {numericClientVolume > 0 && numericSalary > 0 && (
          <div className="mt-4 p-4 bg-orange-50 dark:bg-gray-700 rounded-lg">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-gray-600 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300">Current Monthly Cost</h4>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(result.currentCost)}</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-600 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300">New Monthly Cost</h4>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(result.newCost)}</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-600 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300">Monthly Savings</h4>
                  <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">{formatCurrency(result.savings)}</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Calculation Breakdown</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>Monthly New Clients: {numericClientVolume}</li>
                  <li>Monthly Salary: {formatCurrency(numericSalary)}</li>
                  <li>Hourly Rate: {formatCurrency(numericSalary / 160)}</li>
                  <li>Standard Onboarding Time: 20 hours per client</li>
                  <li>Automated Onboarding Time: 2 hours per client (90% reduction)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Industry Statistics:</h4>
                {sources.map((source, index) => (
                  <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="mb-1">{source.text}</p>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 underline"
                    >
                      Source {index + 1}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}