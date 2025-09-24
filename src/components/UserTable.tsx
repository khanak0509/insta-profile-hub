import { InstagramUser } from '@/types/instagram';
import { Card } from '@/components/ui/card';
import { Users, TrendingUp } from 'lucide-react';

interface UserTableProps {
  users: InstagramUser[];
  onUserClick: (username: string) => void;
  loading: boolean;
}

export const UserTable = ({ users, onUserClick, loading }: UserTableProps) => {
  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-3 border-b border-border last:border-0">
              <div className="h-4 bg-muted rounded w-8"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-4 bg-muted rounded w-32"></div>
              <div className="h-4 bg-muted rounded w-16"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden shadow-medium">
      <div className="bg-gradient-subtle p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-background rounded-lg shadow-soft">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Instagram Users</h2>
            <p className="text-sm text-muted-foreground">{users.length} users available</p>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left p-4 font-medium text-muted-foreground text-sm">#</th>
              <th className="text-left p-4 font-medium text-muted-foreground text-sm">Username</th>
              <th className="text-left p-4 font-medium text-muted-foreground text-sm">Full Name</th>
              <th className="text-left p-4 font-medium text-muted-foreground text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Followers
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                onClick={() => onUserClick(user.username)}
                className="border-b border-border last:border-0 hover:bg-gradient-subtle/30 cursor-pointer transition-all duration-200 hover:shadow-soft"
              >
                <td className="p-4 text-muted-foreground font-mono text-sm">
                  {String(index + 1).padStart(2, '0')}
                </td>
                <td className="p-4">
                  <span className="font-medium text-primary hover:text-primary/80 transition-colors">
                    @{user.username}
                  </span>
                </td>
                <td className="p-4 text-foreground">{user.fullName}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {formatFollowers(user.followers)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};