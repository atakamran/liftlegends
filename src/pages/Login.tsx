
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user has completed profile
      const { data: profileData } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", data.user.id)
        .single();

      if (!profileData) {
        navigate("/profile-form");
      } else {
        navigate("/home");
      }
    } catch (error: any) {
      toast({
        title: "خطا در ورود",
        description: error.message || "مشکلی در ورود به حساب کاربری رخ داد.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "ثبت نام موفقیت‌آمیز",
        description: "لطفاً ایمیل خود را برای تأیید حساب کاربری بررسی کنید.",
      });

      navigate("/profile-form");
    } catch (error: any) {
      toast({
        title: "خطا در ثبت نام",
        description: error.message || "مشکلی در ایجاد حساب کاربری رخ داد.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black to-gray-800 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900/20 to-transparent pointer-events-none"></div>
      <Card className="w-full max-w-md glass-container bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/28fee595-d948-482e-8443-851c3a7b07c3.png"
              alt="Lift Legends"
              className="h-16 w-16"
            />
          </div>
          <CardTitle className="text-2xl">لیفت لجندز</CardTitle>
          <CardDescription>وارد حساب کاربری خود شوید یا ثبت نام کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "در حال پردازش..." : "ورود"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSignUp}
            disabled={isLoading}
          >
            ثبت نام
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
