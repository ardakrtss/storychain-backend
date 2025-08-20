const API_BASE_URL = 'https://storychain-api.onrender.com';

export interface Theme {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  characters: string;
  plotHints: string;
}

export interface Story {
  id: string;
  title: string;
  theme: string;
  segments: StorySegment[];
  isCompleted: boolean;
  likeCount: number;
  createdAt: string;
}

export interface StorySegment {
  id: string;
  author: string;
  authorId?: string;
  content: string;
  order: number;
  createdAt: string;
}

export interface User {
  id: string;
  nickname: string;
  role: 'user' | 'admin';
  stories_written?: number;
  total_likes?: number;
}

export interface LoginResponse {
  token: string;
  user: User;
  message?: string;
}

export interface CreateStoryRequest {
  title: string;
  theme: string;
  content: string;
  authorId: string;
  authorNickname: string;
}

export interface ContinueStoryRequest {
  content: string;
  authorId: string;
  authorNickname: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request<{ status: string; message: string }>('/api/health');
  }

  // Authentication
  async login(nickname: string, password?: string): Promise<LoginResponse> {
    return this.request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ nickname, password }),
    });
  }

  // Themes
  async getThemes(): Promise<{ themes: Theme[] }> {
    return this.request<{ themes: Theme[] }>('/api/themes');
  }

  async getTheme(id: string): Promise<Theme> {
    return this.request<Theme>(`/api/themes/${id}`);
  }

  // Stories
  async getAvailableStories(authorId?: string): Promise<Story[]> {
    const params = authorId ? `?authorId=${authorId}` : '';
    return this.request<Story[]>(`/api/stories/available${params}`);
  }

  async getRandomStory(authorId?: string): Promise<{
    story: {
      id: string;
      title: string;
      theme: string;
      lastSegment: StorySegment;
      currentAuthorNumber: number;
      totalAuthors: number;
    };
  }> {
    const params = authorId ? `?authorId=${authorId}` : '';
    return this.request(`/api/stories/random${params}`);
  }

  async createStory(data: CreateStoryRequest): Promise<{
    message: string;
    story: Story;
  }> {
    return this.request('/api/stories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async continueStory(storyId: string, data: ContinueStoryRequest): Promise<{
    message: string;
    story: Story;
    isCompleted: boolean;
  }> {
    return this.request(`/api/stories/${storyId}/continue`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Admin endpoints
  async getAdminStories(): Promise<{
    stories: (Story & { segmentCount: number; lastActivity: string })[];
  }> {
    return this.request('/api/admin/stories');
  }

  async getAdminUsers(): Promise<{
    users: (User & { storyCount: number })[];
  }> {
    return this.request('/api/admin/users');
  }

  async getAdminStats(): Promise<{
    stats: {
      totalStories: number;
      completedStories: number;
      ongoingStories: number;
      totalUsers: number;
      totalSegments: number;
      averageSegmentsPerStory: string;
    };
  }> {
    return this.request('/api/admin/stats');
  }

  async deleteStory(storyId: string): Promise<{
    message: string;
    deletedStory: Story;
  }> {
    return this.request(`/api/admin/stories/${storyId}`, {
      method: 'DELETE',
    });
  }

  async approveStory(storyId: string): Promise<{
    message: string;
    story: Story;
  }> {
    return this.request(`/api/admin/stories/${storyId}/approve`, {
      method: 'PUT',
    });
  }
}

export const apiService = new ApiService();
export default apiService;
