import axios from 'axios';
import { InstagramUser, InstagramProfileResponse, FormattedInstagramProfile } from '@/types/instagram';

// API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increase timeout for scraping operations
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for user list (since backend only has individual profile endpoint)
const mockUsers: InstagramUser[] = [
  { id: '1', username: 'cristiano', fullName: 'Cristiano Ronaldo', followers: 543000000 },
  { id: '2', username: 'kyliejenner', fullName: 'Kylie Jenner', followers: 398000000 },
  { id: '3', username: 'leomessi', fullName: 'Leo Messi', followers: 486000000 },
  { id: '4', username: 'selenagomez', fullName: 'Selena Gomez', followers: 427000000 },
  { id: '5', username: 'therock', fullName: 'Dwayne Johnson', followers: 392000000 },
  { id: '6', username: 'arianagrande', fullName: 'Ariana Grande', followers: 378000000 },
  { id: '7', username: 'kimkardashian', fullName: 'Kim Kardashian', followers: 364000000 },
  { id: '8', username: 'beyonce', fullName: 'Beyoncé', followers: 319000000 },
];

export const getInstagramUsers = async (): Promise<InstagramUser[]> => {
  try {
    // For now, return mock users since backend doesn't have a users list endpoint
    // You can extend the backend to include a popular users endpoint later
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers;
  } catch (error) {
    console.error('Error fetching Instagram users:', error);
    throw new Error('Failed to fetch Instagram users');
  }
};

export const getInstagramProfile = async (username: string): Promise<FormattedInstagramProfile> => {
  try {
    console.log(`Fetching profile for ${username} from ${API_BASE_URL}/instagram`);
    
    const response = await api.post('/instagram', { username });
    console.log(`Response for ${username}:`, response.data);
    const data: InstagramProfileResponse = response.data;
    
    if (!data || data.error) {
      throw new Error(data.error || 'Failed to fetch profile data');
    }

    // Format the response to match frontend expectations
    const formattedProfile: FormattedInstagramProfile = {
      profile: {
        username: data.username,
        full_name: data.full_name,
        profile_pic_url: data.profile_pic_url,
        followers: data.followers,
        following: data.following,
        posts_count: data.posts_count,
        bio: data.bio,
      },
      posts: data.posts,
    };

    return formattedProfile;
  } catch (error) {
    console.error(`Error fetching profile for ${username}:`, error);
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') {
        throw new Error('Backend server is not running. Please start the FastAPI server on port 8000.');
      }
      if (error.response?.status === 404) {
        throw new Error(`User @${username} not found or profile is private.`);
      }
      if (error.response?.status >= 500) {
        throw new Error('Instagram server error. Please try again later.');
      }
    }
    
    throw new Error(`Failed to fetch profile for @${username}. Please try again.`);
  }
};