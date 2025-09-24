import { useState, useEffect } from 'react';
import { InstagramUser, InstagramProfileResponse } from '@/types/instagram';
import { getInstagramUsers, getInstagramProfile } from '@/services/api';
import { UserTable } from '@/components/UserTable';
import { ProfileCard } from '@/components/ProfileCard';
import { PostsGrid } from '@/components/PostsGrid';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [users, setUsers] = useState<InstagramUser[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<InstagramProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await getInstagramUsers();
      setUsers(usersData);
    } catch (err) {
      setError('Failed to load Instagram users. Please try again.');
      toast({
        title: "Error",
        description: "Failed to load Instagram users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (username: string) => {
    try {
      setProfileLoading(true);
      setError(null);
      const profileData = await getInstagramProfile(username);
      setSelectedProfile(profileData);
      toast({
        title: "Profile loaded",
        description: `Successfully loaded @${username}'s profile`,
      });
    } catch (err) {
      setError(`Failed to load profile for @${username}. Please try again.`);
      toast({
        title: "Error",
        description: `Failed to load @${username}'s profile`,
        variant: "destructive",
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleBackToUsers = () => {
    setSelectedProfile(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-instagram rounded-full">
              <Instagram className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-instagram bg-clip-text text-transparent">
              Instagram Explorer
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover and explore Instagram profiles with detailed analytics and post insights
          </p>
        </div>

        {/* Error State */}
        {error && !profileLoading && (
          <div className="mb-6">
            <ErrorMessage 
              message={error} 
              onRetry={selectedProfile ? () => handleUserClick(selectedProfile.profile.username) : loadUsers} 
            />
          </div>
        )}

        {/* Main Content */}
        {!selectedProfile ? (
          <UserTable 
            users={users} 
            onUserClick={handleUserClick} 
            loading={loading} 
          />
        ) : (
          <div className="space-y-8">
            {profileLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <ProfileCard 
                  profile={selectedProfile.profile} 
                  onBack={handleBackToUsers} 
                />
                <PostsGrid posts={selectedProfile.posts} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
