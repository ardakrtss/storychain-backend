import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  where,
  doc,
  updateDoc,
  serverTimestamp,
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useNotifications } from './useNotifications';

export interface RealtimeStory {
  id: string;
  title: string;
  theme: string;
  content: string;
  authorNickname: string;
  createdAt: any;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  isCompleted: boolean;
  segments: number;
  lastUpdated: any;
}

export interface RealtimeUser {
  id: string;
  username: string;
  email: string;
  nickname: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'suspended' | 'banned';
  createdAt: any;
  lastLogin: any;
  storiesCount: number;
  commentsCount: number;
  likesCount: number;
}

export function useRealtimeUpdates() {
  const [stories, setStories] = useState<RealtimeStory[]>([]);
  const [users, setUsers] = useState<RealtimeUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useNotifications();

  // Listen to stories in real-time
  const listenToStories = useCallback(() => {
    const storiesQuery = query(
      collection(db, 'stories'),
      orderBy('lastUpdated', 'desc'),
      limit(50)
    );

    return onSnapshot(
      storiesQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const storiesData: RealtimeStory[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          storiesData.push({
            id: doc.id,
            title: data.title || '',
            theme: data.theme || '',
            content: data.content || '',
            authorNickname: data.authorNickname || '',
            createdAt: data.createdAt,
            likeCount: data.likeCount || 0,
            commentCount: data.commentCount || 0,
            viewCount: data.viewCount || 0,
            isCompleted: data.isCompleted || false,
            segments: data.segments || 0,
            lastUpdated: data.lastUpdated
          });
        });

        setStories(storiesData);
        setLoading(false);

        // Check for new stories and show notifications
        if (stories.length > 0 && storiesData.length > stories.length) {
          const newStories = storiesData.slice(0, storiesData.length - stories.length);
          newStories.forEach(story => {
            addNotification({
              type: 'info',
              title: 'Yeni Hikaye',
              message: `"${story.title}" hikayesi eklendi`,
              action: {
                label: 'Görüntüle',
                url: `/stories/${story.id}`
              }
            });
          });
        }
      },
      (err) => {
        console.error('Error listening to stories:', err);
        setError('Hikayeler yüklenirken hata oluştu');
        setLoading(false);
      }
    );
  }, [stories.length, addNotification]);

  // Listen to users in real-time
  const listenToUsers = useCallback(() => {
    const usersQuery = query(
      collection(db, 'users'),
      orderBy('lastLogin', 'desc'),
      limit(100)
    );

    return onSnapshot(
      usersQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const usersData: RealtimeUser[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          usersData.push({
            id: doc.id,
            username: data.username || '',
            email: data.email || '',
            nickname: data.nickname || '',
            role: data.role || 'user',
            status: data.status || 'active',
            createdAt: data.createdAt,
            lastLogin: data.lastLogin,
            storiesCount: data.storiesCount || 0,
            commentsCount: data.commentsCount || 0,
            likesCount: data.likesCount || 0
          });
        });

        setUsers(usersData);
      },
      (err) => {
        console.error('Error listening to users:', err);
        setError('Kullanıcılar yüklenirken hata oluştu');
      }
    );
  }, []);

  // Listen to specific story
  const listenToStory = useCallback((storyId: string, callback: (story: RealtimeStory | null) => void) => {
    const storyRef = doc(db, 'stories', storyId);
    
    return onSnapshot(
      storyRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const story: RealtimeStory = {
            id: doc.id,
            title: data.title || '',
            theme: data.theme || '',
            content: data.content || '',
            authorNickname: data.authorNickname || '',
            createdAt: data.createdAt,
            likeCount: data.likeCount || 0,
            commentCount: data.commentCount || 0,
            viewCount: data.viewCount || 0,
            isCompleted: data.isCompleted || false,
            segments: data.segments || 0,
            lastUpdated: data.lastUpdated
          };
          callback(story);
        } else {
          callback(null);
        }
      },
      (err) => {
        console.error('Error listening to story:', err);
        callback(null);
      }
    );
  }, []);

  // Update story in real-time
  const updateStory = useCallback(async (storyId: string, updates: Partial<RealtimeStory>) => {
    try {
      const storyRef = doc(db, 'stories', storyId);
      await updateDoc(storyRef, {
        ...updates,
        lastUpdated: serverTimestamp()
      });

      addNotification({
        type: 'success',
        title: 'Güncelleme Başarılı',
        message: 'Hikaye başarıyla güncellendi'
      });
    } catch (err) {
      console.error('Error updating story:', err);
      addNotification({
        type: 'error',
        title: 'Güncelleme Hatası',
        message: 'Hikaye güncellenirken hata oluştu'
      });
    }
  }, [addNotification]);

  // Listen to story likes in real-time
  const listenToStoryLikes = useCallback((storyId: string, callback: (likes: number) => void) => {
    const storyRef = doc(db, 'stories', storyId);
    
    return onSnapshot(
      storyRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          callback(data.likeCount || 0);
        }
      },
      (err) => {
        console.error('Error listening to story likes:', err);
      }
    );
  }, []);

  // Listen to story comments in real-time
  const listenToStoryComments = useCallback((storyId: string, callback: (comments: any[]) => void) => {
    const commentsQuery = query(
      collection(db, 'stories', storyId, 'comments'),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(
      commentsQuery,
      (snapshot) => {
        const comments: any[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          comments.push({
            id: doc.id,
            content: data.content,
            authorNickname: data.authorNickname,
            createdAt: data.createdAt,
            ...data
          });
        });
        callback(comments);
      },
      (err) => {
        console.error('Error listening to story comments:', err);
      }
    );
  }, []);

  // Initialize real-time listeners
  useEffect(() => {
    const unsubscribeStories = listenToStories();
    const unsubscribeUsers = listenToUsers();

    return () => {
      unsubscribeStories();
      unsubscribeUsers();
    };
  }, [listenToStories, listenToUsers]);

  return {
    stories,
    users,
    loading,
    error,
    listenToStory,
    listenToStoryLikes,
    listenToStoryComments,
    updateStory
  };
}
