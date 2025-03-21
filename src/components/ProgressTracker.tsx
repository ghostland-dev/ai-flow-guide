
import React from 'react';

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex items-center justify-center mb-2">
        <span className="text-sm font-medium text-ai-neutral-600 dark:text-ai-neutral-400">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      
      <div className="relative w-full h-2 bg-ai-neutral-200 dark:bg-ai-neutral-800 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-ai-green-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-ai-green-500 to-ai-blue-500 animate-pulse-subtle" />
        </div>
      </div>
      
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`flex flex-col items-center ${i + 1 <= currentStep ? 'text-ai-green-600 dark:text-ai-green-400' : 'text-ai-neutral-400 dark:text-ai-neutral-600'}`}
          >
            <div
              className={`w-3 h-3 rounded-full mb-1 
                ${i + 1 < currentStep ? 'bg-ai-green-500' : ''}
                ${i + 1 === currentStep ? 'bg-ai-green-500 ring-4 ring-ai-green-100 dark:ring-ai-green-900/30' : ''}
                ${i + 1 > currentStep ? 'bg-ai-neutral-300 dark:bg-ai-neutral-700' : ''}
              `}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
