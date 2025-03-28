
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Label } from '@/components/ui/label';
import { useUserData } from '@/context/UserDataContext';
import RestrictedTextField from '@/components/RestrictedTextField';
import AnimatedTransition from '@/components/AnimatedTransition';
import { motion } from 'framer-motion';

const WorkContext = () => {
  const navigate = useNavigate();
  const { userData, setWorkContext } = useUserData();
  
  const [responsibility, setResponsibility] = useState<string>(
    userData.workContext?.responsibilities?.[0] || ''
  );
  const [task, setTask] = useState<string>(
    userData.workContext?.regularTasks?.[0] || ''
  );
  const [challenge, setChallenge] = useState<string>(
    userData.workContext?.challenges?.[0] || ''
  );
  
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Suggestions for the restricted text fields based on role and department
  const getResponsibilitySuggestion = () => {
    const role = userData.profile?.role || '';
    const department = userData.profile?.department || '';
    
    if (department === 'Marketing') {
      return "e.g., Content creation, Campaign management, Social media marketing";
    } else if (department === 'Sales') {
      return "e.g., Lead generation, Client relationships, Sales presentations";
    } else {
      return "e.g., Project management, Team leadership, Strategic planning";
    }
  };
  
  const getTaskSuggestion = () => {
    const role = userData.profile?.role || '';
    const department = userData.profile?.department || '';
    
    if (department === 'Marketing') {
      return "e.g., Writing blog posts, Creating social media content, Analyzing metrics";
    } else if (department === 'Sales') {
      return "e.g., Cold calling, Sending follow-up emails, Creating proposals";
    } else {
      return "e.g., Email communication, Creating reports, Data analysis";
    }
  };
  
  const getChallengeSuggestion = () => {
    return "e.g., Time management, Information overload, Managing multiple projects";
  };
  
  useEffect(() => {
    // Check if all fields are filled
    setIsFormValid(
      responsibility.trim().length > 0 && 
      task.trim().length > 0 && 
      challenge.trim().length > 0
    );
  }, [responsibility, task, challenge]);
  
  const handleContinue = () => {
    // Save all inputs as single-item arrays to maintain compatibility with existing code
    setWorkContext({
      responsibilities: [responsibility],
      regularTasks: [task],
      challenges: [challenge],
    });
    
    navigate('/ai-report');
  };

  return (
    <AnimatedTransition>
      <Layout
        title="Define Your Workflow"
        subtitle="Tell us about your key responsibility, task, and challenge"
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
              <Label className="text-lg font-medium">Key Responsibility</Label>
            </div>
            <p className="text-sm text-ai-neutral-600 dark:text-ai-neutral-400 pl-11">
              What is the most important responsibility in your role?
            </p>
            
            <div className="pl-11">
              <RestrictedTextField
                id="responsibility"
                label="Your Key Responsibility"
                value={responsibility}
                onChange={setResponsibility}
                placeholder={getResponsibilitySuggestion()}
                helperText="Be specific about your main area of responsibility"
                maxLength={150}
                required={true}
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
              <Label className="text-lg font-medium">Regular Task</Label>
            </div>
            <p className="text-sm text-ai-neutral-600 dark:text-ai-neutral-400 pl-11">
              What task do you perform regularly that could be automated?
            </p>
            
            <div className="pl-11">
              <RestrictedTextField
                id="task"
                label="Your Regular Task"
                value={task}
                onChange={setTask}
                placeholder={getTaskSuggestion()}
                helperText="Describe a task you do frequently that takes up your time"
                maxLength={150}
                required={true}
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
              <Label className="text-lg font-medium">Key Challenge</Label>
            </div>
            <p className="text-sm text-ai-neutral-600 dark:text-ai-neutral-400 pl-11">
              What is your biggest work-related challenge?
            </p>
            
            <div className="pl-11">
              <RestrictedTextField
                id="challenge"
                label="Your Key Challenge"
                value={challenge}
                onChange={setChallenge}
                placeholder={getChallengeSuggestion()}
                helperText="Describe a significant challenge you face in your work"
                maxLength={150}
                required={true}
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
