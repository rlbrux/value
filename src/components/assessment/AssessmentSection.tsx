import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface Source {
  text: string;
  url: string;
}

interface CalculationResult {
  savings: number;
  label: string;
}

interface AdditionalInfo {
  title: string;
  items: string[];
}

interface AssessmentSectionProps {
  id: string;
  title: string;
  icon: LucideIcon;
  question: string;
  calculateValue: (value: number) => CalculationResult;
  sources: Source[];
  inputPrefix?: string;
  additionalInfo?: (value: number) => AdditionalInfo;
}

export function AssessmentSection({
  id,
  title,
  icon: Icon,
  question,
  calculateValue,
  sources,
  inputPrefix,
  additionalInfo
}: AssessmentSectionProps) {
  const [value, setValue] = useState<string>('');
  const numericValue = parseFloat(value) || 0;
  const result = calculateValue(numericValue);

  // Update data-savings attribute for total calculation
  useEffect(() => {
    const section = document.getElementById(id);
    if (section) {
      section.setAttribute('data-savings', result.savings.toString());
    }
  }, [id, result.savings]);

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl"
      data-savings={result.savings}
    >
      <div className="flex items-center space-x-4 mb-4">
        <Icon className="h-8 w-8 text-orange-500" />
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {question}
          </label>
          <div className="relative">
            {inputPrefix && (
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                {inputPrefix}
              </span>
            )}
            <input
              type="number"
              min="0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white ${
                inputPrefix ? 'pl-8' : ''
              }`}
            />
          </div>
        </div>

        {numericValue > 0 && (
          <div className="mt-4 p-4 bg-orange-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between mb-4">
              <span className="text-gray-700 dark:text-gray-300">{result.label}:</span>
              <span className="font-semibold text-orange-600 dark:text-orange-400">
                {formatCurrency(result.savings)}
              </span>
            </div>

            {additionalInfo && (
              <div className="mb-4 border-b border-gray-200 dark:border-gray-600 pb-4">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {additionalInfo(numericValue).title}
                </h4>
                <ul className="space-y-1">
                  {additionalInfo(numericValue).items.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
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
        )}
      </div>
    </motion.div>
  );
}