import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Collections
const COLLECTIONS = {
  USERS: 'users',
  STORIES: 'stories',
  THEMES: 'themes',
  SEGMENTS: 'segments'
} as const;

// Types
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
  content: string;
  authorId: string;
  authorNickname: string;
  segments?: StorySegment[];
  isCompleted: boolean;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface StorySegment {
  id: string;
  authorId: string;
  authorNickname: string;
  content: string;
  order: number;
  createdAt: string;
}

export interface User {
  id: string;
  nickname: string;
  email?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

// Theme operations
export const getThemes = async (): Promise<Theme[]> => {
  try {
    const themesRef = collection(db, COLLECTIONS.THEMES);
    const snapshot = await getDocs(themesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Theme));
  } catch (error) {
    console.error('Error getting themes:', error);
    throw error;
  }
};

export const getThemeById = async (themeId: string): Promise<Theme | null> => {
  try {
    const themeRef = doc(db, COLLECTIONS.THEMES, themeId);
    const themeDoc = await getDoc(themeRef);
    if (themeDoc.exists()) {
      return { id: themeDoc.id, ...themeDoc.data() } as Theme;
    }
    return null;
  } catch (error) {
    console.error('Error getting theme:', error);
    throw error;
  }
};

// Story operations
export const createStory = async (storyData: Omit<Story, 'id' | 'createdAt' | 'updatedAt' | 'isCompleted' | 'likeCount'>): Promise<Story> => {
  try {
    const storiesRef = collection(db, COLLECTIONS.STORIES);
    const docRef = await addDoc(storiesRef, {
      ...storyData,
      isCompleted: false,
      likeCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return {
      id: docRef.id,
      ...storyData,
      isCompleted: false,
      likeCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error creating story:', error);
    throw error;
  }
};

export const getStories = async (): Promise<Story[]> => {
  try {
    const storiesRef = collection(db, COLLECTIONS.STORIES);
    const q = query(storiesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Story));
  } catch (error) {
    console.error('Error getting stories:', error);
    throw error;
  }
};

export const getAvailableStories = async (excludeAuthorId?: string): Promise<Story[]> => {
  try {
    const storiesRef = collection(db, COLLECTIONS.STORIES);
    const q = query(
      storiesRef, 
      where('isCompleted', '==', false),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    let stories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Story));
    
    if (excludeAuthorId) {
      stories = stories.filter(story => {
        return !story.segments || !story.segments.some(segment => segment.authorId === excludeAuthorId);
      });
    }
    
    return stories;
  } catch (error) {
    console.error('Error getting available stories:', error);
    throw error;
  }
};

export const getStoryById = async (storyId: string): Promise<Story | null> => {
  try {
    const storyRef = doc(db, COLLECTIONS.STORIES, storyId);
    const storyDoc = await getDoc(storyRef);
    if (storyDoc.exists()) {
      return { id: storyDoc.id, ...storyDoc.data() } as Story;
    }
    return null;
  } catch (error) {
    console.error('Error getting story:', error);
    throw error;
  }
};

export const addSegmentToStory = async (storyId: string, segmentData: Omit<StorySegment, 'id' | 'order' | 'createdAt'>): Promise<Story> => {
  try {
    const storyRef = doc(db, COLLECTIONS.STORIES, storyId);
    const storyDoc = await getDoc(storyRef);
    
    if (!storyDoc.exists()) {
      throw new Error('Story not found');
    }
    
    const story = storyDoc.data() as Story;
    const segments = story.segments || [];
    const newSegment: StorySegment = {
      id: `${storyId}-${segments.length + 1}`,
      ...segmentData,
      order: segments.length + 1,
      createdAt: new Date().toISOString()
    };
    
    segments.push(newSegment);
    const isCompleted = segments.length >= 5;
    
    await updateDoc(storyRef, {
      segments,
      isCompleted,
      updatedAt: serverTimestamp()
    });
    
    return {
      ...story,
      segments,
      isCompleted
    };
  } catch (error) {
    console.error('Error adding segment to story:', error);
    throw error;
  }
};

// User operations
export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
  try {
    const usersRef = collection(db, COLLECTIONS.USERS);
    const docRef = await addDoc(usersRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return {
      id: docRef.id,
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUserByNickname = async (nickname: string): Promise<User | null> => {
  try {
    const usersRef = collection(db, COLLECTIONS.USERS);
    const q = query(usersRef, where('nickname', '==', nickname), limit(1));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() } as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user by nickname:', error);
    throw error;
  }
};
