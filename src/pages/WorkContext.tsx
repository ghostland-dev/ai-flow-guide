
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Label } from '@/components/ui/label';
import { useUserData } from '@/context/UserDataContext';
import MultiSelect from '@/components/MultiSelect';
import AnimatedTransition from '@/components/AnimatedTransition';
import { motion } from 'framer-motion';

// These would normally come from API/backend based on user's profile
const getResponsibilitiesByRole = (role: string, department: string): string[] => {
  // Just some sample data for demonstration purposes
  if (department === 'Marketing') {
    return [
      'Content creation', 'Campaign management', 'Analytics tracking',
      'Social media management', 'Email marketing', 'Lead generation',
      'Brand development', 'SEO optimization', 'Market research',
      'Competitor analysis', 'Customer journey mapping'
    ];
  } else if (department === 'Sales') {
    return [
      'Lead prospecting', 'Sales presentations', 'Deal negotiation',
      'Customer relationship management', 'Pipeline management',
      'Sales forecasting', 'Territory planning', 'Product demonstrations',
      'Closing deals', 'Contract management'
    ];
  } else {
    return [
      'Project management', 'Team leadership', 'Strategic planning',
      'Budget management', 'Resource allocation', 'Performance analysis',
      'Process improvement', 'Stakeholder communication', 'Risk management',
      'Decision making', 'Problem solving'
    ];
  }
};

const getTasksByRole = (role: string, department: string): string[] => {
  // Just some sample data for demonstration purposes
  if (department === 'Marketing') {
    return [
      'Writing blog posts', 'Creating social media content', 'Setting up ad campaigns',
      'Analyzing marketing metrics', 'Conducting A/B tests', 'Creating email newsletters',
      'Optimizing landing pages', 'Designing marketing materials', 'Managing the content calendar'
    ];
  } else if (department === 'Sales') {
    return [
      'Cold calling', 'Sending follow-up emails', 'Updating CRM data',
      'Creating sales proposals', 'Scheduling client meetings', 'Preparing sales reports',
      'Conducting product demos', 'Negotiating with clients', 'Managing sales pipeline'
    ];
  } else {
    return [
      'Email communication', 'Creating reports', 'Scheduling meetings',
      'Data analysis', 'Research', 'Document preparation',
      'Presenting information', 'Taking notes', 'Managing calendars'
    ];
  }
};

const getChallengesByRole = (role: string, department: string): string[] => {
  // Just some sample data for demonstration purposes
  return [
    'Time management', 'Too many repetitive tasks', 'Information overload',
    'Keeping up with industry trends', 'Managing multiple projects',
    'Communication challenges', 'Data organization', 'Meeting deadlines',
    'Prioritizing tasks', 'Maintaining work-life balance'
  ];
};

const WorkContext = () => {
  const navigate = useNavigate();
  const { userData, setWorkContext } = useUserData();
  
  const role = userData.profile?.role || '';
  const department = userData.profile?.department || '';
  
  const [responsibilities, setResponsibilities] = useState<string[]>(
    userData.workContext?.responsibilities || []
  );
  const [tasks, setTasks] = useState<string[]>(
    userData.workContext?.regularTasks || []
  );
  const [challenges, setChallenges] = useState<string[]>(
    userData.workContext?.challenges || []
  );
  
  const [responsibilityOptions, setResponsibilityOptions] = useState<string[]>([]);
  const [taskOptions, setTaskOptions] = useState<string[]>([]);
  const [challengeOptions, setChallengeOptions] = useState<string[]>([]);
  
  const [isFormValid, setIsFormValid] = useState(false);
  
  useEffect(() => {
    setResponsibilityOptions(getResponsibilitiesByRole(role, department));
    setTaskOptions(getTasksByRole(role, department));
    setChallengeOptions(getChallengesByRole(role, department));
  }, [role, department]);
  
  useEffect(() => {
    // Check if at least one field from each section is filled
    setIsFormValid(
      responsibilities.length > 0 && 
      tasks.length > 0 && 
      challenges.length > 0
    );
  }, [responsibilities, tasks, challenges]);
  
  const handleContinue = () => {
    setWorkContext({
      responsibilities,
      regularTasks: tasks,
      challenges,
    });
    
    navigate('/ai-report');
  };

  return (
    <AnimatedTransition>
      <Layout
        title="Define Your Workflow"
        subtitle="Select your responsibilities, tasks, and challenges"
        step={3}
        totalSteps={5}
        backTo="/build-profile"
        nextTo="/ai-report"
        nextDisabled={!isFormValid}
        onNext={handleContinue}
        ctaText="Prepare Your AI Plan"
      >
        <motion.div 
          className="space-y-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div 
            className="glass-panel p-6 space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-ai-green-100 w-8 h-8 rounded-full flex items-center justify-center text-ai-green-700 font-medium">1</div>
              <Label className="text-lg font-medium">Key Responsibilities</Label>
            </div>
            <p className="text-sm text-ai-neutral-600 dark:text-ai-neutral-400 pl-11">
              Select the main responsibilities in your role
            </p>
            
            <div className="pl-11">
              <MultiSelect
                options={responsibilityOptions}
                selectedOptions={responsibilities}
                onChange={setResponsibilities}
                placeholder="Select or add responsibilities..."
                className="w-full"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="glass-panel p-6 space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-ai-blue-100 w-8 h-8 rounded-full flex items-center justify-center text-ai-blue-700 font-medium">2</div>
              <Label className="text-lg font-medium">Regular Tasks</Label>
            </div>
            <p className="text-sm text-ai-neutral-600 dark:text-ai-neutral-400 pl-11">
              Select the tasks you perform regularly that could be automated
            </p>
            
            <div className="pl-11">
              <MultiSelect
                options={taskOptions}
                selectedOptions={tasks}
                onChange={setTasks}
                placeholder="Select or add tasks..."
                className="w-full"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="glass-panel p-6 space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-ai-purple-100 w-8 h-8 rounded-full flex items-center justify-center text-ai-purple-700 font-medium">3</div>
              <Label className="text-lg font-medium">Challenges</Label>
            </div>
            <p className="text-sm text-ai-neutral-600 dark:text-ai-neutral-400 pl-11">
              Select the challenges you face in your work
            </p>
            
            <div className="pl-11">
              <MultiSelect
                options={challengeOptions}
                selectedOptions={challenges}
                onChange={setChallenges}
                placeholder="Select or add challenges..."
                className="w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </Layout>
    </AnimatedTransition>
  );
};

export default WorkContext;
