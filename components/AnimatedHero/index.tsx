import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AnimatedHeroProps = {
  children: React.ReactNode;
};

function AnimatedHero({ children }: AnimatedHeroProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedHero;
