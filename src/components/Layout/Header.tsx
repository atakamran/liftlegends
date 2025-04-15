import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { auth } from "@/integrations/firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getProfile } from "@/services/profileService"; // Import the getProfile function
import { useTheme } from "@/context/ThemeContext";

const Header: React.FC = () => {
  const [username, setUsername] = useState("کاربر");
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  const { theme } = useTheme(); // Access theme from ThemeContext

  const handleSignOut = () => {
    signOut(auth).then(() => {
      window.location.href = "/login"; // Redirect to login page after sign out
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  // Fetch user name
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const profile = await getProfile();
        const name = profile?.name || "کاربر";
        setUsername(name);
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <header className="border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-10">
      <div className="container mx-auto px-4 py-3">
        {/* Main Header with Logo */}
        <div className="flex items-center">
          <img
            // src={theme === 'dark' ? '/lovable-uploads/white-logo.png' : '/lovable-uploads/black-logo.png'}
            src='/lovable-uploads/white-logo.png'
            alt="Lift Legends Logo"
            className="h-8 mr-2"
          />
          <span className="text-xl font-bold">Lift Legends</span>
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
