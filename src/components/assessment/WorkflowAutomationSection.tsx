import React from 'react';
import { Workflow } from 'lucide-react';
import { AssessmentSection } from './AssessmentSection';
import { formatCurrency } from '../../utils/formatters';

export default function WorkflowAutomationSection() {
  const calculateValue = (monthlyManualHours: number) => {
    const hourlyRate = 50;
    const errorCostMultiplier = 200;
    const currentErrorRate = 0.15;
    
    // Current costs
    const currentLaborCost = monthlyManualHours * hourlyRate;
    const currentErrorCost = (monthlyManualHours * currentErrorRate) * errorCostMultiplier;
    const totalCurrentCost = currentLaborCost + currentErrorCost;
    
    // AI-automated costs (70% reduction in hours, 90% reduction in errors)
    const aiHours = monthlyManualHours * 0.3;
    const aiLaborCost = aiHours * hourlyRate;
    const aiErrorCost = (aiHours * (currentErrorRate * 0.1)) * errorCostMultiplier;
    const totalAiCost = aiLaborCost + aiErrorCost;
    
    return totalCurrentCost - totalAiCost;
  };

  const sources = [
    {
      text: 'Organizations implementing AI workflow automation report significant efficiency gains by reducing manual processing time by 70% and minimizing error rates by 90%',
      url: 'https://beslick.com/what-is-ai-workflow-automation/'
    },
    {
      text: 'AI-powered workflow automation can scale operations without additional human resources, handling complex tasks that traditional automation systems struggle with',
      url: 'https://www.pulpstream.com/resources/blog/ai-workflow-automation'
    },
    {
      text: 'Businesses report improved decision-making capabilities and enhanced customer experience through faster response times and personalized service delivery',
      url: 'https://www.leewayhertz.com/ai-for-workflow-automation/'
    }
  ];

  return (
    <AssessmentSection
      id="workflow-automation"
      title="Workflow Automation"
      icon={Workflow}
      question="How many hours per month does your team spend on manual workflows?"
      calculateValue={(value) => ({
        savings: calculateValue(value),
        label: 'Potential Monthly Savings'
      })}
      sources={sources}
      additionalInfo={(value) => ({
        title: 'Cost Breakdown',
        items: [
          `Current Monthly Hours: ${value.toLocaleString()}`,
          `Current Labor Cost: ${formatCurrency(value * 50)}`,
          `Current Error-Related Costs: ${formatCurrency(value * 0.15 * 200)}`,
          `AI-Automated Hours (70% reduction): ${(value * 0.3).toLocaleString()}`,
          `AI-Automated Labor Cost: ${formatCurrency(value * 0.3 * 50)}`,
          `AI Error-Related Costs (90% reduction): ${formatCurrency(value * 0.3 * 0.15 * 0.1 * 200)}`
        ]
      })}
    />
  );
}