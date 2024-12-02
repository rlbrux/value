import React from 'react';
import { Phone } from 'lucide-react';
import { AssessmentSection } from './AssessmentSection';
import { formatCurrency } from '../../utils/formatters';

export default function VirtualReceptionistSection() {
  const calculateValue = (callVolume: number) => {
    const missedCalls = Math.round(callVolume * 0.25); // 25% missed calls
    const revenuePerLead = 100;
    return missedCalls * revenuePerLead;
  };

  const sources = [
    {
      text: 'Companies can save up to $250,000 over five years compared to employing full-time reception staff, while gaining benefits like 24/7 availability and multilingual support',
      url: 'https://dialzara.com/blog/how-much-does-an-ai-virtual-receptionist-cost/'
    },
    {
      text: 'AI virtual receptionists can handle up to 100 calls simultaneously for a single phone number, dramatically reducing customer wait times and eliminating missed calls',
      url: 'https://dialzara.com/blog/what-is-an-ai-virtual-receptionist-and-how-can-it-benefit-your-business/'
    },
    {
      text: 'One business documented savings of $20,000 in lost revenue within just 30 days by implementing an AI phone agent, primarily by eliminating missed calls and lost leads',
      url: 'https://www.reddit.com/r/SideProject/comments/1e2kbdz/i_recreated_an_ai_phone_agent_that_saved_20000_in/'
    }
  ];

  return (
    <AssessmentSection
      id="virtual-receptionist"
      title="AI Virtual Receptionist"
      icon={Phone}
      question="How many calls does your business receive per month?"
      calculateValue={(value) => ({
        savings: calculateValue(value),
        label: 'Potential Additional Monthly Revenue'
      })}
      sources={sources}
      additionalInfo={(value) => ({
        title: 'Calculation Breakdown',
        items: [
          `Total Monthly Calls: ${value.toLocaleString()}`,
          `Typically Missed Calls (25%): ${Math.round(value * 0.25).toLocaleString()}`,
          `Average Value per Lead: ${formatCurrency(100)}`,
        ]
      })}
    />
  );
}