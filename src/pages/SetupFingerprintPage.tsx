
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, ArrowLeft, Check } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const SetupFingerprintPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [scansCompleted, setScansCompleted] = useState<number>(0);
  
  // Simulate fingerprint scanning
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setScansCompleted((prev) => prev + 1);
            return 100;
          }
          return newProgress;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isScanning]);
  
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setProgress(0);
        if (scansCompleted < 3) {
          setStep((prev) => prev + 1);
        } else {
          // Fingerprint setup completed
          toast.success("Fingerprint setup complete", {
            description: "Your fingerprint has been registered successfully",
            icon: <Check className="h-4 w-4" />,
          });
          navigate('/');
        }
      }, 500);
    }
  }, [progress, scansCompleted, navigate]);

  const handleStartScan = () => {
    setIsScanning(true);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>

        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-4">
            <Fingerprint className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-fortress-900 dark:text-fortress-50">
            Fingerprint Setup
          </h1>
          <p className="text-muted-foreground mt-1">
            Register your fingerprint for biometric access
          </p>
        </div>

        <Card className="security-card">
          <CardHeader>
            <CardTitle>Register Your Fingerprint</CardTitle>
            <CardDescription>
              {scansCompleted < 3 
                ? `Step ${step} of 3: Place your finger on the sensor` 
                : "Registration complete!"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6 pt-4">
            <div
              className={cn(
                "fingerprint-bg w-32 h-32",
                isScanning && "after:content-[''] after:absolute after:left-0 after:right-0 after:top-0 after:bottom-0 after:rounded-full after:border-2 after:border-fortress-400 after:animate-pulse-ring"
              )}
            >
              <Fingerprint className="w-full h-full text-fortress-500" />
              {isScanning && (
                <div className="scan-line animate-fingerprint-scan" />
              )}
            </div>
            
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{scansCompleted} of 3 scans completed</span>
              </div>
              <Progress value={scansCompleted * 33.33} className="h-2" />
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="font-medium">
                {isScanning 
                  ? "Scanning in progress..." 
                  : scansCompleted < 3 
                    ? "Ready to scan" 
                    : "Setup complete!"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isScanning 
                  ? "Keep your finger on the sensor" 
                  : scansCompleted < 3 
                    ? "Press the button below to start scanning" 
                    : "Your fingerprint has been successfully registered"}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            {scansCompleted < 3 ? (
              <Button 
                disabled={isScanning} 
                onClick={handleStartScan}
                className="w-full"
              >
                <Fingerprint className="mr-2 h-4 w-4" />
                {isScanning ? "Scanning..." : "Start Scan"}
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/')}
                className="w-full"
              >
                <Check className="mr-2 h-4 w-4" />
                Complete Setup
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default SetupFingerprintPage;
