
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        toast({
          title: "ورود موفقیت‌آمیز",
          description: "به لیفت لجندز خوش آمدید!",
        });
        navigate("/home");
      } else {
        toast({
          title: "خطا در ورود",
          description: "لطفاً تمام فیلدها را پر کنید",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      if (name && email && password) {
        toast({
          title: "ثبت‌نام موفقیت‌آمیز",
          description: "اطلاعات شما با موفقیت ثبت شد",
        });
        navigate("/profile-form");
      } else {
        toast({
          title: "خطا در ثبت‌نام",
          description: "لطفاً تمام فیلدها را پر کنید",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setGLoading(true);
    
    // Show a helpful toast with improved error handling
    toast({
      title: "در حال اتصال به گوگل",
      description: "لطفا صبر کنید...",
    });
    
    // Simulate Google OAuth process with better error handling
    try {
      // In a real app, this would use Google's OAuth API
      setTimeout(() => {
        setGLoading(false);
        toast({
          title: "ورود با گوگل موفقیت‌آمیز",
          description: "به لیفت لجندز خوش آمدید!",
        });
        // Assuming this is a new user that needs to complete their profile
        navigate("/profile-form");
      }, 1500);
    } catch (error) {
      setGLoading(false);
      toast({
        title: "خطا در ورود با گوگل",
        description: "لطفاً دوباره تلاش کنید",
        variant: "destructive",
      });
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
      
      <Card className="w-full max-w-md">
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
                  {isLoading ? "در حال ورود..." : "ورود"}
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
                  {isLoading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
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
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
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
