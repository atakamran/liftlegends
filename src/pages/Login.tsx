
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user has completed profile
      const profileRef = doc(db, "user_profiles", user.uid);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        // Create a new profile document if it doesn't exist
        await setDoc(profileRef, {
          name: user.displayName || "",
          email: user.email || "",
          createdAt: new Date().toISOString(),
        });
        navigate("/profile-form");
      } else {
        navigate("/home");
      }
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/user-not-found") {
          toast({
            title: "ایمیل یافت نشد",
            description: "این ایمیل در سیستم وجود ندارد. لطفاً ثبت‌نام کنید.",
            variant: "destructive",
          });
        } else if (error.code === "permission-denied") {
          toast({
            title: "دسترسی محدود شده",
            description: "شما مجاز به ورود به این حساب کاربری نیستید.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "خطا در ورود",
            description: error.message || "مشکلی در ورود به حساب کاربری رخ داد.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "خطا در ورود",
          description: error.message || "مشکلی در ورود به حساب کاربری رخ داد.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

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

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user has completed profile
      const profileRef = doc(db, "user_profiles", user.uid);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        // Create a new profile document if it doesn't exist
        await setDoc(profileRef, {
          name: user.displayName || "",
          email: user.email || "",
          createdAt: new Date().toISOString(),
        });
        navigate("/profile-form");
      } else {
        navigate("/home");
      }
    } catch (error: any) {
      if (error instanceof FirebaseError && error.code === "permission-denied") {
        toast({
          title: "دسترسی محدود شده",
          description: "شما مجاز به ورود به این حساب کاربری نیستید.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "خطا در ورود با گوگل",
          description: error.message || "مشکلی در ورود با گوگل رخ داد.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goToNewRegistrationFlow = () => {
    navigate("/register");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100/50 to-transparent pointer-events-none"></div>
      <Card className="w-full max-w-md glass-container bg-white/70 backdrop-blur-md border-gray-200 shadow-lg">
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
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">ورود</TabsTrigger>
              <TabsTrigger value="signup">ثبت نام</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل یا شماره تلفن</Label>
                  <Input
                    id="email"
                    type="text"
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
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                ورود با گوگل
              </Button>
            </TabsContent>
            <TabsContent value="signup">
              <div className="space-y-4">
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 transition-colors"
                  onClick={goToNewRegistrationFlow}
                >
                  شروع ثبت‌نام با شماره موبایل
                </Button>
                
                <div className="relative flex py-5 items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-400">یا</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">نام</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">ایمیل یا شماره تلفن</Label>
                    <Input
                      id="email"
                      type="text"
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
                    {isLoading ? "در حال پردازش..." : "ثبت نام"}
                  </Button>
                </form>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  ثبت نام با گوگل
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
