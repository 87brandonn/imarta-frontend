import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AnimatedHeroProps = {
  children: React.ReactNode;
  className?: string;
};

function AnimatedHero({ children, className }: AnimatedHeroProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        viewport={{ once: true }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedHero;
