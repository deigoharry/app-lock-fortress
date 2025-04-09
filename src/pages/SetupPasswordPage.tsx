import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LockKeyhole, Check, Eye, EyeOff } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const SetupPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      toast.error("Password too short", {
        description: "Password must be at least 6 characters",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please ensure both passwords are identical",
      });
      return;
    }
    
    // Success
    toast.success("Password successfully set", {
      description: "Your new password has been configured",
      icon: <Check className="h-4 w-4" />,
    });
    navigate('/');
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
            <LockKeyhole className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-fortress-900 dark:text-fortress-50">
            Create Password
          </h1>
          <p className="text-muted-foreground mt-1">
            Set a strong password to secure your apps
          </p>
        </div>

        <Card className="security-card">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Set your password</CardTitle>
              <CardDescription>
                Choose a strong password that's easy for you to remember but hard for others to guess
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Password strength:</h3>
                <div className="space-y-1">
                  <PasswordRequirement
                    text="At least 6 characters"
                    fulfilled={password.length >= 6}
                  />
                  <PasswordRequirement
                    text="Contains a number"
                    fulfilled={/\d/.test(password)}
                  />
                  <PasswordRequirement
                    text="Passwords match"
                    fulfilled={
                      password === confirmPassword && 
                      password.length > 0 && 
                      confirmPassword.length > 0
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Set Password
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

interface PasswordRequirementProps {
  text: string;
  fulfilled: boolean;
}

const PasswordRequirement: React.FC<PasswordRequirementProps> = ({ text, fulfilled }) => (
  <div className="flex items-center">
    <div className={cn(
      "w-4 h-4 rounded-full mr-2 flex items-center justify-center",
      fulfilled ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"
    )}>
      {fulfilled && <Check className="w-3 h-3 text-white" />}
    </div>
    <span className={cn(
      "text-sm",
      fulfilled ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
    )}>
      {text}
    </span>
  </div>
);

export default SetupPasswordPage;
