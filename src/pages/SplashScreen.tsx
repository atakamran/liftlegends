
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    // Navigate to login after animation completes
    if (isAnimationComplete) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimationComplete, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        onAnimationComplete={() => setIsAnimationComplete(true)}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <img 
            src="/lovable-uploads/28fee595-d948-482e-8443-851c3a7b07c3.png" 
            alt="Lift Legends Logo" 
            className="h-32 w-32 mb-4" 
          />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl font-bold mb-2"
        >
          لیفت لجندز
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl text-muted-foreground"
        >
          همراه شما در مسیر قهرمانی
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
