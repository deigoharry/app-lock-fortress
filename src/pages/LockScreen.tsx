
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole, Fingerprint, X, Delete, Shield } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const LockScreen = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [authType, setAuthType] = useState<string>('pin');

  // Mock PIN for demo (in a real app, this would be securely stored)
  const mockPin = '1234';
  const mockPassword = 'password123';

  const handlePinDigit = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      
      if (newPin.length === 4) {
        setTimeout(() => {
          if (newPin === mockPin) {
            toast.success("Authentication successful", {
              description: "PIN verified correctly",
            });
            navigate('/apps');
          } else {
            toast.error("Authentication failed", {
              description: "Incorrect PIN, please try again",
            });
            setPin('');
          }
        }, 300);
      }
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === mockPassword) {
      toast.success("Authentication successful", {
        description: "Password verified correctly",
      });
      navigate('/apps');
    } else {
      toast.error("Authentication failed", {
        description: "Incorrect password, please try again",
      });
      setPassword('');
    }
  };

  const handleFingerprintAuth = () => {
    setIsScanning(true);
    
    // Simulate fingerprint scanning
    setTimeout(() => {
      setIsScanning(false);
      toast.success("Authentication successful", {
        description: "Fingerprint verified",
        icon: <Fingerprint className="h-4 w-4" />,
      });
      navigate('/apps');
    }, 2000);
  };

  const handleClearPin = () => {
    setPin(pin.slice(0, -1));
  };

  const pinDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'delete'];

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-4">
            <LockKeyhole className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-fortress-900 dark:text-fortress-50">
            App Lock Authentication
          </h1>
          <p className="text-muted-foreground mt-1">
            Verify your identity to continue
          </p>
        </div>

        <Card className="security-card">
          <CardContent className="pt-6">
            <Tabs defaultValue="pin" value={authType} onValueChange={setAuthType}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="pin">PIN</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="fingerprint">Fingerprint</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pin" className="space-y-4">
                <div className="flex justify-center mb-2">
                  <div className="flex space-x-3">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-4 h-4 rounded-full border-2",
                          i < pin.length 
                            ? "bg-fortress-600 border-fortress-600" 
                            : "border-gray-300 dark:border-gray-600"
                        )}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-2">
                  {pinDigits.map((digit, index) => {
                    if (digit === '') {
                      return <div key={index} />;
                    }
                    
                    if (digit === 'delete') {
                      return (
                        <button
                          key={index}
                          onClick={handleClearPin}
                          className="pin-button border-transparent"
                          disabled={pin.length === 0}
                        >
                          <Delete className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </button>
                      );
                    }
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handlePinDigit(digit.toString())}
                        className="pin-button border-fortress-200 dark:border-fortress-800"
                      >
                        {digit}
                      </button>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="password">
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Enter Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="border-fortress-200 dark:border-fortress-800"
                    />
                  </div>
                  <Button type="submit" className="w-full">Verify Password</Button>
                </form>
              </TabsContent>
              
              <TabsContent value="fingerprint">
                <div className="flex flex-col items-center space-y-6 py-6">
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
                  
                  <div className="text-center space-y-2">
                    <h3 className="font-medium text-lg">Fingerprint Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      {isScanning 
                        ? "Scanning... Please keep your finger on the sensor" 
                        : "Tap below to authenticate with your fingerprint"}
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleFingerprintAuth} 
                    disabled={isScanning}
                    className="w-full"
                  >
                    <Fingerprint className="mr-2 h-4 w-4" />
                    {isScanning ? "Scanning..." : "Scan Fingerprint"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LockScreen;
