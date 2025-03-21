import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useUserData } from '@/context/UserDataContext';
import { Bot, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const morningsideLogoUrl = "/lovable-uploads/14dbe0ac-9cc9-482d-a71f-707e0d7deebf.png";

const Index = () => {
  const { userData, setApiKey, setCurrentStep } = useUserData();
  const [apiKey, setApiKeyLocal] = useState(userData.apiKey || '');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleStart = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setApiKey(apiKey);
    setCurrentStep(2);
    navigate('/build-profile');
  };

  const iconVariants = {
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        duration: 0.2,
        yoyo: Infinity,
      },
    },
  };

  return (
    <Layout 
      title="Automate Your Workflow with AI"
      subtitle="Let us guide you through implementing AI in your workflow"
      step={1}
      totalSteps={5}
      showBackButton={false}
      showNextButton={false}
    >
      <div className="flex flex-col items-center max-w-xl mx-auto">
        <img 
          src={morningsideLogoUrl} 
          alt="Morningside Logo" 
          className="h-32 mb-12 w-auto object-contain"
        />
        
        <div className="flex justify-center space-x-10 mb-12 w-full">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div 
              className="bg-ai-green-50 p-4 rounded-full inline-block mb-4"
              whileHover="hover"
              variants={iconVariants}
            >
              <Bot className="h-8 w-8 text-ai-green-600" />
            </motion.div>
            <h3 className="text-lg font-medium mb-2">AI Guidance</h3>
            <p className="text-ai-neutral-600 dark:text-ai-neutral-400 text-sm">
              Personalized AI recommendations for your specific workflow
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div 
              className="bg-ai-blue-50 p-4 rounded-full inline-block mb-4"
              whileHover="hover"
              variants={iconVariants}
            >
              <Zap className="h-8 w-8 text-ai-blue-600" />
            </motion.div>
            <h3 className="text-lg font-medium mb-2">Workflow Automation</h3>
            <p className="text-ai-neutral-600 dark:text-ai-neutral-400 text-sm">
              Step-by-step implementation plans tailored to your needs
            </p>
          </motion.div>
        </div>
        
        <div className="glass-panel p-6 w-full mb-8 transition-all duration-300 border-ai-green-200/50">
          <h3 className="text-xl font-medium mb-4 text-center">Enter your OpenAI API Key</h3>
          <p className="text-ai-neutral-600 dark:text-ai-neutral-400 text-sm mb-4 text-center">
            We'll use this to generate personalized recommendations for your workflow. Your key is stored locally and never sent to our servers.
          </p>
          
          <div className="mb-4">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKeyLocal(e.target.value)}
              placeholder="sk-..."
              className="input-with-focus bg-white/70 dark:bg-black/30"
            />
          </div>
          
          <p className="text-xs text-ai-neutral-500 dark:text-ai-neutral-500 mb-6">
            Don't have an API key? <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="text-ai-blue-600 hover:underline">Get one here</a>
          </p>
        </div>
        
        <Button 
          onClick={handleStart}
          className="primary-button group w-full max-w-xs flex justify-center items-center gap-2"
        >
          Start Your Journey
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Layout>
  );
};

export default Index;
