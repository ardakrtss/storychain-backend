const { db, COLLECTIONS } = require('../firebase-config');

class FirebaseService {
  constructor() {
    this.db = db;
  }

  // Check if Firebase is available
  isAvailable() {
    return this.db !== null;
  }

  // User operations
  async createUser(userData) {
    if (!this.isAvailable()) return null;
    
    try {
      const userRef = await this.db.collection(COLLECTIONS.USERS).add({
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      return { id: userRef.id, ...userData };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUserById(userId) {
    if (!this.isAvailable()) return null;
    
    try {
      const userDoc = await this.db.collection(COLLECTIONS.USERS).doc(userId).get();
      if (userDoc.exists) {
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async getUserByNickname(nickname) {
    if (!this.isAvailable()) return null;
    
    try {
      const userQuery = await this.db.collection(COLLECTIONS.USERS)
        .where('nickname', '==', nickname)
        .limit(1)
        .get();
      
      if (!userQuery.empty) {
        const userDoc = userQuery.docs[0];
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting user by nickname:', error);
      throw error;
    }
  }

  // Story operations
  async createStory(storyData) {
    if (!this.isAvailable()) return null;
    
    try {
      const storyRef = await this.db.collection(COLLECTIONS.STORIES).add({
        ...storyData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isCompleted: false,
        likeCount: 0
      });
      
      return { id: storyRef.id, ...storyData };
    } catch (error) {
      console.error('Error creating story:', error);
      throw error;
    }
  }

  async getStoryById(storyId) {
    if (!this.isAvailable()) return null;
    
    try {
      const storyDoc = await this.db.collection(COLLECTIONS.STORIES).doc(storyId).get();
      if (storyDoc.exists) {
        return { id: storyDoc.id, ...storyDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting story:', error);
      throw error;
    }
  }

  async getAllStories() {
    if (!this.isAvailable()) return [];
    
    try {
      const storiesQuery = await this.db.collection(COLLECTIONS.STORIES)
        .orderBy('createdAt', 'desc')
        .get();
      
      return storiesQuery.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting all stories:', error);
      throw error;
    }
  }

  async getAvailableStories(excludeAuthorId) {
    if (!this.isAvailable()) return [];
    
    try {
      let storiesQuery = this.db.collection(COLLECTIONS.STORIES)
        .where('isCompleted', '==', false)
        .orderBy('createdAt', 'desc');
      
      const stories = await storiesQuery.get();
      
      return stories.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(story => {
          // Filter out stories where the user has already contributed
          if (excludeAuthorId) {
            return !story.segments || !story.segments.some(segment => segment.authorId === excludeAuthorId);
          }
          return true;
        });
    } catch (error) {
      console.error('Error getting available stories:', error);
      throw error;
    }
  }

  async updateStory(storyId, updateData) {
    if (!this.isAvailable()) return null;
    
    try {
      await this.db.collection(COLLECTIONS.STORIES).doc(storyId).update({
        ...updateData,
        updatedAt: new Date().toISOString()
      });
      
      return this.getStoryById(storyId);
    } catch (error) {
      console.error('Error updating story:', error);
      throw error;
    }
  }

  async deleteStory(storyId) {
    if (!this.isAvailable()) return false;
    
    try {
      await this.db.collection(COLLECTIONS.STORIES).doc(storyId).delete();
      return true;
    } catch (error) {
      console.error('Error deleting story:', error);
      throw error;
    }
  }

  // Segment operations
  async addSegmentToStory(storyId, segmentData) {
    if (!this.isAvailable()) return null;
    
    try {
      const storyRef = this.db.collection(COLLECTIONS.STORIES).doc(storyId);
      const storyDoc = await storyRef.get();
      
      if (!storyDoc.exists) {
        throw new Error('Story not found');
      }
      
      const story = storyDoc.data();
      const segments = story.segments || [];
      const newSegment = {
        id: `${storyId}-${segments.length + 1}`,
        ...segmentData,
        order: segments.length + 1,
        createdAt: new Date().toISOString()
      };
      
      segments.push(newSegment);
      
      const isCompleted = segments.length >= 5;
      
      await storyRef.update({
        segments,
        isCompleted,
        updatedAt: new Date().toISOString()
      });
      
      return { ...story, segments, isCompleted };
    } catch (error) {
      console.error('Error adding segment to story:', error);
      throw error;
    }
  }

  // Theme operations
  async getThemes() {
    if (!this.isAvailable()) return [];
    
    try {
      const themesQuery = await this.db.collection(COLLECTIONS.THEMES).get();
      return themesQuery.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting themes:', error);
      throw error;
    }
  }

  async getThemeById(themeId) {
    if (!this.isAvailable()) return null;
    
    try {
      const themeDoc = await this.db.collection(COLLECTIONS.THEMES).doc(themeId).get();
      if (themeDoc.exists) {
        return { id: themeDoc.id, ...themeDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting theme:', error);
      throw error;
    }
  }

  // Statistics
  async getStats() {
    if (!this.isAvailable()) return null;
    
    try {
      const storiesQuery = await this.db.collection(COLLECTIONS.STORIES).get();
      const usersQuery = await this.db.collection(COLLECTIONS.USERS).get();
      
      const stories = storiesQuery.docs.map(doc => doc.data());
      const users = usersQuery.docs.map(doc => doc.data());
      
      const totalStories = stories.length;
      const completedStories = stories.filter(s => s.isCompleted).length;
      const totalUsers = users.length;
      const totalSegments = stories.reduce((sum, story) => sum + (story.segments?.length || 0), 0);
      
      return {
        totalStories,
        completedStories,
        ongoingStories: totalStories - completedStories,
        totalUsers,
        totalSegments,
        averageSegmentsPerStory: totalStories > 0 ? (totalSegments / totalStories).toFixed(1) : 0
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      throw error;
    }
  }
}

module.exports = new FirebaseService();
