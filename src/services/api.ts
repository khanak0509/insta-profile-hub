import axios from 'axios';
import { InstagramUser, InstagramProfileResponse } from '@/types/instagram';

// Mock data for demonstration - replace with your actual API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Mock data for demonstration purposes
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
    // Replace this with actual API call when backend is ready
    // const response = await api.get('/api/instagram/users');
    // return response.data;
    
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockUsers;
  } catch (error) {
    console.error('Error fetching Instagram users:', error);
    throw new Error('Failed to fetch Instagram users');
  }
};

export const getInstagramProfile = async (username: string): Promise<InstagramProfileResponse> => {
  try {
    // Replace this with actual API call to your backend
    const response = await api.get(`/api/instagram/${username}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching profile for ${username}:`, error);
    
    // Mock response for demonstration - remove when backend is ready
    const mockProfile: InstagramProfileResponse = {
      profile: {
        username,
        fullName: mockUsers.find(u => u.username === username)?.fullName || 'Unknown User',
        profilePicture: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=faces`,
        followers: mockUsers.find(u => u.username === username)?.followers || 0,
        following: Math.floor(Math.random() * 1000) + 100,
        posts: Math.floor(Math.random() * 500) + 50,
        biography: `Official account of ${mockUsers.find(u => u.username === username)?.fullName}`,
        isVerified: true,
      },
      posts: Array.from({ length: 12 }, (_, i) => ({
        id: `${username}_post_${i}`,
        imageUrl: `https://images.unsplash.com/photo-${1500000000000 + i}?w=400&h=400&fit=crop`,
        caption: `Amazing moment captured! #${username} #instagram #life ${i + 1}`,
        likes: Math.floor(Math.random() * 100000) + 1000,
        comments: Math.floor(Math.random() * 5000) + 100,
        timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      })),
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return mockProfile;
  }
};