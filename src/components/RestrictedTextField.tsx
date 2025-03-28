
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RestrictedTextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  maxLength?: number;
  required?: boolean;
  className?: string;
}

const RestrictedTextField: React.FC<RestrictedTextFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  helperText,
  maxLength = 100,
  required = false,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <Label htmlFor={id} className="text-base font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        {helperText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help text-ai-neutral-500">
                  <Info size={16} />
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{helperText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      <Input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        className={`w-full p-3 rounded-md border ${
          isFocused 
            ? 'border-ai-green-400 ring-2 ring-ai-green-200' 
            : 'border-ai-neutral-300 dark:border-ai-neutral-700'
        } transition-all duration-200`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      {maxLength && (
        <div className="flex justify-end text-sm text-ai-neutral-500">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default RestrictedTextField;
