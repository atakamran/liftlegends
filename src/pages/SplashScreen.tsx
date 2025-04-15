import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if the user is logged in
      const userToken = localStorage.getItem("userToken");
      console.log("Retrieved userToken:", userToken); // Debugging log
      const isLoggedIn = Boolean(userToken);
      console.log("User logged in status:", isLoggedIn); // Debugging log

      if (isLoggedIn) {
        console.log("Navigating to /home");
        navigate("/home");
      } else {
        console.log("Navigating to /login");
        navigate("/login");
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, [navigate]);

  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const logoSrc = isDarkMode ? "/lovable-uploads/black-logo.png" : "/lovable-uploads/white-logo.png";

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
          initial={{ scale: 0.8, rotate: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <img 
            src={logoSrc} 
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
