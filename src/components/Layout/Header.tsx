
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { db } from "@/integrations/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";

const Header: React.FC = () => {
  const [username, setUsername] = useState("کاربر");
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/home";
  const { theme } = useTheme();
  const { toast } = useToast();

  const handleSignOut = () => {
    localStorage.removeItem("userPhoneNumber");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
    toast({
      title: "خروج موفق",
      description: "شما با موفقیت از حساب کاربری خود خارج شدید.",
    });
  };

  // Fetch user name
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const phoneNumber = localStorage.getItem("userPhoneNumber");
        if (!phoneNumber) return;
        
        const userRef = doc(db, "user_profiles", phoneNumber);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const name = userData.name || "کاربر";
          setUsername(name);
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      }
    };

    fetchUserName();
  }, [location.pathname]); // Re-fetch when path changes

  return (
    <header className="border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-10">
      <div className="container mx-auto px-4 py-3">
        {/* Main Header with Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={theme === 'dark' ? '/lovable-uploads/white-logo.png' : '/lovable-uploads/black-logo.png'}
              alt="Lift Legends Logo"
              className="h-8 mr-2"
            />
            <span className="text-xl font-bold">Lift Legends</span>
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
