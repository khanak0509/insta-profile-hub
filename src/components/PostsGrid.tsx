import { InstagramPost } from '@/types/instagram';
import { Card } from '@/components/ui/card';
import { Heart, MessageCircle, Play, Image as ImageIcon, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

  // Safety check for posts data
  if (!posts || !Array.isArray(posts)) {
    return (
      <Card className="p-8 text-center">
        <div className="text-muted-foreground">
          <div className="text-6xl mb-4">⏳</div>
          <h3 className="text-lg font-medium mb-2">Loading posts...</h3>
          <p className="text-sm">Please wait while we fetch the posts data.</p>
        </div>
      </Card>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-muted-foreground">
          <div className="text-6xl mb-4">📷</div>
          <h3 className="text-lg font-medium mb-2">No posts available</h3>
          <p className="text-sm">This user hasn't shared any posts yet or posts couldn't be loaded.</p>
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
        {posts.map((post, index) => (
          <Card key={`post-${index}`} className="overflow-hidden group hover:shadow-medium transition-all duration-300">
            <div className="relative aspect-square overflow-hidden bg-muted">
              {post.media_url ? (
                post.media_type === 'video' ? (
                  <div className="relative w-full h-full">
                    <video
                      src={post.media_url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      muted
                      loop
                      onMouseEnter={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.currentTime = 0;
                        video.play().catch(() => {
                          // Ignore play errors
                        });
                      }}
                      onMouseLeave={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.pause();
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                        <Play className="h-3 w-3" />
                        Video
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={post.media_url}
                      alt="Instagram post"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback for broken images
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y5ZmFmYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY5NzM4MyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                        <ImageIcon className="h-3 w-3" />
                        Photo
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Media not available</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{formatNumber(post.likes || 0)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                    <span>{formatNumber(post.comments || 0)}</span>
                  </div>
                </div>
                {post.ai_description && (
                  <div className="flex items-center gap-1" title={post.ai_description}>
                    <Eye className="h-4 w-4" />
                    <span className="text-xs">AI</span>
                  </div>
                )}
              </div>
              
              {post.caption && (
                <p className="text-sm text-foreground line-clamp-3 leading-relaxed">
                  {post.caption}
                </p>
              )}
              
              {post.ai_description && (
                <p className="text-xs text-muted-foreground italic border-t pt-2">
                  AI Description: {post.ai_description}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};