
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  type?: 'fadeIn' | 'slideUp' | 'popIn' | 'fadeInUp';
}

const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  popIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    }
  }
};

export const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  type = 'fadeIn'
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate="visible"
      variants={variants[type]}
      transition={{ 
        delay, 
        duration,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedTransition;
