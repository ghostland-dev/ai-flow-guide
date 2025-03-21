
import React, { ReactNode, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface AnimatedTransitionProps {
  children: ReactNode;
  className?: string;
  key?: string | number;
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  out: {
    opacity: 0,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ 
  children, 
  className = '', 
  key 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={key}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedTransition;
