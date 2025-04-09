
import React, { useState } from 'react';
import { Shield, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { requiredPermissions, requestAllPermissions, startAppLockingService } from '@/services/AndroidPermissions';
import { toast } from 'sonner';

const AndroidPermissionExplainer = () => {
  const [permissionsRequested, setPermissionsRequested] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [serviceStarted, setServiceStarted] = useState(false);

  const handleRequestPermissions = async () => {
    setPermissionsRequested(true);
    const granted = await requestAllPermissions();
    setPermissionsGranted(granted);
  };

  const handleStartService = () => {
    startAppLockingService();
    setServiceStarted(true);
    toast.success("Service started", {
      description: "App Lock Fortress is now monitoring your apps"
    });
  };

  return (
    <Card className="security-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-fortress-600" /> 
          Android Permission Setup
        </CardTitle>
        <CardDescription>
          Required permissions for app locking on Android
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          On a real Android device, App Lock Fortress needs special permissions to monitor and protect your apps. 
          This is a simulation of how that would work.
        </p>
        
        <div className="space-y-3">
          {requiredPermissions.map((permission, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-md bg-secondary/50">
              {permissionsGranted ? (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="font-medium">{permission.name}</h3>
                <p className="text-sm text-muted-foreground">{permission.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-fortress-100 dark:bg-fortress-900 flex items-center justify-center text-sm font-medium">1</span>
              <span>Request Permissions</span>
            </div>
            <Button 
              variant={permissionsRequested ? "outline" : "default"} 
              onClick={handleRequestPermissions}
              disabled={permissionsGranted}
            >
              {permissionsGranted ? "Permissions Granted" : "Request Permissions"}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-fortress-100 dark:bg-fortress-900 flex items-center justify-center text-sm font-medium">2</span>
              <span>Start App Protection Service</span>
            </div>
            <Button 
              variant={serviceStarted ? "outline" : "default"}
              onClick={handleStartService}
              disabled={!permissionsGranted || serviceStarted}
            >
              {serviceStarted ? "Service Running" : "Start Service"}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-fortress-100 dark:bg-fortress-900 flex items-center justify-center text-sm font-medium">3</span>
              <span>Lock Apps</span>
            </div>
            <Button 
              variant="outline"
              disabled={!serviceStarted}
              asChild
            >
              <a href="/apps">
                Go to App List <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start border-t pt-4">
        <p className="text-sm text-amber-600 dark:text-amber-400">
          <AlertCircle className="inline-block h-4 w-4 mr-1" />
          Note: In a real Android app, these permissions would need to be granted manually through Android Settings.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AndroidPermissionExplainer;
