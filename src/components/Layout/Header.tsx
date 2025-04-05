
import React from "react";
import { Link } from "react-router-dom";
import { Dumbbell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header: React.FC = () => {
  return (
    <header className="border-b border-border sticky top-0 bg-background z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <Dumbbell className="h-6 w-6" />
          <span className="font-bold text-xl">لیفت لجندز</span>
        </Link>

        {/* Mobile Menu */}
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="px-4 py-2 rounded-md hover:bg-accent">خانه</Link>
                <Link to="/exercises" className="px-4 py-2 rounded-md hover:bg-accent">تمرین‌ها</Link>
                <Link to="/workout-tracker" className="px-4 py-2 rounded-md hover:bg-accent">ثبت تمرین</Link>
                <Link to="/profile" className="px-4 py-2 rounded-md hover:bg-accent">پروفایل</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <Link to="/" className="px-3 py-2 rounded-md hover:bg-accent">خانه</Link>
          <Link to="/exercises" className="px-3 py-2 rounded-md hover:bg-accent">تمرین‌ها</Link>
          <Link to="/workout-tracker" className="px-3 py-2 rounded-md hover:bg-accent">ثبت تمرین</Link>
          <Link to="/profile" className="px-3 py-2 rounded-md hover:bg-accent flex items-center">
            <User className="mr-2 h-4 w-4" />
            پروفایل
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
