
import React, { useState } from 'react';
import { Lock, Unlock, Search, Shield, AlertTriangle, AppWindow, Info } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

// Mock app data
const mockApps = [
  { id: 1, name: 'Facebook', icon: '📱', locked: false, packageName: 'com.facebook.katana' },
  { id: 2, name: 'WhatsApp', icon: '💬', locked: true, packageName: 'com.whatsapp' },
  { id: 3, name: 'Instagram', icon: '📷', locked: false, packageName: 'com.instagram.android' },
  { id: 4, name: 'Gmail', icon: '✉️', locked: true, packageName: 'com.google.android.gm' },
  { id: 5, name: 'YouTube', icon: '▶️', locked: false, packageName: 'com.google.android.youtube' },
  { id: 6, name: 'TikTok', icon: '🎵', locked: false, packageName: 'com.zhiliaoapp.musically' },
  { id: 7, name: 'Twitter', icon: '🐦', locked: false, packageName: 'com.twitter.android' },
  { id: 8, name: 'Snapchat', icon: '👻', locked: false, packageName: 'com.snapchat.android' },
  { id: 9, name: 'Netflix', icon: '🎬', locked: false, packageName: 'com.netflix.mediaclient' },
  { id: 10, name: 'Spotify', icon: '🎧', locked: false, packageName: 'com.spotify.music' },
  { id: 11, name: 'Amazon', icon: '🛒', locked: false, packageName: 'com.amazon.mShop.android.shopping' },
  { id: 12, name: 'Banking App', icon: '💰', locked: true, packageName: 'com.example.banking' },
  { id: 13, name: 'Photos', icon: '🖼️', locked: false, packageName: 'com.google.android.apps.photos' },
  { id: 14, name: 'Calendar', icon: '📅', locked: false, packageName: 'com.google.android.calendar' },
  { id: 15, name: 'Notes', icon: '📝', locked: false, packageName: 'com.example.notes' },
];

const AppsPage = () => {
  const [apps, setApps] = useState(mockApps);
  const [search, setSearch] = useState('');
  const [showWarning, setShowWarning] = useState(true);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [showPermissionInfo, setShowPermissionInfo] = useState(false);

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleLock = (id: number) => {
    if (!permissionsGranted) {
      setShowPermissionInfo(true);
      return;
    }

    setApps(apps.map(app => 
      app.id === id ? { ...app, locked: !app.locked } : app
    ));
    
    const app = apps.find(app => app.id === id);
    if (app) {
      toast(app.locked ? "App unlocked" : "App locked", {
        description: `${app.name} is now ${app.locked ? 'unlocked' : 'locked'}`,
        icon: app.locked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />,
      });
    }
  };

  const requestPermissions = () => {
    toast.promise(
      new Promise((resolve) => {
        // Simulate permission request
        setTimeout(() => {
          setPermissionsGranted(true);
          resolve(true);
        }, 2000);
      }),
      {
        loading: 'Requesting permissions...',
        success: 'Permissions granted!',
        error: 'Failed to get permissions',
      }
    );
    setShowPermissionInfo(false);
  };

  const scanForInstalledApps = () => {
    toast.promise(
      new Promise((resolve) => {
        // Simulate scanning for apps
        setTimeout(() => {
          resolve(true);
        }, 2000);
      }),
      {
        loading: 'Scanning for installed apps...',
        success: 'Found all installed apps',
        error: 'Failed to scan apps',
      }
    );
  };

  const lockedAppsCount = apps.filter(app => app.locked).length;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">App Protection</h1>
          <p className="text-gray-600 dark:text-gray-400">Lock apps to keep them secure</p>
        </div>

        {!permissionsGranted && (
          <Card className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-amber-800 dark:text-amber-300">Permissions Required</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mb-3">
                    App Lock Fortress needs usage access, accessibility services, and display over other apps permissions to function properly.
                  </p>
                  <Button 
                    onClick={requestPermissions}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Grant Permissions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {showWarning && permissionsGranted && (
          <Card className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-amber-800 dark:text-amber-300">Demo Mode</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    This is a simulation. Actual app locking requires system permissions on Android devices.
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowWarning(false)}
                  className="text-amber-700 hover:text-amber-800 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-800/50"
                >
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center rounded-md border border-input px-3 focus-within:ring-1 focus-within:ring-ring">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <Input 
            type="search" 
            placeholder="Search apps..." 
            className="border-0 focus-visible:ring-0 px-0 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AppWindow className="h-5 w-5 text-fortress-600" />
            Installed Apps
          </h2>
          <Button variant="outline" onClick={scanForInstalledApps}>
            Scan for Apps
          </Button>
        </div>

        <Card className="security-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-fortress-600" /> 
                Apps ({apps.length})
              </span>
              <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                {lockedAppsCount} locked
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-1 p-1">
                {filteredApps.length > 0 ? (
                  filteredApps.map((app) => (
                    <div 
                      key={app.id} 
                      className="flex items-center justify-between p-3 rounded-md hover:bg-secondary"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-md bg-fortress-100 dark:bg-fortress-900">
                          <span className="text-xl">{app.icon}</span>
                        </div>
                        <div>
                          <span className="font-medium">{app.name}</span>
                          <p className="text-xs text-gray-500">{app.packageName}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {app.locked ? (
                          <Lock className="h-4 w-4 text-fortress-600 mr-2" />
                        ) : (
                          <Unlock className="h-4 w-4 text-gray-400 mr-2" />
                        )}
                        <Switch
                          checked={app.locked}
                          onCheckedChange={() => handleToggleLock(app.id)}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No apps found matching "{search}"
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          <Button 
            className="w-full max-w-xs"
            variant={lockedAppsCount > 0 ? "outline" : "default"}
            disabled={!permissionsGranted}
            onClick={() => {
              const allLocked = apps.every(app => app.locked);
              setApps(apps.map(app => ({ ...app, locked: !allLocked })));
              
              toast(allLocked ? "All apps unlocked" : "All apps locked", {
                icon: allLocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />,
              });
            }}
          >
            {apps.every(app => app.locked) ? (
              <>
                <Unlock className="mr-2 h-4 w-4" /> Unlock All Apps
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" /> Lock All Apps
              </>
            )}
          </Button>
        </div>

        <Dialog open={showPermissionInfo} onOpenChange={setShowPermissionInfo}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>App Permissions Required</DialogTitle>
              <DialogDescription>
                To lock other applications, App Lock Fortress needs the following permissions:
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h3 className="font-medium">Accessibility Service</h3>
                <p className="text-sm text-muted-foreground">Required to detect when other apps are launched and show the lock screen.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Usage Access</h3>
                <p className="text-sm text-muted-foreground">Allows App Lock Fortress to see which apps you're using.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Display Over Other Apps</h3>
                <p className="text-sm text-muted-foreground">Needed to show the lock screen over other applications.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Device Admin (Optional)</h3>
                <p className="text-sm text-muted-foreground">Provides additional security and prevents app uninstallation.</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setShowPermissionInfo(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={requestPermissions}>
                Grant Permissions
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AppsPage;
