import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ExercisesPage from "./pages/Exercises";
import WorkoutTracker from "./pages/WorkoutTracker";
import Profile from "./pages/Profile";
import AiPlanner from "./pages/AiPlanner";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import ProfileForm from "./pages/ProfileForm";
import Payment from "./pages/Payment";
import FoodPlans from "./pages/FoodPlans";
import Supplements from "./pages/Supplements";
import SubscriptionPlans from "./pages/SubscriptionPlans";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile-form" element={<ProfileForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/subscription-plans" element={<SubscriptionPlans />} />
          <Route path="/home" element={<Index />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/workout-tracker" element={<WorkoutTracker />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ai-planner" element={<AiPlanner />} />
          <Route path="/food-plans" element={<FoodPlans />} />
          <Route path="/supplements" element={<Supplements />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
