
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col min-h-screen bg-background`}>
      {/* Background gradient */}
      <div className={`absolute inset-0 ${theme === 'light' ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 to-transparent' : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 to-transparent'} pointer-events-none`}></div>

      {/* Header */}
      <Header />

      {/* Main content */}
      <main
        className={cn(
          "flex-1 container mx-auto px-4 py-6 pb-24 relative",
          isHomePage ? "pt-2" : "pt-6",
          className
        )}
      >
        <div className={`glass-container ${theme === 'light' ? 'bg-white/90' : 'bg-black/90'} backdrop-blur-md rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg p-4 sm:p-6 md:p-8`}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;
