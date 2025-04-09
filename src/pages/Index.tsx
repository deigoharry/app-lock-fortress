
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Fingerprint, KeyRound, LockKeyhole, ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AndroidPermissionExplainer from '@/components/AndroidPermissionExplainer';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center space-y-3 mb-8">
          <div className="mx-auto w-20 h-20 rounded-full gradient-bg flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-fortress-900 dark:text-fortress-50">App Lock Fortress</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Secure your apps with PIN, password, or fingerprint authentication
          </p>
        </div>

        <AndroidPermissionExplainer />

        <Card className="security-card">
          <CardHeader>
            <CardTitle>Authentication Methods</CardTitle>
            <CardDescription>Choose how you want to secure your apps</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AuthMethod
              icon={<KeyRound className="w-8 h-8 text-fortress-600" />}
              title="PIN"
              description="Set up a secure PIN code"
              to="/setup/pin"
            />
            <AuthMethod
              icon={<LockKeyhole className="w-8 h-8 text-fortress-600" />}
              title="Password"
              description="Create a strong password"
              to="/setup/password"
            />
            <AuthMethod
              icon={<Fingerprint className="w-8 h-8 text-fortress-600" />}
              title="Fingerprint"
              description="Use biometric security"
              to="/setup/fingerprint"
            />
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/apps">
                <span>Go to App List</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="security-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-fortress-600" /> 
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <StatusItem label="PIN Setup" status="Pending" />
                <StatusItem label="Password Setup" status="Pending" />
                <StatusItem label="Fingerprint Setup" status="Pending" />
                <StatusItem label="Apps Protected" status="0" />
              </div>
            </CardContent>
          </Card>

          <Card className="security-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-fortress-600" /> 
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/apps">
                    <LockKeyhole className="mr-2 h-4 w-4" />
                    Lock All Apps
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/settings">
                    <Shield className="mr-2 h-4 w-4" />
                    Security Settings
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

interface AuthMethodProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}

const AuthMethod: React.FC<AuthMethodProps> = ({ icon, title, description, to }) => (
  <Link to={to} className="block">
    <div className="border border-fortress-100 dark:border-fortress-800 rounded-lg p-4 transition-all hover:bg-fortress-50 dark:hover:bg-fortress-900/50 hover:shadow">
      <div className="flex flex-col items-center text-center">
        <div className="mb-3">{icon}</div>
        <h3 className="font-medium text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  </Link>
);

interface StatusItemProps {
  label: string;
  status: string;
}

const StatusItem: React.FC<StatusItemProps> = ({ label, status }) => (
  <div className="flex justify-between items-center py-1 border-b border-fortress-100 dark:border-fortress-800 last:border-0">
    <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
    <span className="text-sm font-medium text-fortress-600 dark:text-fortress-400">{status}</span>
  </div>
);

export default Index;
