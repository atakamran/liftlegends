
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
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className={cn(
        "flex-1 container mx-auto px-4 py-6 pb-24",
        isHomePage ? "pt-2" : "pt-6",
        className
      )}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
