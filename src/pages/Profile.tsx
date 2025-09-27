import { ProfileSummary } from "@/components/dashboard/ProfileSummary";

const Profile = () => {
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <ProfileSummary />
    </div>
  );
};

export default Profile;
