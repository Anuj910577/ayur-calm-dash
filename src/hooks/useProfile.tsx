import * as React from "react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  preferences: {
    therapyTypes: string[];
    notifications: boolean;
    inAppNotifications: boolean;
    emailNotifications: boolean;
    language: string;
  };
}

const defaultProfile: UserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "",
  bio: "Ayurvedic wellness enthusiast focused on holistic healing and balance.",
  avatar: "",
  preferences: {
    therapyTypes: ["nasya", "abhyanga"],
    notifications: true,
    inAppNotifications: true,
    emailNotifications: true,
    language: "en"
  }
};

export const useProfile = () => {
  const [profile, setProfile] = React.useState<UserProfile>(defaultProfile);

  React.useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const updatePreferences = (preferences: Partial<UserProfile['preferences']>) => {
    setProfile(prev => ({
      ...prev,
      preferences: { ...prev.preferences, ...preferences }
    }));
  };

  return {
    profile,
    updateProfile,
    updatePreferences
  };
};
