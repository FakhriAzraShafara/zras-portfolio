import { motion } from "framer-motion";

export const HouseIllustration = ({ side = "left" }: { side?: "left" | "right" }) => {
  return (
    <div className={`absolute ${side}-0 ${side === 'right' ? 'top-0' : 'bottom-0'} w-1/3 h-auto opacity-80`}>
      <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* House Structure */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M150 300 L150 180 L300 120 L450 180 L450 300 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        
        {/* Windows */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          d="M200 200 h40 v50 h-40 Z M360 200 h40 v50 h-40 Z M280 160 h40 v40 h-40 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        
        {/* Door */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          d="M275 300 v-60 h50 v60"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />

        {/* Tree */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          d="M100 300 v-80 M80 240 Q100 220 120 240 M70 260 Q100 230 130 260 M60 280 Q100 240 140 280"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />

        {/* Ground and environment details */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.8 }}
          d="M50 300 C150 290, 300 310, 550 300"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
          strokeDasharray="4,4"
        />
      </svg>
    </div>
  );
};

