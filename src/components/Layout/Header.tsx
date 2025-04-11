import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dumbbell, User, Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/integrations/firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getProfile } from "@/services/profileService"; // Import the getProfile function

const Header: React.FC = () => {
  const [username, setUsername] = useState("کاربر");
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  
  const handleSignOut = () => {
    signOut(auth).then(() => {
      window.location.href = "/login"; // Redirect to login page after sign out
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  // Get user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const profile = await getProfile();
          const name = profile?.name ? profile.name.split(' ')[0] : user.email?.split('@')[0] || "کاربر";
          setUsername(name);
        } catch (error) {
          console.error("Error fetching profile: ", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-10">
      <div className="container mx-auto px-4 py-3">
        {/* Main Header with Logo and Navigation */}
        <div className="flex items-center justify-between">
          <Link to="/home" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Dumbbell className="h-6 w-6" />
            <span className="font-bold text-xl">لیفت لجندز</span>
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* User Avatar for Desktop */}
            <div className="hidden md:block">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" alt={username} />
                <AvatarFallback>{username.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>

            {/* Mobile Menu */}
            <div className="block md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="backdrop-blur-md bg-background/80">
                  <nav className="flex flex-col gap-4 mt-8">
                    <div className="flex flex-col items-center mb-6">
                      <Avatar className="h-16 w-16 mb-2">
                        <AvatarImage src="https://github.com/shadcn.png" alt={username} />
                        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-lg">خوش آمدید، {username}!</span>
                    </div>
                    <Link to="/home" className="px-4 py-2 rounded-md hover:bg-accent">خانه</Link>
                    <Link to="/ai-planner" className="px-4 py-2 rounded-md hover:bg-accent">مشاور هوش مصنوعی</Link>
                    <Link to="/exercises" className="px-4 py-2 rounded-md hover:bg-accent">تمرین‌ها</Link>
                    <Link to="/workout-tracker" className="px-4 py-2 rounded-md hover:bg-accent">ثبت تمرین</Link>
                    <Link to="/profile" className="px-4 py-2 rounded-md hover:bg-accent">پروفایل</Link>
                    <button onClick={handleSignOut} className="px-4 py-2 rounded-md hover:bg-accent text-red-500">خروج</button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        
        {/* Weekly Stats Section - Only shown on homepage */}
        {isHomePage && (
          <div className="mt-6 mb-2">
            <h1 className="text-3xl font-bold">خوش آمدید، {username}!</h1>
            <p className="text-muted-foreground mt-1">"محدودیت‌های خود را به چالش بکشید، تلاش کنید."</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
