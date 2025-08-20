const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const { moderateContent, moderateTitle } = require('./contentModeration');
require('dotenv').config();

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Firebase Admin SDK initialization
const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID || "storychain-app",
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL
};

// Initialize Firebase Admin
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase Admin SDK initialized successfully');
} catch (error) {
  console.log('Firebase Admin SDK initialization failed, using mock data');
  console.log('Error:', error.message);
}

const db = admin.firestore();

// Admin users (hardcoded for now)
const adminUsers = [
  {
    id: 'admin1',
    nickname: 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'StoryChain API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    database: 'Firebase Firestore'
  });
});

// Get themes
app.get('/api/themes', async (req, res) => {
  try {
    const themesSnapshot = await db.collection('themes').get();
    const themes = [];
    
    themesSnapshot.forEach(doc => {
      themes.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // If no themes in database, return default themes
    if (themes.length === 0) {
      const defaultThemes = [
        {
          id: 'fantastik',
          name: 'Fantastik',
          description: 'Büyülü dünyalar ve fantastik yaratıklar',
          icon: '🏰',
          color: '#8B5CF6',
          characters: 'Periler, büyücüler, ejderhalar',
          plotHints: 'Büyülü bir dünyada geçen macera'
        },
        {
          id: 'gizem',
          name: 'Gizem',
          description: 'Esrarengiz olaylar ve çözülecek sırlar',
          icon: '🔍',
          color: '#EF4444',
          characters: 'Dedektifler, şüpheliler, gizli ajanlar',
          plotHints: 'Çözülmesi gereken bir gizem'
        },
        {
          id: 'bilim-kurgu',
          name: 'Bilim Kurgu',
          description: 'Gelecek teknolojileri ve uzay maceraları',
          icon: '🚀',
          color: '#3B82F6',
          characters: 'Astronotlar, robotlar, uzaylılar',
          plotHints: 'Gelecekte geçen teknolojik macera'
        },
        {
          id: 'macera',
          name: 'Macera',
          description: 'Heyecan dolu yolculuklar ve keşifler',
          icon: '🗺️',
          color: '#10B981',
          characters: 'Kaşifler, hazine avcıları, maceracılar',
          plotHints: 'Tehlikeli ve heyecanlı bir yolculuk'
        },
        {
          id: 'sifir-atik',
          name: 'Sıfır Atık',
          description: 'Çevre dostu hikayeler ve geri dönüşüm',
          icon: '♻️',
          color: '#059669',
          characters: 'Çevreciler, geri dönüşüm uzmanları',
          plotHints: 'Çevreyi koruma ve geri dönüşüm hikayesi'
        },
        {
          id: 'iklim-degisikligi',
          name: 'İklim Değişikliği',
          description: 'Dünyamızı koruma hikayeleri',
          icon: '🌍',
          color: '#06B6D4',
          characters: 'İklim aktivistleri, bilim insanları',
          plotHints: 'İklim değişikliğiyle mücadele hikayesi'
        }
      ];

      // Save default themes to database
      for (const theme of defaultThemes) {
        await db.collection('themes').doc(theme.id).set(theme);
      }

      res.json({ themes: defaultThemes });
    } else {
      res.json({ themes });
    }
  } catch (error) {
    console.error('Error fetching themes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single theme
app.get('/api/themes/:id', async (req, res) => {
  try {
    const themeId = req.params.id;
    const themeDoc = await db.collection('themes').doc(themeId).get();
    
    if (!themeDoc.exists) {
      return res.status(404).json({ message: 'Tema bulunamadı' });
    }
    
    res.json({ theme: { id: themeDoc.id, ...themeDoc.data() } });
  } catch (error) {
    console.error('Error fetching theme:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { nickname, password } = req.body;

    // Admin login check
    if (password) {
      const adminUser = adminUsers.find(u => u.nickname === nickname && u.password === password);
      if (adminUser) {
        const token = jwt.sign(
          { userId: adminUser.id, nickname: adminUser.nickname, role: 'admin' },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '24h' }
        );

        return res.json({
          message: 'Admin girişi başarılı!',
          token,
          user: {
            id: adminUser.id,
            nickname: adminUser.nickname,
            role: 'admin'
          }
        });
      }
    }

    // Regular user login
    if (!nickname || nickname.trim().length < 2) {
      return res.status(400).json({ message: 'Rumuz en az 2 karakter olmalıdır' });
    }

    // Find or create user in Firebase
    const usersRef = db.collection('users');
    const userQuery = await usersRef.where('nickname', '==', nickname.trim()).get();
    
    let user;
    if (userQuery.empty) {
      // Create new user
      const newUser = {
        nickname: nickname.trim(),
        stories_written: 0,
        total_likes: 0,
        created_at: new Date().toISOString(),
        last_active: new Date().toISOString()
      };
      
      const userDoc = await usersRef.add(newUser);
      user = {
        id: userDoc.id,
        ...newUser
      };
    } else {
      // Existing user
      const userDoc = userQuery.docs[0];
      user = {
        id: userDoc.id,
        ...userDoc.data()
      };
      
      // Update last active
      await userDoc.ref.update({
        last_active: new Date().toISOString()
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, nickname: user.nickname, role: 'user' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        nickname: user.nickname,
        role: 'user',
        stories_written: user.stories_written,
        total_likes: user.total_likes
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
app.get('/api/auth/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token gerekli' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    const userDoc = await db.collection('users').doc(decoded.userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    const userData = userDoc.data();
    res.json({
      id: userDoc.id,
      nickname: userData.nickname,
      role: 'user',
      stories_written: userData.stories_written,
      total_likes: userData.total_likes
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all stories
app.get('/api/stories', async (req, res) => {
  try {
    const storiesSnapshot = await db.collection('stories').orderBy('created_at', 'desc').get();
    const stories = [];
    
    storiesSnapshot.forEach(doc => {
      stories.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json({ stories });
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single story
app.get('/api/stories/:id', async (req, res) => {
  try {
    const storyId = req.params.id;
    const storyDoc = await db.collection('stories').doc(storyId).get();
    
    if (!storyDoc.exists) {
      return res.status(404).json({ message: 'Hikaye bulunamadı' });
    }
    
    res.json({ story: { id: storyDoc.id, ...storyDoc.data() } });
  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get random story for continuation
app.get('/api/stories/random', async (req, res) => {
  try {
    const { authorId } = req.query;
    
    // Get stories that are not completed and user hasn't contributed to
    const storiesSnapshot = await db.collection('stories')
      .where('is_completed', '==', false)
      .get();
    
    const availableStories = [];
    storiesSnapshot.forEach(doc => {
      const story = doc.data();
      const hasContributed = story.segments && story.segments.some(segment => segment.author_id === authorId);
      
      if (!hasContributed) {
        availableStories.push({
          id: doc.id,
          ...story
        });
      }
    });
    
    if (availableStories.length === 0) {
      return res.status(404).json({ message: 'Devam edilecek hikaye bulunamadı' });
    }
    
    const randomStory = availableStories[Math.floor(Math.random() * availableStories.length)];
    const lastSegment = randomStory.segments[randomStory.segments.length - 1];
    
    res.json({
      story: {
        ...randomStory,
        lastSegment,
        currentAuthorNumber: randomStory.segments.length + 1
      }
    });
  } catch (error) {
    console.error('Error fetching random story:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new story
app.post('/api/stories', async (req, res) => {
  try {
    const { title, theme, content, authorId, authorNickname } = req.body;
    
    // Validate required fields
    if (!title || !theme || !content || !authorId || !authorNickname) {
      return res.status(400).json({ message: 'Tüm alanlar gereklidir' });
    }
    
    // Content moderation for title
    const titleModeration = moderateTitle(title);
    if (!titleModeration.isAppropriate) {
      return res.status(400).json({ message: titleModeration.reason });
    }
    
    // Content moderation for content
    const contentModeration = moderateContent(content);
    if (!contentModeration.isAppropriate) {
      return res.status(400).json({ message: contentModeration.reason });
    }
    
    if (content.trim().length < 50) {
      return res.status(400).json({ message: 'Hikaye içeriği en az 50 karakter olmalıdır' });
    }
    
    const newStory = {
      title: title.trim(),
      theme: theme,
      is_completed: false,
      like_count: 0,
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
      segments: [
        {
          id: '1',
          author_id: authorId,
          author_nickname: authorNickname,
          content: content.trim(),
          order: 1,
          created_at: new Date().toISOString()
        }
      ]
    };
    
    const storyDoc = await db.collection('stories').add(newStory);
    
    // Update user stats
    const userRef = db.collection('users').doc(authorId);
    await userRef.update({
      stories_written: admin.firestore.FieldValue.increment(1),
      last_active: new Date().toISOString()
    });
    
    res.status(201).json({
      message: 'Hikaye başarıyla oluşturuldu! Diğer yazarların katkılarını bekleyin.',
      story: { id: storyDoc.id, ...newStory }
    });
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Continue existing story
app.post('/api/stories/:id/continue', async (req, res) => {
  try {
    const { content, authorId, authorNickname } = req.body;
    const storyId = req.params.id;
    
    // Validate required fields
    if (!content || !authorId || !authorNickname) {
      return res.status(400).json({ message: 'Tüm alanlar gereklidir' });
    }
    
    // Content moderation for content
    const contentModeration = moderateContent(content);
    if (!contentModeration.isAppropriate) {
      return res.status(400).json({ message: contentModeration.reason });
    }
    
    if (content.trim().length < 50) {
      return res.status(400).json({ message: 'Hikaye içeriği en az 50 karakter olmalıdır' });
    }
    
    const storyRef = db.collection('stories').doc(storyId);
    const storyDoc = await storyRef.get();
    
    if (!storyDoc.exists) {
      return res.status(404).json({ message: 'Hikaye bulunamadı' });
    }
    
    const story = storyDoc.data();
    
    if (story.is_completed) {
      return res.status(400).json({ message: 'Bu hikaye zaten tamamlanmış' });
    }
    
    // Check if user already contributed to this story
    const hasContributed = story.segments && story.segments.some(segment => segment.author_id === authorId);
    if (hasContributed) {
      return res.status(400).json({ message: 'Bu hikayeye zaten katkıda bulundunuz' });
    }
    
    const newSegment = {
      id: (story.segments ? story.segments.length + 1 : 1).toString(),
      author_id: authorId,
      author_nickname: authorNickname,
      content: content.trim(),
      order: story.segments ? story.segments.length + 1 : 1,
      created_at: new Date().toISOString()
    };
    
    const updatedSegments = [...(story.segments || []), newSegment];
    const isCompleted = updatedSegments.length >= 5;
    
    await storyRef.update({
      segments: updatedSegments,
      is_completed: isCompleted,
      last_updated: new Date().toISOString()
    });
    
    // Update user stats
    const userRef = db.collection('users').doc(authorId);
    await userRef.update({
      stories_written: admin.firestore.FieldValue.increment(1),
      last_active: new Date().toISOString()
    });
    
    res.json({
      message: isCompleted 
        ? 'Hikaye başarıyla tamamlandı! Tebrikler!' 
        : 'Hikaye başarıyla devam ettirildi!',
      story: { id: storyId, ...story, segments: updatedSegments, is_completed },
      isCompleted
    });
  } catch (error) {
    console.error('Continue story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin endpoints
app.get('/api/admin/stories', async (req, res) => {
  try {
    const storiesSnapshot = await db.collection('stories').orderBy('created_at', 'desc').get();
    const stories = [];
    
    storiesSnapshot.forEach(doc => {
      const story = doc.data();
      stories.push({
        id: doc.id,
        ...story,
        segmentCount: story.segments ? story.segments.length : 0,
        lastActivity: story.last_updated || story.created_at
      });
    });
    
    res.json({ stories });
  } catch (error) {
    console.error('Admin stories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/users', async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').orderBy('created_at', 'desc').get();
    const users = [];
    
    usersSnapshot.forEach(doc => {
      users.push({
        id: doc.id,
        ...doc.data(),
        storyCount: doc.data().stories_written || 0
      });
    });
    
    res.json({ users });
  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/admin/stories/:id', async (req, res) => {
  try {
    const storyId = req.params.id;
    const storyDoc = await db.collection('stories').doc(storyId).get();
    
    if (!storyDoc.exists) {
      return res.status(404).json({ message: 'Hikaye bulunamadı' });
    }
    
    await db.collection('stories').doc(storyId).delete();
    
    res.json({
      message: 'Hikaye başarıyla silindi',
      deletedStory: { id: storyId, ...storyDoc.data() }
    });
  } catch (error) {
    console.error('Delete story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/admin/stories/:id/approve', async (req, res) => {
  try {
    const storyId = req.params.id;
    const storyRef = db.collection('stories').doc(storyId);
    
    await storyRef.update({
      is_approved: true,
      approved_at: new Date().toISOString()
    });
    
    const storyDoc = await storyRef.get();
    
    res.json({
      message: 'Hikaye onaylandı',
      story: { id: storyId, ...storyDoc.data() }
    });
  } catch (error) {
    console.error('Approve story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/stats', async (req, res) => {
  try {
    const [storiesSnapshot, usersSnapshot] = await Promise.all([
      db.collection('stories').get(),
      db.collection('users').get()
    ]);
    
    const totalStories = storiesSnapshot.size;
    const totalUsers = usersSnapshot.size;
    
    let completedStories = 0;
    let totalSegments = 0;
    
    storiesSnapshot.forEach(doc => {
      const story = doc.data();
      if (story.is_completed) completedStories++;
      if (story.segments) totalSegments += story.segments.length;
    });
    
    res.json({
      stats: {
        totalStories,
        completedStories,
        ongoingStories: totalStories - completedStories,
        totalUsers,
        totalSegments,
        averageSegmentsPerStory: totalStories > 0 ? (totalSegments / totalStories).toFixed(1) : 0
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Bir şeyler ters gitti!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint bulunamadı' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`StoryChain API server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: Firebase Firestore`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
