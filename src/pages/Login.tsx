
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import './Login.css';
import './LoginEffects.css';

const Login = () => {
  const navigate = useNavigate();
  const { theme, getButtonGradient, getTextColor } = useTheme();
  const [showContent, setShowContent] = useState(true);
  
  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [navigate]);
  
  // Set initial background color based on theme
  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#000000' : '#ffffff';
    
    // Cleanup when component unmounts
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [theme]);

  const goToPhoneLogin = () => {
    // Add button press animation with smooth transition
    setShowContent(false);
    // Use a background-matching transition
    document.body.style.backgroundColor = theme === 'dark' ? '#000000' : '#ffffff';
    setTimeout(() => {
      navigate("/phone-login");
    }, 300);
  };

  const goToNewRegistrationFlow = () => {
    // Add button press animation with smooth transition
    setShowContent(false);
    // Use a background-matching transition
    document.body.style.backgroundColor = theme === 'dark' ? '#000000' : '#ffffff';
    setTimeout(() => {
      navigate("/register");
    }, 300);
  };

  // Loading animation has been moved to SplashScreen component

  return (
    <div className={`flex min-h-screen items-center justify-center relative overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-white'} modern-bg`}>
      {/* Modern geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gold accent lines */}
        <motion.div 
          className="gold-accent-line horizontal absolute top-1/4 left-0"
          style={{ width: "100%" }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            width: ["100%", "80%", "100%"],
            left: ["0%", "10%", "0%"]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="gold-accent-line horizontal absolute top-3/4 right-0"
          style={{ width: "75%" }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            width: ["75%", "50%", "75%"]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Diagonal gold line */}
        <motion.div 
          className="gold-accent-line diagonal absolute left-0 bottom-0"
          animate={{
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Subtle gold particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -50],
              x: [0, (Math.random() - 0.5) * 20],
              opacity: [0, 0.7, 0],
              scale: [0, Math.random() + 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4 my-8 z-10"
      >
                <Card className={`overflow-hidden border-0 shadow-2xl ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
                  {/* Modern gold border */}
                  <div className="absolute inset-0 rounded-2xl border border-yellow-500/30"></div>
                  
                  {/* Animated gold accent line */}
                  <motion.div 
                    className="absolute h-px w-3/4 top-0 left-0 bg-gradient-to-r from-yellow-400 to-transparent"
                    animate={{
                      width: ["75%", "40%", "75%"],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div 
                    className="absolute h-px w-1/2 bottom-0 right-0 bg-gradient-to-l from-yellow-400 to-transparent"
                    animate={{
                      width: ["50%", "25%", "50%"],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 4
                    }}
                  />
                  
                  {/* Subtle gold corner accents */}
                  <div className="absolute w-5 h-5 top-0 left-0 border-t border-l border-yellow-500/50 rounded-tl-lg"></div>
                  <div className="absolute w-5 h-5 top-0 right-0 border-t border-r border-yellow-500/50 rounded-tr-lg"></div>
                  <div className="absolute w-5 h-5 bottom-0 left-0 border-b border-l border-yellow-500/50 rounded-bl-lg"></div>
                  <div className="absolute w-5 h-5 bottom-0 right-0 border-b border-r border-yellow-500/50 rounded-br-lg"></div>
                  
                  {/* Minimal gold particles */}
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(8)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="absolute rounded-full bg-yellow-300"
                        style={{
                          width: `${Math.random() * 3 + 1}px`,
                          height: `${Math.random() * 3 + 1}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          boxShadow: `0 0 ${Math.random() * 3 + 1}px rgba(250, 204, 21, 0.7)`,
                        }}
                        animate={{
                          opacity: [0, 0.8, 0],
                          y: [0, -10],
                        }}
                        transition={{
                          duration: 4 + Math.random() * 3,
                          repeat: Infinity,
                          delay: Math.random() * 5,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Card content with theme-adaptive design */}
                  <div className={`relative ${theme === 'dark' ? 'bg-black' : 'bg-white'} rounded-2xl overflow-hidden`}>
                    <CardHeader className="text-center pt-8 relative">
                      <motion.div 
                        className="flex justify-center mb-6"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <motion.div 
                          className="h-24 w-24 rounded-full border-2 border-yellow-500/50 flex items-center justify-center shadow-lg relative overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {/* Gold accent ring */}
                          <motion.div 
                            className="absolute inset-0 rounded-full border-2 border-yellow-400/30"
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          
                          <img 
                            src={theme === 'dark' ? "/lovable-uploads/white-logo.png" : "/lovable-uploads/black-logo.png"} 
                            alt="Lift Legends" 
                            className="h-16 w-16 relative z-10" 
                          />
                        </motion.div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <CardTitle className="text-3xl font-extrabold">
                          <motion.span
                            className="gold-text"
                          >
                            لیفت لجندز
                          </motion.span>
                        </CardTitle>
                        <CardDescription className={`text-lg mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <motion.span
                            animate={{
                              opacity: [0.8, 1, 0.8]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            قدرتمندترین اپلیکیشن بدنسازی
                          </motion.span>
                        </CardDescription>
                      </motion.div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 px-8 pb-8">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        <motion.div whileTap={{ scale: 0.98 }}>
                          <Button 
                            className="w-full py-6 text-black text-lg font-bold rounded-md shadow-lg relative overflow-hidden group gold-button"
                            onClick={goToNewRegistrationFlow}
                          >
                          {/* Gold gradient background is applied via CSS class */}
                          
                          {/* Shine effect on hover */}
                          <motion.div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-30 z-0"
                            style={{ 
                              background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.8), transparent)',
                              backgroundSize: '200% 200%',
                              left: '-100%',
                            }}
                            animate={{
                              left: ['100%'],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              repeatDelay: 2,
                              ease: "easeInOut"
                            }}
                          />
                          
                          {/* Button text */}
                          <motion.span 
                            className="relative z-10 inline-block"
                            whileHover={{ 
                              textShadow: "0 0 8px rgba(0,0,0,0.3)" 
                            }}
                          >
                            بزن بریم
                          </motion.span>
                        </Button>
                        </motion.div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                      >
                        <motion.div whileTap={{ scale: 0.98 }}>
                          <Button 
                            variant="outline" 
                            className={`w-full py-6 text-lg font-bold rounded-md relative overflow-hidden gold-outline-button ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                            onClick={goToPhoneLogin}
                          >
                          {/* Subtle gold border glow */}
                          <motion.div 
                            className="absolute inset-0 rounded-md border border-yellow-400/30"
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          
                          {/* Button text */}
                          <motion.span 
                            className="relative z-10 inline-block"
                            whileHover={{ 
                              textShadow: "0 0 8px rgba(250, 204, 21, 0.5)" 
                            }}
                          >
                            من اکانت دارم
                          </motion.span>
                        </Button>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
    </div>
  );
};

export default Login;
