import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { migrateLocalStorageToSupabase, getLocalStorageUser } from '@/services/migrationService';

interface MigrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const MigrationDialog: React.FC<MigrationDialogProps> = ({ open, onOpenChange, onSuccess }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Try to get email from localStorage
  const localUser = getLocalStorageUser();
  
  // If we have an email in localStorage, use it
  React.useEffect(() => {
    if (localUser?.email) {
      setEmail(localUser.email);
    }
  }, []);
  
  const handleMigration = async () => {
    // Validate inputs
    if (!email || !email.includes('@')) {
      toast({
        title: 'ایمیل نامعتبر',
        description: 'لطفاً یک ایمیل معتبر وارد کنید.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!password || password.length < 6) {
      toast({
        title: 'رمز عبور نامعتبر',
        description: 'رمز عبور باید حداقل ۶ کاراکتر باشد.',
        variant: 'destructive',
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: 'عدم تطابق رمز عبور',
        description: 'رمز عبور و تکرار آن باید یکسان باشند.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await migrateLocalStorageToSupabase(email, password);
      
      if (result.success) {
        toast({
          title: 'انتقال موفق',
          description: 'اطلاعات شما با موفقیت به سرور منتقل شد.',
        });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({
          title: 'خطا در انتقال اطلاعات',
          description: result.error || 'مشکلی در انتقال اطلاعات پیش آمد.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Migration error:', error);
      toast({
        title: 'خطا در انتقال اطلاعات',
        description: 'مشکلی در انتقال اطلاعات پیش آمد.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>انتقال اطلاعات به سرور</DialogTitle>
          <DialogDescription>
            برای استفاده از امکانات جدید، اطلاعات شما باید به سرور منتقل شود. لطفاً اطلاعات زیر را تکمیل کنید.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right col-span-4">
              ایمیل
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              className="col-span-4"
              disabled={isLoading || !!localUser?.email}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right col-span-4">
              رمز عبور جدید
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-4"
              disabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirmPassword" className="text-right col-span-4">
              تکرار رمز عبور
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="col-span-4"
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleMigration} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                در حال انتقال...
              </>
            ) : (
              'انتقال اطلاعات'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MigrationDialog;