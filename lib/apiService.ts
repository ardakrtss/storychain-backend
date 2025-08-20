const API_BASE_URL = 'https://api.storychain.com.tr';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Auth endpoints
  async login(nickname: string, password: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ nickname, password }),
    });
  }

  async register(nickname: string, password: string) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nickname, password }),
    });
  }

  // Theme endpoints
  async getThemes() {
    return this.request('/api/themes');
  }

  // Story endpoints
  async createStory(storyData: {
    title: string;
    theme: string;
    content: string;
    authorId: string;
    authorNickname: string;
  }) {
    return this.request('/api/stories', {
      method: 'POST',
      body: JSON.stringify(storyData),
    });
  }

  async getStories() {
    return this.request('/api/stories');
  }

  async getAvailableStories(excludeAuthorId?: string) {
    const params = excludeAuthorId ? `?excludeAuthorId=${excludeAuthorId}` : '';
    return this.request(`/api/stories/available${params}`);
  }

  async getStoryById(storyId: string) {
    return this.request(`/api/stories/${storyId}`);
  }

  async continueStory(storyId: string, segmentData: {
    content: string;
    authorId: string;
    authorNickname: string;
  }) {
    return this.request(`/api/stories/${storyId}/continue`, {
      method: 'POST',
      body: JSON.stringify(segmentData),
    });
  }

  // Admin endpoints
  async getAdminStats(token: string) {
    return this.request('/api/admin/stats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getAdminStories(token: string) {
    return this.request('/api/admin/stories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getAdminUsers(token: string) {
    return this.request('/api/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteStory(storyId: string, token: string) {
    return this.request(`/api/admin/stories/${storyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health');
  }
}

export const apiService = new ApiService();
export default apiService;
