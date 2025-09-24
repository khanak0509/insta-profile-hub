export interface InstagramUser {
  id: string;
  username: string;
  fullName: string;
  followers: number;
}

export interface InstagramProfile {
  username: string;
  full_name: string;
  profile_pic_url: string;
  followers: number;
  following: number;
  posts_count: number;
  bio?: string;
}

export interface InstagramPost {
  media_type: 'image' | 'video';
  media_url: string;
  caption: string;
  likes: number;
  comments: number;
  ai_description?: string;
}

// Backend response format
export interface InstagramProfileResponse {
  username: string;
  full_name: string;
  followers: number;
  following: number;
  posts_count: number;
  bio?: string;
  profile_pic_url: string;
  posts: InstagramPost[];
  error?: string; // For error handling
}

// Frontend-formatted data for easier consumption
export interface FormattedInstagramProfile {
  profile: InstagramProfile;
  posts: InstagramPost[];
}