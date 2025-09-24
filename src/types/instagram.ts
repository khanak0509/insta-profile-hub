export interface InstagramUser {
  id: string;
  username: string;
  fullName: string;
  followers: number;
}

export interface InstagramProfile {
  username: string;
  fullName: string;
  profilePicture: string;
  followers: number;
  following: number;
  posts: number;
  biography?: string;
  isVerified?: boolean;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export interface InstagramProfileResponse {
  profile: InstagramProfile;
  posts: InstagramPost[];
}