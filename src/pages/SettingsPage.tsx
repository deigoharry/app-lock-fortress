
import React from 'react';
import { Settings, Shield, Bell, Clock, Lock, AlertTriangle, ChevronRight, Fingerprint } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const SettingsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
            <Settings className="h-5 w-5" />
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Configure your security preferences</p>
        </div>

        <Card className="security-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-fortress-600" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Configure authentication and security options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SettingItem
              icon={<Lock className="h-5 w-5 text-fortress-600" />}
              title="Change PIN"
              description="Update your security PIN"
              action={<ChevronRight className="h-5 w-5 text-gray-400" />}
              onClick={() => toast.info("Feature coming soon", { description: "This feature will be available in a future update" })}
            />
            
            <SettingItem
              icon={<Lock className="h-5 w-5 text-fortress-600" />}
              title="Change Password"
              description="Update your security password"
              action={<ChevronRight className="h-5 w-5 text-gray-400" />}
              onClick={() => toast.info("Feature coming soon", { description: "This feature will be available in a future update" })}
            />
            
            <SettingItem
              icon={<Fingerprint className="h-5 w-5 text-fortress-600" />}
              title="Fingerprint Authentication"
              description="Use biometric security to unlock apps"
              action={<Switch defaultChecked />}
            />
            
            <Separator />
            
            <SettingItem
              icon={<Bell className="h-5 w-5 text-fortress-600" />}
              title="Security Notifications"
              description="Get alerts for security events"
              action={<Switch defaultChecked />}
            />
            
            <SettingItem
              icon={<Clock className="h-5 w-5 text-fortress-600" />}
              title="Auto-Lock Timeout"
              description="Lock apps after period of inactivity"
              action={<span className="text-sm font-medium">5 minutes</span>}
              onClick={() => toast.info("Feature coming soon", { description: "This feature will be available in a future update" })}
            />
            
            <SettingItem
              icon={<AlertTriangle className="h-5 w-5 text-fortress-600" />}
              title="Intruder Detection"
              description="Take photo when wrong PIN is entered"
              action={<Switch />}
            />
          </CardContent>
        </Card>

        <Card className="security-card">
          <CardHeader>
            <CardTitle>About App Lock Fortress</CardTitle>
            <CardDescription>
              Application information and resources
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm">
              <div className="flex justify-between py-1">
                <span className="text-gray-500 dark:text-gray-400">Version</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500 dark:text-gray-400">Build</span>
                <span>2023.04.09</span>
              </div>
            </div>
            
            <div className="pt-2 space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => toast.info("Privacy Policy")}
              >
                Privacy Policy
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => toast.info("Terms of Service")}
              >
                Terms of Service
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={() => toast.info("Reset coming soon", { description: "This feature will be available in a future update" })}
              >
                Reset All Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
  onClick?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ 
  icon, 
  title, 
  description, 
  action,
  onClick 
}) => (
  <div 
    className="flex items-center justify-between py-2 cursor-pointer hover:bg-fortress-50 dark:hover:bg-fortress-900/20 -mx-4 px-4 rounded-md transition-colors"
    onClick={onClick}
  >
    <div className="flex items-start gap-3">
      {icon}
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
    <div>
      {action}
    </div>
  </div>
);

export default SettingsPage;
