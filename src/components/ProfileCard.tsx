import { InstagramProfile } from '@/types/instagram';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, Image, ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileCardProps {
  profile: InstagramProfile;
  onBack: () => void;
}

export const ProfileCard = ({ profile, onBack }: ProfileCardProps) => {
  const formatNumber = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // Safety check for profile data
  if (!profile) {
    return (
      <Card className="p-8 text-center">
        <div className="text-muted-foreground">
          <div className="text-6xl mb-4">⏳</div>
          <h3 className="text-lg font-medium mb-2">Loading profile...</h3>
          <p className="text-sm">Please wait while we fetch the profile data.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden shadow-large">
      <div className="bg-gradient-instagram p-1">
        <div className="bg-card rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="outline" 
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Users
              </Button>
              <Badge variant="secondary" className="flex items-center gap-1">
                <User className="h-3 w-3" />
                Instagram Profile
              </Badge>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="p-1 bg-gradient-instagram rounded-full">
                  {profile.profile_pic_url ? (
                    <img
                      src={profile.profile_pic_url}
                      alt={`${profile.username}'s profile`}
                      className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover border-4 border-background"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=faces`;
                      }}
                    />
                  ) : (
                    <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-muted border-4 border-background flex items-center justify-center">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {profile.full_name || profile.username}
                  </h1>
                  <p className="text-lg text-primary font-medium">@{profile.username}</p>
                  {profile.bio && (
                    <p className="text-muted-foreground mt-2 max-w-md break-words">
                      {profile.bio}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-6">
                  <div className="flex items-center gap-2 text-center md:text-left">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {formatNumber(profile.followers)}
                      </div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-center md:text-left">
                    <div className="p-2 bg-accent/50 rounded-lg">
                      <UserPlus className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {formatNumber(profile.following)}
                      </div>
                      <div className="text-sm text-muted-foreground">Following</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-center md:text-left">
                    <div className="p-2 bg-secondary/50 rounded-lg">
                      <Image className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {formatNumber(profile.posts_count)}
                      </div>
                      <div className="text-sm text-muted-foreground">Posts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};