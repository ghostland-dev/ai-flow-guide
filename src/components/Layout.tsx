
import React, { ReactNode } from 'react';
import ProgressTracker from './ProgressTracker';
import { useUserData } from '@/context/UserDataContext';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  step: number;
  totalSteps: number;
  showBackButton?: boolean;
  backTo?: string;
  showNextButton?: boolean;
  nextTo?: string;
  nextDisabled?: boolean;
  onNext?: () => void;
  ctaText?: string;
  logoUrl?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  subtitle,
  step,
  totalSteps,
  showBackButton = true,
  backTo = '',
  showNextButton = true,
  nextTo = '',
  nextDisabled = false,
  onNext,
  ctaText = 'Continue',
  logoUrl,
}) => {
  const { setCurrentStep } = useUserData();
  
  const handleNext = () => {
    if (onNext) {
      onNext();
    }
    setCurrentStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-ai-neutral-100 dark:from-background dark:to-ai-neutral-900 transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="mb-8">
          <ProgressTracker currentStep={step} totalSteps={totalSteps} />
        </div>
        
        <div className="glass-panel p-6 md:p-10 animate-scale-in">
          <header className="mb-8">
            {logoUrl && (
              <div className="flex justify-center mb-8">
                <img 
                  src={logoUrl} 
                  alt="Logo" 
                  className="h-40 w-auto object-contain max-w-full"
                  style={{ imageRendering: "auto" }}
                  loading="eager"
                />
              </div>
            )}
            <h1 className="text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-ai-green-700 to-ai-blue-600 font-bold">
              {title}
            </h1>
            {subtitle && (
              <p className="text-center text-ai-neutral-600 dark:text-ai-neutral-300 text-lg md:text-xl max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </header>
          
          <main className="mb-8">
            {children}
          </main>
          
          <footer className="flex justify-between items-center mt-10">
            {showBackButton ? (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(step - 1)}
                className="flex items-center gap-2 transition-all duration-300"
                asChild
              >
                <Link to={backTo}>
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Link>
              </Button>
            ) : (
              <div></div>
            )}
            
            {showNextButton && (
              <Button 
                onClick={handleNext}
                disabled={nextDisabled}
                className="primary-button flex items-center gap-2"
                asChild
              >
                {nextTo ? (
                  <Link to={nextTo}>
                    {ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button>
                    {ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </Button>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
