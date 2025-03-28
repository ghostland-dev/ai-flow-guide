import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useUserData } from '@/context/UserDataContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import { motion } from 'framer-motion';

// Define learning resource interface
interface LearningResource {
  title: string;
  url: string;
  type: 'Video' | 'Documentation' | 'Tutorial' | 'Article';
}

// Mock learning resources for tools
const getToolResources = (toolName: string): LearningResource[] => {
  const resources: Record<string, LearningResource[]> = {
    'ChatGPT': [
      { title: 'OpenAI Official Documentation', url: 'https://platform.openai.com/docs/introduction', type: 'Documentation' },
      { title: 'ChatGPT Prompt Engineering Guide', url: 'https://www.youtube.com/watch?v=PDw3Uk9dN9k', type: 'Video' },
      { title: 'Building AI Applications with ChatGPT', url: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/', type: 'Tutorial' },
    ],
    'Zapier': [
      { title: 'Zapier Getting Started Guide', url: 'https://zapier.com/learn/getting-started-guide/', type: 'Documentation' },
      { title: 'Zapier for Beginners', url: 'https://youtu.be/b-tYxL-n0Rs', type: 'Video' },
      { title: 'Automating Your Workflow with Zapier', url: 'https://zapier.com/learn/automation-for-small-businesses/', type: 'Tutorial' },
    ],
    'Make.com': [
      { title: 'Make.com Documentation', url: 'https://www.make.com/en/help/documentation', type: 'Documentation' },
      { title: 'Make.com Beginner Tutorial', url: 'https://youtu.be/H5NdtVCbWG4', type: 'Video' },
      { title: 'Building Your First Scenario', url: 'https://www.make.com/en/help/tutorials', type: 'Tutorial' },
    ],
    'Jasper': [
      { title: 'Jasper AI Documentation', url: 'https://help.jasper.ai/', type: 'Documentation' },
      { title: 'Content Creation with Jasper', url: 'https://www.youtube.com/watch?v=SqI3CvKV4j8', type: 'Video' },
      { title: 'Jasper AI for Marketing Content', url: 'https://www.jasper.ai/blog/how-to-use-jasper', type: 'Article' },
    ],
    'Buffer': [
      { title: 'Buffer Knowledge Base', url: 'https://support.buffer.com/', type: 'Documentation' },
      { title: 'Social Media Scheduling with Buffer', url: 'https://www.youtube.com/watch?v=11xXAiqlPco&t=3s', type: 'Video' },
      { title: 'Buffer Analytics Guide', url: 'https://buffer.com/resources/social-media-analytics/', type: 'Article' },
    ],
    'Notion AI': [
      { title: 'Notion AI Documentation', url: 'https://www.notion.so/help/guides/using-notion-ai', type: 'Documentation' },
      { title: 'Notion AI Tutorial for Beginners', url: 'https://youtu.be/PYwOr9zT1W8', type: 'Video' },
      { title: 'Enhance Your Productivity with Notion AI', url: 'https://www.notion.so/blog/notion-ai', type: 'Article' },
    ],
  };
  
  // Default resources for tools not in our predefined list
  const defaultResources: LearningResource[] = [
    { title: `${toolName} Official Documentation`, url: 'https://www.google.com/search?q=' + encodeURIComponent(`${toolName} documentation`), type: 'Documentation' },
    { title: `${toolName} Tutorial`, url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(`${toolName} tutorial`), type: 'Video' },
    { title: `How to Get Started with ${toolName}`, url: 'https://www.google.com/search?q=' + encodeURIComponent(`how to use ${toolName} guide`), type: 'Article' },
  ];
  
  return resources[toolName] || defaultResources;
};

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

const ToolCard = ({ toolName }: { toolName: string }) => {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    setResources(getToolResources(toolName));
  }, [toolName]);
  
  return (
    <div className="p-4 bg-white dark:bg-ai-neutral-800/50 rounded-lg border border-ai-neutral-200 dark:border-ai-neutral-700 shadow-sm">
      <h4 className="font-medium mb-2">{toolName}</h4>
      <p className="text-sm text-ai-neutral-600 dark:text-ai-neutral-400 mb-3">
        {toolName.includes('GPT') 
          ? 'AI language model to generate and process text content.' 
          : toolName.includes('Zapier') || toolName.includes('Make')
            ? 'Automation tool to connect apps and automate workflows.'
            : 'Tool to enhance and streamline your workflow.'}
      </p>
      
      <Button 
        variant="link" 
        className="text-ai-blue-600 dark:text-ai-blue-400 p-0 h-auto mt-0 text-sm"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Learn more <ArrowRight className="w-3 h-3 ml-1" />
      </Button>
      
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-ai-neutral-200 dark:border-ai-neutral-700">
          <h5 className="text-sm font-medium mb-2">Resources:</h5>
          <ul className="space-y-2">
            {resources.map((resource, i) => (
              <li key={i}>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-ai-blue-600 dark:text-ai-blue-400 flex items-center hover:underline"
                >
                  <span className="inline-block mr-1 px-1.5 py-0.5 text-xs rounded bg-ai-blue-100 dark:bg-ai-blue-900/30 text-ai-blue-800 dark:text-ai-blue-300">
                    {resource.type}
                  </span>
                  {resource.title}
                  <ExternalLink className="w-3 h-3 ml-1 inline" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const ImplementationGuide = () => {
  const { userData } = useUserData();
  const { toast } = useToast();
  
  const solutions = userData.aiReport?.solutions || [];
  
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
                        <ToolCard key={i} toolName={tool} />
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
                            // Generate detailed descriptions based on the step
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
