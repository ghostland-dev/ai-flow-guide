
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for our context data
interface UserProfile {
  techStack: string[];
  familiarTools: string[];
  department: string;
  role: string;
  keyObjectives: string[];
}

interface WorkContext {
  responsibilities: string[];
  regularTasks: string[];
  challenges: string[];
}

interface AISolution {
  taskChallenge: string;
  aiTools: string[];
  steps: string[];
}

interface AIReport {
  solutions: AISolution[];
  feedback?: {
    helpful: boolean;
    comments?: string;
  };
}

interface UserData {
  currentStep: number;
  apiKey?: string;
  profile?: UserProfile;
  workContext?: WorkContext;
  aiReport?: AIReport;
}

interface UserDataContextType {
  userData: UserData;
  setCurrentStep: (step: number) => void;
  setApiKey: (key: string) => void;
  setProfile: (profile: UserProfile) => void;
  setWorkContext: (workContext: WorkContext) => void;
  setAIReport: (aiReport: AIReport) => void;
  updateFeedback: (helpful: boolean, comments?: string) => void;
  resetData: () => void;
}

// Create the context
const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

// Initial state
const initialUserData: UserData = {
  currentStep: 1,
};

// Provider component
export const UserDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    // Load from localStorage if available
    const savedData = localStorage.getItem('aiWorkflowUserData');
    return savedData ? JSON.parse(savedData) : initialUserData;
  });

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('aiWorkflowUserData', JSON.stringify(userData));
  }, [userData]);

  const setCurrentStep = (step: number) => {
    setUserData(prev => ({ ...prev, currentStep: step }));
  };

  const setApiKey = (key: string) => {
    setUserData(prev => ({ ...prev, apiKey: key }));
  };

  const setProfile = (profile: UserProfile) => {
    setUserData(prev => ({ ...prev, profile }));
  };

  const setWorkContext = (workContext: WorkContext) => {
    setUserData(prev => ({ ...prev, workContext }));
  };

  const setAIReport = (aiReport: AIReport) => {
    setUserData(prev => ({ ...prev, aiReport }));
  };

  const updateFeedback = (helpful: boolean, comments?: string) => {
    setUserData(prev => ({
      ...prev,
      aiReport: prev.aiReport ? {
        ...prev.aiReport,
        feedback: { helpful, comments }
      } : undefined
    }));
  };

  const resetData = () => {
    setUserData(initialUserData);
    localStorage.removeItem('aiWorkflowUserData');
  };

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setCurrentStep,
        setApiKey,
        setProfile,
        setWorkContext,
        setAIReport,
        updateFeedback,
        resetData
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook to use the context
export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
