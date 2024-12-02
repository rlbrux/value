import React from 'react';
import { Calendar } from 'lucide-react';
import { AssessmentSection } from './AssessmentSection';
import { formatCurrency } from '../../utils/formatters';

export default function AppointmentSetterSection() {
  const calculateValue = (monthlyLeads: number) => {
    const avgDealValue = 1000;
    const standardConversionRate = 0.04; // 4% conversion with 30+ minute response
    const improvedConversionRate = 0.21; // 21% conversion with 5-minute response
    
    const standardRevenue = monthlyLeads * standardConversionRate * avgDealValue;
    const improvedRevenue = monthlyLeads * improvedConversionRate * avgDealValue;
    
    return improvedRevenue - standardRevenue; // Additional revenue
  };

  const sources = [
    {
      text: 'Companies that contact leads within 5 minutes are 21 times more likely to qualify them compared to waiting 30 minutes',
      url: 'https://www.callpage.io/blog/posts/speed-to-lead'
    },
    {
      text: 'A Harvard study shows that reaching out to leads within 10 seconds can increase conversion rates by up to 381%',
      url: 'https://www.trysetter.com/ai-appointment-setter'
    },
    {
      text: 'One HVAC company experienced a 20% increase in bookings and conversions in just the first week of implementing AI calling, saving $20,000 in lost revenue within 30 days',
      url: 'https://www.reddit.com/r/SideProject/comments/1e2kbdz/i_recreated_an_ai_phone_agent_that_saved_20000_in/'
    }
  ];

  return (
    <AssessmentSection
      id="appointment-setter"
      title="AI Appointment Setter"
      icon={Calendar}
      question="How many leads does your business receive per month?"
      calculateValue={(value) => ({
        savings: calculateValue(value),
        label: 'Potential Additional Monthly Revenue'
      })}
      sources={sources}
      additionalInfo={(value) => ({
        title: 'Revenue Comparison',
        items: [
          `Monthly Leads: ${value.toLocaleString()}`,
          `Current Revenue (4% conversion): ${formatCurrency(value * 0.04 * 1000)}`,
          `Improved Revenue (21% conversion): ${formatCurrency(value * 0.21 * 1000)}`,
          `Average Deal Value: ${formatCurrency(1000)}`,
        ]
      })}
    />
  );
}