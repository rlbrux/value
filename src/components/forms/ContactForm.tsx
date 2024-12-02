import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useFormValidation } from '../../hooks/useFormValidation';

export default function ContactForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { values, errors, handleChange, isValid } = useFormValidation({
    initialValues: { name: '', email: '' },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.name.trim()) {
        errors.name = 'Name is required';
      }
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid';
      }
      return errors;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://hook.eu2.make.com/6cviecutftf6xyrofn7cvwa7uttbk58b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Store user data in localStorage
      localStorage.setItem('userEmail', values.email);
      localStorage.setItem('userName', values.name);
      
      // Navigate to assessment
      navigate('/assessment');
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white ${
            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Enter your name"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white ${
            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Enter your email"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          <span>Start Assessment</span>
        )}
      </button>
    </form>
  );
}