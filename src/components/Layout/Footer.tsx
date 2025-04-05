
import React from "react";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-sm text-muted-foreground">
              لیفت لجندز &copy; {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <span className="text-sm text-muted-foreground flex items-center">
              ساخته شده با <Heart className="h-4 w-4 mx-1 text-destructive" /> برای ورزشکاران
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
