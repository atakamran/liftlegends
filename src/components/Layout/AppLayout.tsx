
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 to-transparent pointer-events-none"></div>
      <Header />
      <main className={cn(
        "flex-1 container mx-auto px-4 py-6 pb-24 relative",
        isHomePage ? "pt-2" : "pt-6",
        className
      )}>
        <div className="glass-container bg-background/40 backdrop-blur-md rounded-xl border border-white/10 shadow-xl p-4">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
