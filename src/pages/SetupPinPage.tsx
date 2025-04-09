
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, ArrowLeft, Check, Delete } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const SetupPinPage = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [step, setStep] = useState<'create' | 'confirm'>('create');

  const handleDigit = (digit: string) => {
    if (step === 'create' && pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      
      if (newPin.length === 4) {
        setTimeout(() => {
          setStep('confirm');
        }, 300);
      }
    } else if (step === 'confirm' && confirmPin.length < 4) {
      const newConfirmPin = confirmPin + digit;
      setConfirmPin(newConfirmPin);
      
      if (newConfirmPin.length === 4) {
        setTimeout(() => {
          if (newConfirmPin === pin) {
            // PIN successfully set
            toast.success("PIN successfully set", {
              description: "Your new PIN has been configured",
              icon: <Check className="h-4 w-4" />,
            });
            navigate('/');
          } else {
            // PINs don't match
            toast.error("PINs don't match", {
              description: "Please try again",
            });
            setConfirmPin('');
          }
        }, 300);
      }
    }
  };

  const handleClear = () => {
    if (step === 'create') {
      setPin(pin.slice(0, -1));
    } else {
      setConfirmPin(confirmPin.slice(0, -1));
    }
  };

  const handleBack = () => {
    if (step === 'confirm') {
      setStep('create');
      setConfirmPin('');
    } else {
      navigate('/');
    }
  };

  const pinDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'delete'];

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4" 
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>

        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-fortress-900 dark:text-fortress-50">
            {step === 'create' ? 'Create PIN' : 'Confirm PIN'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {step === 'create' 
              ? 'Set a 4-digit PIN to secure your apps' 
              : 'Re-enter your PIN to confirm'}
          </p>
        </div>

        <Card className="security-card">
          <CardHeader className="text-center">
            <CardTitle>
              {step === 'create' ? 'Enter new PIN' : 'Confirm your PIN'}
            </CardTitle>
            <CardDescription>
              {step === 'create' 
                ? 'Choose a PIN that you can remember easily' 
                : 'Enter the same PIN again for verification'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="flex space-x-4">
                {[0, 1, 2, 3].map((i) => {
                  const filled = step === 'create' 
                    ? i < pin.length 
                    : i < confirmPin.length;
                  
                  return (
                    <div
                      key={i}
                      className={cn(
                        "w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl",
                        filled 
                          ? "bg-fortress-600 border-fortress-600 text-white" 
                          : "border-gray-300 dark:border-gray-600"
                      )}
                    >
                      {filled ? '•' : ''}
                    </div>
                  );
                })}
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
                      onClick={handleClear}
                      className="pin-button border-transparent"
                      disabled={(step === 'create' && pin.length === 0) || 
                               (step === 'confirm' && confirmPin.length === 0)}
                    >
                      <Delete className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </button>
                  );
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleDigit(digit.toString())}
                    className="pin-button border-fortress-200 dark:border-fortress-800"
                  >
                    {digit}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SetupPinPage;
