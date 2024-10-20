import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const StatusBar = () => {
  // Define the steps in the status bar
  const steps = ['Order', 'Pick Up', 'In Progress', 'Return', 'Success'];
  // Set the current step (0-based index, so 2 means "In Progress")
  const currentStep = 2;

  return (
    <div className="w-full max-w-md mx-auto mt-4 px-2">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {/* Step indicator */}
            <div className="flex flex-col items-center z-10">
              {index <= currentStep ? (
                // Completed or current step
                <CheckCircle2
                  className={`w-6 h-6 ${index < currentStep ? 'text-blue-600' : 'text-blue-600 animate-pulse'}`}
                  fill={index < currentStep ? 'currentColor' : 'none'}
                />
              ) : (
                // Future step
                <Circle className="w-6 h-6 text-gray-300" />
              )}
              {/* Step label */}
              <span className="mt-1 text-[10px] font-medium text-gray-500">{step}</span>
            </div>
            {/* Connector line between steps */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-200 relative">
                {/* Progress indicator on the connector line */}
                <div
                  className={`absolute top-0 left-0 h-full ${
                    index < currentStep ? 'bg-blue-600 w-full' :
                    index === currentStep ? 'bg-blue-600 animate-grow-width' : ''
                  }`}
                />
                {/* Dots on the connector line */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${
                      index < currentStep || (index === currentStep && i < 3) ? 'bg-blue-600' : 'bg-gray-300'
                    } ${index === currentStep && i === 2 ? 'animate-pulse' : ''}`}
                    style={{ left: `${(i + 1) * 16.66}%` }}
                  />
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatusBar;