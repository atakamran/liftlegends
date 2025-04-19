
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";

// User interface based on the application's user structure
interface User {
  phoneNumber: string;
  password: string;
  name?: string;
  age?: number;
  gender?: string;
  currentWeight?: string;
  height?: string;
  targetWeight?: string;
  activityLevel?: string;
  goal?: string;
  subscription_plan?: string;
  permissions?: string;
  createdAt?: string;
}

const Header: React.FC = () => {
  const [username, setUsername] = useState("کاربر");
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/home";
  const { theme } = useTheme();
  const { toast } = useToast();

  const handleSignOut = () => {
    // Set isLoggedIn to false instead of removing it
    localStorage.setItem("isLoggedIn", "false");
    // We keep the user data in localStorage but mark them as logged out
    toast({
      title: "خروج موفق",
      description: "شما با موفقیت از حساب کاربری خود خارج شدید.",
    });
    navigate("/login");
  };

  // Fetch user name from localStorage
  useEffect(() => {
    const fetchUserName = () => {
      try {
        // Try to get user data from currentUser in localStorage
        const currentUserData = localStorage.getItem("currentUser");
        
        if (currentUserData) {
          // Parse the JSON data
          const userData = JSON.parse(currentUserData) as User;
          // Set the username from the parsed data
          const name = userData.name || "کاربر";
          setUsername(name);
        } else {
          // Fallback to checking users array if currentUser is not available
          const phoneNumber = localStorage.getItem("userPhoneNumber");
          if (!phoneNumber) return;
          
          // Get all users from localStorage
          const usersData = localStorage.getItem("users");
          if (usersData) {
            const users = JSON.parse(usersData) as User[];
            // Find the user with matching phone number
            const user = users.find((user: User) => user.phoneNumber === phoneNumber);
            if (user) {
              const name = user.name || "کاربر";
              setUsername(name);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user profile from localStorage: ", error);
      }
    };

    fetchUserName();
  }, [location.pathname]); // Re-fetch when path changes

  return (
    <header className="border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-10">
      <div className="container mx-auto px-4 py-0">
        {/* Main Header with Logo */}
        
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
