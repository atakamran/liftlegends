
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ExercisesPage from "./pages/Exercises";
import DayWorkoutPage from "./pages/DayWorkout";
import Profile from "./pages/Profile";
import PersonalInfo from "./pages/PersonalInfo";
import AiPlanner from "./pages/AiPlanner";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Payment from "./pages/Payment";
import FoodPlans from "./pages/FoodPlans";
import Supplements from "./pages/Supplements";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import AboutUs from "./pages/AboutUs";
import PhoneLogin from "./pages/PhoneLogin";
import TokenAuthenticator from "./components/auth/TokenAuthenticator";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/subscription-plans" element={<SubscriptionPlans />} />
              <Route path="/home" element={<Index />} />
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/day-workout/:day" element={<DayWorkoutPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/personal-info" element={<PersonalInfo />} />
              <Route path="/ai-planner" element={<AiPlanner />} />
              <Route path="/food-plans" element={<FoodPlans />} />
              <Route path="/supplements" element={<Supplements />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/phone-login" element={<PhoneLogin />} />
              <Route path="/auth/token" element={<TokenAuthenticator />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
