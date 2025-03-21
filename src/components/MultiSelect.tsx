
import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { X, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiSelectProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  showSelectedInline?: boolean;
  maxItems?: number;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  onChange,
  placeholder = 'Select options',
  className = '',
  showSelectedInline = true,
  maxItems = 5,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleOption = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    if (isSelected) {
      onChange(selectedOptions.filter(item => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isOpen && searchTerm && !options.includes(searchTerm)) {
      onChange([...selectedOptions, searchTerm]);
      setSearchTerm('');
      e.preventDefault();
    }
  };
  
  const displayedItems = selectedOptions.slice(0, maxItems);
  const remainingCount = selectedOptions.length - maxItems;
  
  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <div 
        className={cn(
          "border border-ai-neutral-300 dark:border-ai-neutral-700 rounded-lg px-3 py-2 flex items-center flex-wrap gap-2 cursor-text min-h-10 transition-all duration-200",
          "focus-within:ring-2 focus-within:ring-ai-green-300/50 focus-within:border-ai-green-300",
          isOpen && "ring-2 ring-ai-green-300/50 border-ai-green-300"
        )}
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        {showSelectedInline && selectedOptions.length > 0 && (
          <div className="flex flex-wrap gap-1 mr-2">
            {displayedItems.map(item => (
              <Badge 
                key={item}
                className="px-2 py-1 bg-ai-green-50 text-ai-green-800 hover:bg-ai-green-100 border border-ai-green-200 flex items-center gap-1"
              >
                {item}
                <X 
                  className="w-3 h-3 ml-1 text-ai-green-600 cursor-pointer hover:text-ai-green-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(item);
                  }}
                />
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Badge className="px-2 py-1 bg-ai-blue-50 text-ai-blue-800 border border-ai-blue-200">
                +{remainingCount} more
              </Badge>
            )}
          </div>
        )}
        
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={selectedOptions.length === 0 ? placeholder : ''}
          className="flex-1 outline-none bg-transparent min-w-[80px] text-foreground placeholder-ai-neutral-500"
        />
        
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <ChevronsUpDown className="w-4 h-4 text-ai-neutral-500" />
        </button>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-ai-neutral-900 border border-ai-neutral-200 dark:border-ai-neutral-700 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-2 text-ai-neutral-500 text-sm">
              {searchTerm ? 'No matches found' : 'No options available'}
            </div>
          ) : (
            filteredOptions.map(option => (
              <div
                key={option}
                className={cn(
                  "px-3 py-2 cursor-pointer flex items-center justify-between",
                  "hover:bg-ai-green-50 dark:hover:bg-ai-green-900/20",
                  selectedOptions.includes(option) && "bg-ai-green-50 dark:bg-ai-green-900/10"
                )}
                onClick={() => toggleOption(option)}
              >
                <span>{option}</span>
                {selectedOptions.includes(option) && (
                  <Check className="w-4 h-4 text-ai-green-600" />
                )}
              </div>
            ))
          )}
          {searchTerm && !options.includes(searchTerm) && (
            <div
              className="px-3 py-2 cursor-pointer flex items-center justify-between border-t border-ai-neutral-200 dark:border-ai-neutral-700 text-ai-blue-600 dark:text-ai-blue-400 hover:bg-ai-blue-50 dark:hover:bg-ai-blue-900/20"
              onClick={() => {
                onChange([...selectedOptions, searchTerm]);
                setSearchTerm('');
                setIsOpen(false);
              }}
            >
              <span>Add "{searchTerm}"</span>
              <Check className="w-4 h-4" />
            </div>
          )}
        </div>
      )}
      
      {!showSelectedInline && selectedOptions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selectedOptions.map(item => (
            <Badge 
              key={item}
              className="px-2 py-1 bg-ai-green-50 text-ai-green-800 hover:bg-ai-green-100 border border-ai-green-200 flex items-center gap-1"
            >
              {item}
              <X 
                className="w-3 h-3 ml-1 text-ai-green-600 cursor-pointer hover:text-ai-green-800"
                onClick={() => toggleOption(item)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
