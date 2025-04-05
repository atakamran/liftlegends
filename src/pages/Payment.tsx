
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "پرداخت موفقیت‌آمیز",
        description: "اشتراک شما با موفقیت فعال شد.",
      });
      navigate("/");
    }, 1500);
  };

  const paymentOptions = [
    { 
      id: "monthly", 
      title: "اشتراک یک ماهه", 
      price: "۲۹,۰۰۰", 
      description: "دسترسی کامل برای مدت یک ماه", 
      popular: false 
    },
    { 
      id: "quarterly", 
      title: "اشتراک سه ماهه", 
      price: "۷۹,۰۰۰", 
      description: "دسترسی کامل برای مدت سه ماه (۱۰٪ تخفیف)", 
      popular: true 
    },
    { 
      id: "yearly", 
      title: "اشتراک سالانه", 
      price: "۲۷۹,۰۰۰", 
      description: "دسترسی کامل برای مدت یک سال (۲۰٪ تخفیف)", 
      popular: false 
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState("quarterly");
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">انتخاب اشتراک</h1>
        
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {paymentOptions.map(option => (
            <Card 
              key={option.id}
              className={`cursor-pointer transition-all ${selectedPlan === option.id ? 'ring-2 ring-primary' : ''} ${option.popular ? 'relative' : ''}`}
              onClick={() => setSelectedPlan(option.id)}
            >
              {option.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded-bl-lg rounded-tr-md">
                  پیشنهاد ویژه
                </div>
              )}
              
              <CardHeader className="pb-2">
                <CardTitle>{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{option.price} <span className="text-sm font-normal text-muted-foreground">تومان</span></div>
              </CardContent>
              <CardFooter>
                {selectedPlan === option.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات پرداخت</CardTitle>
            <CardDescription>اطلاعات کارت خود را وارد کنید</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">شماره کارت</Label>
                <Input id="cardNumber" placeholder="---- ---- ---- ----" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">تاریخ انقضا</Label>
                  <Input id="expiryDate" placeholder="ماه / سال" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardHolder">نام صاحب کارت</Label>
                <Input id="cardHolder" required />
              </div>
              
              <Button type="submit" className="w-full" disabled={isProcessing}>
                <CreditCard className="ml-2 h-4 w-4" />
                {isProcessing ? "در حال پردازش..." : `پرداخت ${paymentOptions.find(p => p.id === selectedPlan)?.price} تومان`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
