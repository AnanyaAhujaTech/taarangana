
import { motion, AnimatePresence } from 'motion/react';

const BlurText = ({
  text = '',
  className = '',
  duration = 1.4
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minWidth: 0,
        overflow: 'visible'
      }}
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.p
          key={text}
          initial={{
            opacity: 0,
            filter: 'blur(12px)'
          }}
          animate={{
            opacity: 1,
            filter: 'blur(0px)'
          }}
          exit={{
            opacity: 0,
            filter: 'blur(12px)'
          }}
          transition={{
            opacity: {
              duration,
              ease: 'easeInOut'
            },
            filter: {
              duration,
              ease: 'easeInOut'
            }
          }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            width: '100%',
            margin: 0,
            textAlign: 'center',
            fontWeight: 700,
            transform: 'none',
            willChange: 'opacity, filter'
          }}
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default BlurText;