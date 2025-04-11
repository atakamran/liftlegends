
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload } from "lucide-react";
import { exportSupabaseToFirebase } from "@/services/migrationService";
import { useToast } from "@/hooks/use-toast";

const DataMigrationTool: React.FC = () => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileSelected(e.target.files[0]);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const result = await exportSupabaseToFirebase();
      
      if (result.success) {
        toast({
          title: "صادرات انجام شد",
          description: result.message,
        });
      } else {
        toast({
          title: "خطا در صادرات داده",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "خطا در صادرات داده",
        description: "عملیات با خطا مواجه شد. جزئیات در کنسول موجود است.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ابزار مهاجرت داده</CardTitle>
        <CardDescription>
          داده‌های خود را از Supabase به Firebase انتقال دهید
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">صادرات داده</h3>
          <p className="text-sm text-muted-foreground mb-2">
            داده‌های خود را به صورت فایل JSON دریافت کنید تا بتوانید آن را در Firebase وارد کنید.
          </p>
          <Button 
            onClick={handleExport} 
            disabled={isExporting} 
            variant="outline" 
            className="w-full"
          >
            <Download className="ml-2 h-4 w-4" />
            {isExporting ? "در حال صادرات..." : "صادرات داده‌ها"}
          </Button>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">راهنمای واردسازی به Firebase</h3>
          <div className="bg-muted p-4 rounded-md text-xs">
            <p className="mb-2">برای وارد کردن داده به Firebase:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>فایل JSON صادر شده را دانلود کنید</li>
              <li>یک پروژه Firebase ایجاد کنید</li>
              <li>از SDK Firebase برای واردسازی داده استفاده کنید</li>
              <li>کد نمونه در بخش <code>services/migrationService.ts</code> موجود است</li>
            </ol>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          توجه: برای انتقال کامل داده‌ها به Firebase، نیاز به تنظیم Firebase SDK و انجام تنظیمات اضافی است.
        </p>
      </CardFooter>
    </Card>
  );
};

export default DataMigrationTool;
