
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Google } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

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
        // Simulate checking if user is registered - in a real app, this would be a server check
        const isRegistered = localStorage.getItem(email) !== null;
        if (isRegistered) {
          navigate("/home");
        } else {
          navigate("/profile-form");
        }
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
      if (email && password && name) {
        // Save user info to localStorage for demo purposes
        localStorage.setItem(email, JSON.stringify({ email, name, isRegistered: true }));
        
        toast({
          title: "ثبت‌نام موفقیت‌آمیز",
          description: "اکنون می‌توانید پروفایل خود را تکمیل کنید",
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

  const handleGoogleAuth = () => {
    setIsLoading(true);
    
    // Simulate Google authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "ورود با گوگل",
        description: "ورود با گوگل با موفقیت انجام شد",
      });
      
      // For demo purposes, randomly decide if user is new or existing
      const isExistingUser = Math.random() > 0.5;
      if (isExistingUser) {
        navigate("/home");
      } else {
        navigate("/profile-form");
      }
    }, 1000);
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
          <CardTitle>به لیفت لجندز خوش آمدید</CardTitle>
          <CardDescription>برای استفاده از تمام امکانات برنامه وارد شوید</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">ورود</TabsTrigger>
              <TabsTrigger value="register">ثبت‌نام</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">ایمیل</Label>
                  <Input 
                    id="email-login" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">رمز عبور</Label>
                  <Input 
                    id="password-login" 
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
                  <Label htmlFor="name">نام</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="نام و نام خانوادگی"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register">ایمیل</Label>
                  <Input 
                    id="email-register" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register">رمز عبور</Label>
                  <Input 
                    id="password-register" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "در حال ثبت نام..." : "ثبت نام"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">یا</span>
            </div>
          </div>

          <Button 
            type="button" 
            variant="outline" 
            className="w-full" 
            onClick={handleGoogleAuth}
            disabled={isLoading}
          >
            <Google className="ml-2 h-4 w-4" />
            ورود با گوگل
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
