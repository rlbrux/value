import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/formatters';
import { AssessmentSection } from './AssessmentSection';

export default function CustomerServiceSection() {
  const calculateSavings = (budget: number) => {
    return budget * 0.7; // 70% savings
  };

  const sources = [
    {
      text: 'Klarna achieved remarkable results with their AI implementation, reducing support ticket resolution time from 11 minutes to 2 minutes and generating $40 million in annual profit improvements',
      url: 'https://www.singlegrain.com/blog/ms/klarna-ai/'
    },
    {
      text: 'Businesses typically save around 30% on their customer support costs by implementing chatbots',
      url: 'https://adamconnell.me/chatbot-statistics/'
    },
    {
      text: 'Companies can reduce their cost per support ticket from $40 to $8, representing an 80% reduction, while AI systems can autonomously handle 93% of customer support questions',
      url: 'https://ai-for.business/ai-case-study-saving-80-on-customer-support-costs-with-generative-ai/'
    }
  ];

  return (
    <AssessmentSection
      id="customer-service"
      title="Customer Service AI Agent"
      icon={MessageSquare}
      question="What is your current monthly customer service budget?"
      calculateValue={(value) => ({
        savings: calculateSavings(value),
        label: 'Potential Monthly Savings'
      })}
      sources={sources}
      inputPrefix="$"
    />
  );
}