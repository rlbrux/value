import React from 'react';
import { Bot } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-orange-500" />
            <span className="text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Aniseed AI
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Aniseed AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}