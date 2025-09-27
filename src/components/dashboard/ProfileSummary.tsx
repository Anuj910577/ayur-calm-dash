import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";

export function ProfileSummary() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    inAppNotifications: true,
    emailNotifications: true,
  });

  const { profile, updateProfile, updatePreferences } = useProfile();
  const { toast } = useToast();

  React.useEffect(() => {
    setFormData({
      name: profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      inAppNotifications: profile.preferences.notifications || true,
      emailNotifications: profile.preferences.notifications || true,
    });
  }, [profile]);

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in name and email.",
        variant: "destructive"
      });
      return;
    }

    updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });
    updatePreferences({
      ...profile.preferences,
      inAppNotifications: formData.inAppNotifications,
      emailNotifications: formData.emailNotifications,
    });

    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
  };

  return (
    <Card className="shadow-soft">
      <CardContent className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal details and notification settings.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Anuj Tiwari"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="anujtiwari105@gmail.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="939797988"
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="inApp" className="text-sm">In-App Notifications</Label>
              <Switch
                id="inApp"
                checked={formData.inAppNotifications}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inAppNotifications: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotif" className="text-sm">Email Notifications</Label>
              <Switch
                id="emailNotif"
                checked={formData.emailNotifications}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, emailNotifications: checked }))}
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}
