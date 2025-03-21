
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUserData } from '@/context/UserDataContext';
import MultiSelect from '@/components/MultiSelect';
import AnimatedTransition from '@/components/AnimatedTransition';
import { motion } from 'framer-motion';

// Sample data
const techStacks = [
  'AWS', 'Microsoft Azure', 'Google Cloud', 'Digital Ocean', 'Heroku',
  'Firebase', 'Supabase', 'Netlify', 'Vercel', 'Cloudflare',
];

const aiTools = [
  'ChatGPT', 'GPT-4', 'Claude', 'Gemini', 'Midjourney',
  'DALL-E', 'Perplexity', 'Anthropic', 'Copilot', 'Jasper',
  'Bing AI', 'Bard', 'AutoGPT', 'Synthesia', 'Runway',
];

const departments = [
  'Marketing', 'Sales', 'Customer Support', 'Human Resources',
  'Product', 'Engineering', 'Design', 'Finance', 'Operations',
  'Legal', 'Research', 'Executive', 'Education', 'Healthcare',
];

const BuildProfile = () => {
  const navigate = useNavigate();
  const { userData, setProfile } = useUserData();
  
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>(
    userData.profile?.techStack || []
  );
  const [selectedTools, setSelectedTools] = useState<string[]>(
    userData.profile?.familiarTools || []
  );
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    userData.profile?.department || ''
  );
  const [role, setRole] = useState<string>(
    userData.profile?.role || ''
  );
  const [objectives, setObjectives] = useState<string>(
    userData.profile?.keyObjectives?.join('\n') || ''
  );
  
  const [isFormValid, setIsFormValid] = useState(false);
  
  useEffect(() => {
    // Check if all required fields are filled
    setIsFormValid(
      selectedDepartment !== '' && 
      role !== '' && 
      objectives.trim() !== ''
    );
  }, [selectedDepartment, role, objectives]);
  
  const handleContinue = () => {
    const objectivesArray = objectives
      .split('\n')
      .map(obj => obj.trim())
      .filter(obj => obj !== '');
    
    setProfile({
      techStack: selectedTechStack,
      familiarTools: selectedTools,
      department: selectedDepartment,
      role: role,
      keyObjectives: objectivesArray,
    });
    
    navigate('/work-context');
  };

  return (
    <AnimatedTransition>
      <Layout
        title="Build Your Profile"
        subtitle="Tell us about yourself, your tech stack, tools, and work context"
        step={2}
        totalSteps={5}
        backTo="/"
        nextTo="/work-context"
        nextDisabled={!isFormValid}
        onNext={handleContinue}
      >
        <motion.div 
          className="space-y-6 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div 
            className="space-y-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Label htmlFor="tech-stack">Tech Stack (Optional)</Label>
            <MultiSelect
              options={techStacks}
              selectedOptions={selectedTechStack}
              onChange={setSelectedTechStack}
              placeholder="Select or add your tech stack..."
              className="w-full"
            />
            <p className="text-xs text-ai-neutral-500">
              Select the cloud platforms and services you currently use
            </p>
          </motion.div>
          
          <motion.div 
            className="space-y-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Label htmlFor="ai-tools">AI Tools You're Familiar With (Optional)</Label>
            <MultiSelect
              options={aiTools}
              selectedOptions={selectedTools}
              onChange={setSelectedTools}
              placeholder="Select or add AI tools..."
              className="w-full"
            />
            <p className="text-xs text-ai-neutral-500">
              Select the AI tools and platforms you've already used
            </p>
          </motion.div>
          
          <motion.div 
            className="space-y-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Label htmlFor="department">Department <span className="text-red-500">*</span></Label>
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="w-full input-with-focus bg-white/70 dark:bg-black/30">
                <SelectValue placeholder="Select your department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
          
          <motion.div 
            className="space-y-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Label htmlFor="role">Role/Job Title <span className="text-red-500">*</span></Label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="E.g., Marketing Manager, Sales Representative"
              className="input-with-focus bg-white/70 dark:bg-black/30"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Label htmlFor="objectives">Key Objectives <span className="text-red-500">*</span></Label>
            <Textarea
              id="objectives"
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              placeholder="Enter your top 2-3 goals or objectives (one per line)"
              className="min-h-20 input-with-focus bg-white/70 dark:bg-black/30"
            />
            <p className="text-xs text-ai-neutral-500">
              What are your primary goals or objectives for implementing AI?
            </p>
          </motion.div>
        </motion.div>
      </Layout>
    </AnimatedTransition>
  );
};

export default BuildProfile;
