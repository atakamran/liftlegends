
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 to-transparent pointer-events-none"></div>
      <Header />
      <main className={cn(
        "flex-1 container mx-auto px-4 py-6 pb-24 relative",
        isHomePage ? "pt-2" : "pt-6",
        className
      )}>
        <div className="glass-container bg-white/90 backdrop-blur-md rounded-xl border border-gray-100 shadow-lg p-4">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
