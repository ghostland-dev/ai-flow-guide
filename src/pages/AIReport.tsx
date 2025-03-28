
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useUserData } from '@/context/UserDataContext';
import { ThumbsUp, ThumbsDown, Copy, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import AnimatedTransition from '@/components/AnimatedTransition';
import { motion } from 'framer-motion';
import RestrictedTextField from '@/components/RestrictedTextField';

// Enhanced AI solutions generator that uses user's specific inputs
const generateAISolutions = async (userData: any) => {
  console.log('Generating AI solutions with user data:', userData);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Extract user data for tailored solutions
  const department = userData.profile?.department || '';
  const role = userData.profile?.role || '';
  const tasks = userData.workContext?.regularTasks || [];
  const challenges = userData.workContext?.challenges || [];
  const objectives = userData.profile?.keyObjectives || [];
  const tools = userData.profile?.techStack || [];
  
  let solutions = [];
  
  // Generate tailored solutions based on user data
  if (department === 'Marketing') {
    const contentChallenge = challenges.find((c: string) => 
      c.toLowerCase().includes('content') || c.toLowerCase().includes('writing')
    );
    
    const analyticsChallenge = challenges.find((c: string) => 
      c.toLowerCase().includes('analytics') || c.toLowerCase().includes('data') || c.toLowerCase().includes('metrics')
    );
    
    const socialChallenge = challenges.find((c: string) => 
      c.toLowerCase().includes('social') || c.toLowerCase().includes('engagement') || c.toLowerCase().includes('audience')
    );
    
    solutions = [
      {
        taskChallenge: contentChallenge || 'Automate content creation and distribution',
        aiTools: ['ChatGPT', 'Jasper', 'Buffer'],
        steps: [
          `Use ChatGPT to generate ${tasks.find((t: string) => t.toLowerCase().includes('content') || t.toLowerCase().includes('writing')) || 'content'} outlines and drafts`,
          `Refine content with Jasper for ${objectives.find((o: string) => o.toLowerCase().includes('brand') || o.toLowerCase().includes('voice')) || 'brand voice'} consistency`,
          `Schedule distribution through Buffer with ${tools.find((t: string) => t.toLowerCase().includes('automation')) || 'automation'} integration`
        ]
      },
      {
        taskChallenge: socialChallenge || 'Streamline social media monitoring and engagement',
        aiTools: ['Mention', 'HootSuite', 'ChatGPT'],
        steps: [
          `Set up Mention to track ${objectives.find((o: string) => o.toLowerCase().includes('brand')) || 'brand'} mentions and competitor activity`,
          `Use ChatGPT to draft personalized ${tasks.find((t: string) => t.toLowerCase().includes('response') || t.toLowerCase().includes('engagement')) || 'response'} templates`,
          `Integrate with HootSuite for centralized ${tasks.find((t: string) => t.toLowerCase().includes('social') || t.toLowerCase().includes('community')) || 'engagement'} management`
        ]
      },
      {
        taskChallenge: analyticsChallenge || 'Automate campaign performance analysis',
        aiTools: ['Google Analytics', 'Supermetrics', 'PowerBI'],
        steps: [
          `Connect ${tasks.find((t: string) => t.toLowerCase().includes('campaign') || t.toLowerCase().includes('report')) || 'campaign'} data sources with Supermetrics`,
          `Set up automated data processing workflows for ${objectives.find((o: string) => o.toLowerCase().includes('efficiency') || o.toLowerCase().includes('reporting')) || 'efficient reporting'}`,
          `Create PowerBI dashboards with AI-assisted insights for ${objectives.find((o: string) => o.toLowerCase().includes('decision') || o.toLowerCase().includes('strategy')) || 'strategic decision-making'}`
        ]
      }
    ];
  } else if (department === 'Sales') {
    const leadChallenge = challenges.find((c: string) => 
      c.toLowerCase().includes('lead') || c.toLowerCase().includes('prospect')
    );
    
    const communicationChallenge = challenges.find((c: string) => 
      c.toLowerCase().includes('communication') || c.toLowerCase().includes('follow-up') || c.toLowerCase().includes('email')
    );
    
    const presentationChallenge = challenges.find((c: string) => 
      c.toLowerCase().includes('presentation') || c.toLowerCase().includes('proposal') || c.toLowerCase().includes('pitch')
    );
    
    solutions = [
      {
        taskChallenge: leadChallenge || 'Automate lead qualification and prioritization',
        aiTools: ['Clearbit', 'HubSpot', 'ChatGPT'],
        steps: [
          `Use Clearbit to enrich ${tasks.find((t: string) => t.toLowerCase().includes('lead') || t.toLowerCase().includes('prospect')) || 'lead'} data automatically`,
          `Implement predictive lead scoring in HubSpot based on ${objectives.find((o: string) => o.toLowerCase().includes('revenue') || o.toLowerCase().includes('sales')) || 'conversion potential'}`,
          `Generate personalized outreach scripts with ChatGPT for ${tasks.find((t: string) => t.toLowerCase().includes('outreach') || t.toLowerCase().includes('communication')) || 'initial outreach'}`
        ]
      },
      {
        taskChallenge: communicationChallenge || 'Streamline follow-up communications',
        aiTools: ['ChatGPT', 'Lavender', 'Salesforce'],
        steps: [
          `Create email templates with ChatGPT based on ${tasks.find((t: string) => t.toLowerCase().includes('follow') || t.toLowerCase().includes('communication')) || 'follow-up'} needs`,
          `Use Lavender to optimize email copy and timing for ${objectives.find((o: string) => o.toLowerCase().includes('response') || o.toLowerCase().includes('engagement')) || 'better response rates'}`,
          `Set up automated sequences in ${tools.find((t: string) => t.toLowerCase().includes('salesforce') || t.toLowerCase().includes('crm')) || 'Salesforce'} to maintain engagement`
        ]
      },
      {
        taskChallenge: presentationChallenge || 'Enhance sales presentations and proposals',
        aiTools: ['Beautiful.ai', 'ChatGPT', 'Canva'],
        steps: [
          `Use Beautiful.ai for AI-powered ${tasks.find((t: string) => t.toLowerCase().includes('presentation') || t.toLowerCase().includes('slide')) || 'presentation'} design`,
          `Generate compelling copy and talking points with ChatGPT focused on ${objectives.find((o: string) => o.toLowerCase().includes('conversion') || o.toLowerCase().includes('closing')) || 'closing deals'}`,
          `Create custom visuals with Canva's AI features that highlight ${tasks.find((t: string) => t.toLowerCase().includes('value') || t.toLowerCase().includes('benefit')) || 'value propositions'}`
        ]
      }
    ];
  } else {
    // Default solutions tailored to user inputs regardless of department
    const adminChallenge = challenges.find((c: string) => 
      c.toLowerCase().includes('admin') || c.toLowerCase().includes('repetitive') || c.toLowerCase().includes('manual')
    );
    
    const documentChallenge = challenges.find((c: string) => 
      c.toLowerCase().includes('document') || c.toLowerCase().includes('content') || c.toLowerCase().includes('file')
    );
    
    const meetingChallenge = challenges.find((c: string) => 
      c.toLowerCase().includes('meeting') || c.toLowerCase().includes('communication') || c.toLowerCase().includes('collaboration')
    );
    
    solutions = [
      {
        taskChallenge: adminChallenge || 'Automate repetitive administrative tasks',
        aiTools: ['Zapier', 'Make.com', 'ChatGPT'],
        steps: [
          `Identify ${tasks.filter((t: string) => t.toLowerCase().includes('repetitive') || t.toLowerCase().includes('manual')).length > 0 ? tasks.filter((t: string) => t.toLowerCase().includes('repetitive') || t.toLowerCase().includes('manual'))[0] : 'repetitive tasks'} for automation`,
          `Create workflows in ${tools.find((t: string) => t.toLowerCase().includes('zapier') || t.toLowerCase().includes('automation')) || 'Zapier or Make.com'} to connect your apps`,
          `Use ChatGPT to generate templates for ${tasks.find((t: string) => t.toLowerCase().includes('email') || t.toLowerCase().includes('communication')) || 'common communications'}`
        ]
      },
      {
        taskChallenge: documentChallenge || 'Streamline document creation and management',
        aiTools: ['ChatGPT', 'Notion AI', 'DocuSign'],
        steps: [
          `Use ChatGPT to draft initial ${tasks.find((t: string) => t.toLowerCase().includes('document') || t.toLowerCase().includes('content')) || 'document'} content`,
          `Organize and enhance documents with ${tools.find((t: string) => t.toLowerCase().includes('notion') || t.toLowerCase().includes('document')) || 'Notion AI'}`,
          `Automate signature collection with DocuSign for ${objectives.find((o: string) => o.toLowerCase().includes('efficiency') || o.toLowerCase().includes('productivity')) || 'improved efficiency'}`
        ]
      },
      {
        taskChallenge: meetingChallenge || 'Improve meeting efficiency and note-taking',
        aiTools: ['Otter.ai', 'Fireflies.ai', 'ChatGPT'],
        steps: [
          `Record ${tasks.find((t: string) => t.toLowerCase().includes('meeting') || t.toLowerCase().includes('call')) || 'meetings'} with Otter.ai for automatic transcription`,
          `Use Fireflies.ai to capture ${objectives.find((o: string) => o.toLowerCase().includes('action') || o.toLowerCase().includes('task')) || 'action items'} automatically`,
          `Generate ${tasks.find((t: string) => t.toLowerCase().includes('summary') || t.toLowerCase().includes('report')) || 'meeting summaries'} with ChatGPT`
        ]
      }
    ];
  }
  
  return solutions;
};

const AIReport = () => {
  const navigate = useNavigate();
  const { userData, setAIReport, updateFeedback } = useUserData();
  const [solutions, setSolutions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [helpfulFeedback, setHelpfulFeedback] = useState<boolean | null>(null);
  const [feedbackComment, setFeedbackComment] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const generatedSolutions = await generateAISolutions(userData);
        setSolutions(generatedSolutions);
        setAIReport({ solutions: generatedSolutions });
      } catch (error) {
        console.error('Error generating AI solutions:', error);
        toast({
          title: "Error",
          description: "Failed to generate AI recommendations. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSolutions();
  }, [userData, setAIReport, toast]);
  
  const handleContinue = () => {
    navigate('/implementation-guide');
  };
  
  const handleFeedback = (helpful: boolean) => {
    setHelpfulFeedback(helpful);
    updateFeedback(helpful, feedbackComment);
    setFeedbackGiven(true);
    
    toast({
      title: "Thank you for your feedback!",
      description: helpful ? "We're glad you found the recommendations helpful." : "We'll use your feedback to improve.",
      duration: 3000,
    });
  };
  
  const handleCopyReport = () => {
    const reportText = solutions.map((solution, index) => (
      `Solution ${index + 1}: ${solution.taskChallenge}\n` +
      `Recommended Tools: ${solution.aiTools.join(', ')}\n` +
      `Implementation Steps:\n${solution.steps.map((step: string) => `- ${step}`).join('\n')}\n\n`
    )).join('');
    
    navigator.clipboard.writeText(reportText);
    
    toast({
      title: "Report copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <AnimatedTransition>
      <Layout
        title="Your Personalized AI Report"
        subtitle="Tailored AI recommendations based on your profile"
        step={4}
        totalSteps={5}
        backTo="/work-context"
        nextTo="/implementation-guide"
        onNext={handleContinue}
        ctaText="View Implementation Guide"
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 text-ai-green-500 animate-spin mb-4" />
            <p className="text-ai-neutral-600 dark:text-ai-neutral-400">
              Generating your personalized AI recommendations...
            </p>
          </div>
        ) : (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium">Recommended AI Solutions</h3>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCopyReport}
                  className="flex items-center gap-1"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  className="glass-panel p-6 border-l-4 border-ai-green-500"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="badge badge-primary mb-2">Solution {index + 1}</div>
                      <h4 className="text-lg font-medium mb-3">{solution.taskChallenge}</h4>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-ai-neutral-700 dark:text-ai-neutral-300 mb-2">
                      Recommended Tools:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {solution.aiTools.map((tool: string, i: number) => (
                        <span 
                          key={i}
                          className="badge badge-secondary"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-ai-neutral-700 dark:text-ai-neutral-300 mb-2">
                      Implementation Steps:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                      {solution.steps.map((step: string, i: number) => (
                        <li key={i} className="text-sm text-ai-neutral-600 dark:text-ai-neutral-400">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-10 p-6 glass-panel"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h4 className="text-lg font-medium mb-4">Was this report helpful?</h4>
              
              {!feedbackGiven ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => handleFeedback(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-ai-green-50"
                    >
                      <ThumbsUp className="w-4 h-4 text-ai-green-600" />
                      Yes, it was helpful
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleFeedback(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-ai-neutral-100"
                    >
                      <ThumbsDown className="w-4 h-4 text-ai-neutral-600" />
                      No, needs improvement
                    </Button>
                  </div>
                  
                  <div>
                    <RestrictedTextField
                      id="feedback-comment"
                      label="Your Specific Feedback"
                      value={feedbackComment}
                      onChange={setFeedbackComment}
                      placeholder="What would make this more useful? Please be specific."
                      helperText="Please provide detailed feedback to help us improve."
                      maxLength={300}
                      className="mt-4"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-ai-green-50 rounded-lg border border-ai-green-200 text-ai-green-800">
                  Thank you for your feedback! We'll use it to improve our recommendations.
                </div>
              )}
            </motion.div>
            
            <motion.div 
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                onClick={handleContinue}
                className="accent-button group text-lg"
              >
                View Implementation Guide
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </Layout>
    </AnimatedTransition>
  );
};

export default AIReport;
