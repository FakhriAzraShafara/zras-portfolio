import { motion } from "framer-motion";

export const UniverseIllustration = () => {
  return (
                <div className="absolute right-0 top-0 w-1/2 h-auto opacity-90">
            <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Large Planet */}
              <motion.circle
                cx="600"
                cy="200"
                r="60"
                stroke="currentColor"
                strokeWidth="2"
                strokeOpacity="0.5"
                fill="none"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
              />
              
              {/* Planet Ring */}
              <motion.ellipse
                cx="600"
                cy="200"
                rx="80"
                ry="20"
                stroke="currentColor"
                strokeWidth="2"
                strokeOpacity="0.5"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Stars */}
              {[...Array(20)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={450 + Math.random() * 300}
                  cy={100 + Math.random() * 300}
                  r={1 + Math.random() * 2}
                  fill="currentColor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              {/* Shooting Star */}
              <motion.path
                d="M500 150 L700 250"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2,4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />

              {/* Small Planets */}
              <motion.circle
                cx="700"
                cy="150"
                r="20"
                stroke="currentColor"
                strokeWidth="2"
                strokeOpacity="0.5"
                fill="none"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              <motion.circle
                cx="500"
                cy="300"
                r="15"
                stroke="currentColor"
                strokeWidth="2"
                strokeOpacity="0.5"
                fill="none"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </svg>
          </div>
  );
}