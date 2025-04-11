
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/home');
      }
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate('/home');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      toast({
        title: "ورود موفقیت‌آمیز",
        description: "به لیفت لجندز خوش آمدید!",
      });
      
      navigate("/home");
    } catch (error: any) {
      toast({
        title: "خطا در ورود",
        description: error.message || "مشکلی در ورود پیش آمده است",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!name || !email || !password) {
      toast({
        title: "خطا در ثبت‌نام",
        description: "لطفاً تمام فیلدها را پر کنید",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (error) throw error;
      
      toast({
        title: "ثبت‌نام موفقیت‌آمیز",
        description: "حساب کاربری شما ایجاد شد",
      });
      
      navigate("/profile-form");
    } catch (error: any) {
      toast({
        title: "خطا در ثبت‌نام",
        description: error.message || "مشکلی در ثبت‌نام پیش آمده است",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/profile-form`
        }
      });

      if (error) throw error;
      
      toast({
        title: "در حال اتصال به گوگل",
        description: "لطفا صبر کنید...",
      });
    } catch (error: any) {
      toast({
        title: "خطا در ورود با گوگل",
        description: error.message || "مشکلی در اتصال به گوگل پیش آمده است",
        variant: "destructive",
      });
      setGLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center mb-8">
        <img 
          src="/lovable-uploads/28fee595-d948-482e-8443-851c3a7b07c3.png" 
          alt="Lift Legends Logo" 
          className="h-20 w-20 mb-2" 
        />
        <h1 className="text-3xl font-bold">لیفت لجندز</h1>
      </div>
      
      <Card className="w-full max-w-md bg-background/80 backdrop-blur-sm border border-border/50">
        <CardHeader className="text-center">
          <CardTitle>ورود یا ثبت‌نام</CardTitle>
          <CardDescription>برای استفاده از لیفت لجندز حساب کاربری بسازید یا وارد شوید</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">ورود</TabsTrigger>
              <TabsTrigger value="register">ثبت‌نام</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">ایمیل</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">رمز عبور</Label>
                  <Input 
                    id="login-password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      در حال ورود...
                    </span>
                  ) : "ورود"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">نام</Label>
                  <Input 
                    id="register-name" 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">ایمیل</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">رمز عبور</Label>
                  <Input 
                    id="register-password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      در حال ثبت‌نام...
                    </span>
                  ) : "ثبت‌نام"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <div className="relative w-full mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">یا</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleGoogleLogin} 
            disabled={gLoading || isLoading}
          >
            {gLoading ? (
              <span className="flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                در حال اتصال به گوگل...
              </span>
            ) : (
              <>
                <img 
                  src="https://www.svgrepo.com/show/475656/google-color.svg" 
                  alt="Google logo" 
                  className="mr-2 h-4 w-4" 
                />
                ورود با گوگل
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
