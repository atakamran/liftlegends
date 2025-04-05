
import React from "react";
import Header from "./Header";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className={cn("flex-1 container mx-auto px-4 py-6", className)}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
