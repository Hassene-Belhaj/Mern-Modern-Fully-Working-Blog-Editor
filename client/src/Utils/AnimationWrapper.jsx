import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const AnimationWrapper = ({children,initial,animate,transition,exit,key}) => {
  return (
    <AnimatePresence>
       <motion.div 
       initial={initial}
       animate={animate}
       transition={transition}
       exit={exit}     
       key={key} 
       >   
            {children}
     
        </motion.div>
    </AnimatePresence>
  )
}

export default AnimationWrapper