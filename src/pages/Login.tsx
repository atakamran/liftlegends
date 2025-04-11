import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/firebaseConfig";

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
        navigate("/profile-form");
      } else {
        navigate("/home");
      }
    } catch (error: any) {
      toast({
        title: "خطا در ورود با گوگل",
        description: error.message || "مشکلی در ورود با گوگل رخ داد.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/70 to-transparent pointer-events-none"></div>
      <Card className="w-full max-w-md glass-container bg-white/80 backdrop-blur-md border-gray-300">
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
        </CardContent>
        <CardFooter className="flex flex-col">
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
