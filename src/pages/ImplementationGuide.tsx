
import React from 'react';
import Layout from '@/components/Layout';
import { useUserData } from '@/context/UserDataContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Printer, Download, Mail, Save, CheckCircle2, ArrowRight } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import { motion } from 'framer-motion';

const ImplementationStep = ({ number, title, description, isCompleted = false }: any) => (
  <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-ai-neutral-50 dark:hover:bg-ai-neutral-800/40 transition-colors duration-200">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
      isCompleted 
        ? 'bg-ai-green-100 text-ai-green-700' 
        : 'bg-ai-neutral-200 dark:bg-ai-neutral-700 text-ai-neutral-700 dark:text-ai-neutral-300'
    }`}>
      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : number}
    </div>
    <div>
      <h4 className="font-medium text-base mb-1">{title}</h4>
      <p className="text-sm text-ai-neutral-600 dark:text-ai-neutral-400">{description}</p>
    </div>
  </div>
);

const ImplementationGuide = () => {
  const { userData } = useUserData();
  const { toast } = useToast();
  
  const solutions = userData.aiReport?.solutions || [];
  
  // Handle export actions
  const handleExport = (type: 'print' | 'pdf' | 'email' | 'save') => {
    let message = '';
    
    switch (type) {
      case 'print':
        message = 'Preparing document for printing...';
        break;
      case 'pdf':
        message = 'Generating PDF download...';
        break;
      case 'email':
        message = 'Preparing to send guide to your email...';
        break;
      case 'save':
        message = 'Saving guide to your profile...';
        break;
    }
    
    toast({
      title: message,
      duration: 2000,
    });
    
    // Simulate success after delay
    setTimeout(() => {
      toast({
        title: 'Success',
        description: type === 'email' 
          ? 'Guide sent to your email!' 
          : type === 'pdf' 
            ? 'PDF downloaded successfully'
            : type === 'print'
              ? 'Document sent to printer'
              : 'Guide saved to your profile',
        duration: 3000,
      });
    }, 1500);
  };

  return (
    <AnimatedTransition>
      <Layout
        title="AI Implementation Guide"
        subtitle="Step-by-step instructions to implement AI in your workflow"
        step={5}
        totalSteps={5}
        backTo="/ai-report"
        showNextButton={false}
      >
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue={solutions[0]?.taskChallenge || "tab1"} className="w-full">
            <TabsList className="w-full mb-6 bg-ai-neutral-100 dark:bg-ai-neutral-800/50 p-1 rounded-lg">
              {solutions.map((solution, index) => (
                <TabsTrigger 
                  key={index}
                  value={solution.taskChallenge}
                  className="flex-1 py-3 px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-ai-neutral-800 data-[state=active]:shadow-sm rounded-md"
                >
                  Solution {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {solutions.map((solution, index) => (
              <TabsContent 
                key={index} 
                value={solution.taskChallenge}
                className="animate-fade-in"
              >
                <motion.div 
                  className="glass-panel p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-xl font-medium mb-2">{solution.taskChallenge}</h3>
                  <p className="text-ai-neutral-600 dark:text-ai-neutral-400 mb-6">
                    Here's your step-by-step guide to implement this AI solution into your workflow.
                  </p>
                  
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="h-0.5 bg-ai-green-200 dark:bg-ai-green-800/30 flex-grow"></div>
                      <span className="px-4 text-sm font-medium text-ai-neutral-500 dark:text-ai-neutral-400">RECOMMENDED TOOLS</span>
                      <div className="h-0.5 bg-ai-green-200 dark:bg-ai-green-800/30 flex-grow"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {solution.aiTools.map((tool: string, i: number) => (
                        <div 
                          key={i}
                          className="p-4 bg-white dark:bg-ai-neutral-800/50 rounded-lg border border-ai-neutral-200 dark:border-ai-neutral-700 shadow-sm"
                        >
                          <h4 className="font-medium mb-2">{tool}</h4>
                          <p className="text-sm text-ai-neutral-600 dark:text-ai-neutral-400">
                            {/* Mock descriptions based on the tool name */}
                            {tool.includes('GPT') 
                              ? 'AI language model to generate and process text content.' 
                              : tool.includes('Zapier') || tool.includes('Make')
                                ? 'Automation tool to connect apps and automate workflows.'
                                : 'Tool to enhance and streamline your workflow.'}
                          </p>
                          <Button variant="link" className="text-ai-blue-600 dark:text-ai-blue-400 p-0 h-auto mt-2 text-sm">
                            Learn more <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="h-0.5 bg-ai-green-200 dark:bg-ai-green-800/30 flex-grow"></div>
                      <span className="px-4 text-sm font-medium text-ai-neutral-500 dark:text-ai-neutral-400">IMPLEMENTATION STEPS</span>
                      <div className="h-0.5 bg-ai-green-200 dark:bg-ai-green-800/30 flex-grow"></div>
                    </div>
                    
                    <div className="space-y-1">
                      {solution.steps.map((step: string, i: number) => (
                        <ImplementationStep 
                          key={i}
                          number={i + 1}
                          title={step}
                          description={
                            // Generate mock detailed descriptions
                            `Detailed instructions for how to ${step.toLowerCase()}. This would include specific configuration steps, best practices, and troubleshooting tips.`
                          }
                          isCompleted={false}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="outline"
              onClick={() => handleExport('print')}
              className="flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print Guide
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleExport('email')}
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Email Guide
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleExport('save')}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save to Profile
            </Button>
          </motion.div>
          
          <motion.div 
            className="p-6 glass-panel mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-medium mb-2">Next Steps</h3>
            <p className="text-ai-neutral-600 dark:text-ai-neutral-400 mb-4">
              Ready to take your AI implementation to the next level? Schedule a consultation with our AI experts for personalized guidance.
            </p>
            <Button className="primary-button">
              Schedule Consultation
            </Button>
          </motion.div>
        </motion.div>
      </Layout>
    </AnimatedTransition>
  );
};

export default ImplementationGuide;
