import { InstagramPost } from '@/types/instagram';
import { Card } from '@/components/ui/card';
import { Heart, MessageCircle, Calendar } from 'lucide-react';

interface PostsGridProps {
  posts: InstagramPost[];
}

export const PostsGrid = ({ posts }: PostsGridProps) => {
  const formatNumber = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (posts.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-muted-foreground">
          <div className="text-6xl mb-4">📷</div>
          <h3 className="text-lg font-medium mb-2">No posts available</h3>
          <p className="text-sm">This user hasn't shared any posts yet.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Recent Posts</h2>
        <div className="text-sm text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden group hover:shadow-medium transition-all duration-300">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={post.imageUrl}
                alt="Instagram post"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{formatNumber(post.likes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{formatNumber(post.comments)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.timestamp)}</span>
                </div>
              </div>
              
              {post.caption && (
                <p className="text-sm text-foreground line-clamp-3 leading-relaxed">
                  {post.caption}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};