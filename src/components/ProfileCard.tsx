import { InstagramProfile } from '@/types/instagram';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, Image, Shield, ArrowLeft } from 'lucide-react';
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
              {profile.isVerified && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="p-1 bg-gradient-instagram rounded-full">
                  <img
                    src={profile.profilePicture}
                    alt={`${profile.username}'s profile`}
                    className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover border-4 border-background"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {profile.fullName}
                  </h1>
                  <p className="text-lg text-primary font-medium">@{profile.username}</p>
                  {profile.biography && (
                    <p className="text-muted-foreground mt-2 max-w-md">
                      {profile.biography}
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
                        {formatNumber(profile?.following)}
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
                        {formatNumber(profile?.posts)}
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