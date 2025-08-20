const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { moderateContent, moderateTitle } = require('./contentModeration');

const app = express();
app.use(cors());
app.use(express.json());

// Mock data
const users = [];
let userIdCounter = 1;

// Admin users
const adminUsers = [
  {
    id: 'admin1',
    nickname: 'admin',
    password: 'admin123', // Gerçek uygulamada hash'lenmiş olmalı
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

// Mock stories data
const stories = [
  {
    id: '1',
    title: 'Büyülü Ormanın Sırrı',
    theme: 'fantastik',
    segments: [
      {
        id: '1-1',
        author: 'Hikayeci_Ali',
        content: 'Bir zamanlar, hiç kimsenin gitmeye cesaret edemediği büyülü bir orman vardı. Bu ormanda yaşayan küçük peri Luna, her gün aynı şeyi yapardı: güneş doğarken çiçekleri sulardı.',
        order: 1,
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '1-2',
        author: 'Yıldız_Yazar',
        content: 'Bir gün Luna, ormanın derinliklerinden gelen garip sesler duydu. Merakla sesin geldiği yöne doğru yürümeye başladı. Yol boyunca ağaçlar sanki ona yol gösteriyordu.',
        order: 2,
        createdAt: '2024-01-15T11:30:00Z'
      }
    ],
    isCompleted: false,
    likeCount: 5,
    createdAt: '2024-01-15T09:00:00Z'
  },
  {
    id: '2',
    title: 'Uzaylı Arkadaşım',
    theme: 'bilim-kurgu',
    segments: [
      {
        id: '2-1',
        author: 'Uzay_Meraklısı',
        content: 'Gece yarısı odamın penceresinden mavi bir ışık geldi. Korkuyla yatağımdan kalktım ve pencereden baktığımda küçük, yeşil bir uzaylı gördüm.',
        order: 1,
        createdAt: '2024-01-14T20:00:00Z'
      }
    ],
    isCompleted: false,
    likeCount: 3,
    createdAt: '2024-01-14T19:30:00Z'
  },
  {
    id: '3',
    title: 'Geri Dönüşüm Kahramanları',
    theme: 'sifir-atik',
    segments: [
      {
        id: '3-1',
        author: 'Çevreci_Mert',
        content: 'Mahallemizdeki çocuklar bir gün toplandı ve çevre kirliliğine karşı savaşmaya karar verdiler. İlk işleri mahalledeki tüm çöpleri toplamak oldu.',
        order: 1,
        createdAt: '2024-01-13T15:00:00Z'
      },
      {
        id: '3-2',
        author: 'Yeşil_Elif',
        content: 'Çöpleri toplarken eski bir oyuncak kutusu buldular. İçinde kırık oyuncaklar vardı. "Bunları geri dönüştürebiliriz!" dedi Elif heyecanla.',
        order: 2,
        createdAt: '2024-01-13T16:00:00Z'
      },
      {
        id: '3-3',
        author: 'Sanatçı_Can',
        content: 'Kırık oyuncakları birleştirerek yeni, harika oyuncaklar yaptılar. Mahalle sakinleri bu yaratıcılığa hayran kaldı ve geri dönüşüm projesine katılmaya başladı.',
        order: 3,
        createdAt: '2024-01-13T17:00:00Z'
      }
    ],
    isCompleted: false,
    likeCount: 8,
    createdAt: '2024-01-13T14:30:00Z'
  }
];

let storyIdCounter = 4;

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'StoryChain API is running' });
});

// Simple login
app.post('/api/auth/login', (req, res) => {
  try {
    const { nickname, password } = req.body;

    // Admin login check
    if (password) {
      const adminUser = adminUsers.find(u => u.nickname === nickname && u.password === password);
      if (adminUser) {
        const token = jwt.sign(
          { userId: adminUser.id, nickname: adminUser.nickname, role: 'admin' },
          'your-secret-key',
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

    // Find or create user
    let user = users.find(u => u.nickname === nickname.trim());
    
    if (!user) {
      user = {
        id: userIdCounter++,
        nickname: nickname.trim(),
        stories_written: 0,
        total_likes: 0
      };
      users.push(user);
    }

    // Generate simple token
    const token = `token_${user.id}_${Date.now()}`;

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

// Get themes
app.get('/api/themes', (req, res) => {
  const themes = [
    {
      id: 'fantastik',
      name: 'Fantastik',
      description: 'Büyülü dünyalar, sihirli yaratıklar ve olağanüstü maceralar',
      icon: '🧙‍♂️',
      color: '#8B5CF6',
      characters: 'Sihirbaz, Ejderha, Peri, Büyülü Hayvanlar',
      plotHints: 'Kayıp bir büyü kitabı, gizli bir orman, unutulmuş bir krallık'
    },
    {
      id: 'gizem',
      name: 'Gizem',
      description: 'Gizemli olaylar, ipuçları ve heyecan verici keşifler',
      icon: '🔍',
      color: '#3B82F6',
      characters: 'Dedektif, Gizemli Yabancı, Şüpheli Karakterler',
      plotHints: 'Kayıp bir hazine haritası, gizli geçitler, şifreli mesajlar'
    },
    {
      id: 'bilim-kurgu',
      name: 'Bilim Kurgu',
      description: 'Gelecekteki teknolojiler, uzay yolculukları ve robotlar',
      icon: '🚀',
      color: '#06B6D4',
      characters: 'Astronot, Robot, Uzaylı, Bilim İnsanı',
      plotHints: 'Yeni bir gezegen keşfi, zaman makinesi, yapay zeka'
    },
    {
      id: 'macera',
      name: 'Macera',
      description: 'Tehlikeli yolculuklar, cesur kahramanlar ve büyük zorluklar',
      icon: '🗺️',
      color: '#10B981',
      characters: 'Kaşif, Savaşçı, Rehber, Yerli Halk',
      plotHints: 'Bilinmeyen bir ada, antik tapınak, tehlikeli orman'
    },
    {
      id: 'sifir-atik',
      name: 'Sıfır Atık',
      description: 'Çevre dostu yaşam, geri dönüşüm ve doğa sevgisi',
      icon: '♻️',
      color: '#059669',
      characters: 'Çevreci Çocuk, Geri Dönüşüm Ustası, Doğa Koruyucusu',
      plotHints: 'Çöplerden yapılan sanat, organik bahçe, temiz enerji'
    },
    {
      id: 'iklim-degisikligi',
      name: 'İklim Değişikliği',
      description: 'İklim sorunları, çözümler ve gelecek için umut',
      icon: '🌍',
      color: '#0D9488',
      characters: 'İklim Aktivisti, Bilim İnsanı, Gelecek Çocuğu',
      plotHints: 'Yenilenebilir enerji, karbon ayak izi, yeşil teknoloji'
    }
  ];
  
  res.json(themes);
});

// Get theme by ID
app.get('/api/themes/:id', (req, res) => {
  const themes = [
    {
      id: 'fantastik',
      name: 'Fantastik',
      description: 'Büyülü dünyalar, sihirli yaratıklar ve olağanüstü maceralar',
      icon: '🧙‍♂️',
      color: '#8B5CF6',
      characters: 'Sihirbaz, Ejderha, Peri, Büyülü Hayvanlar',
      plotHints: 'Kayıp bir büyü kitabı, gizli bir orman, unutulmuş bir krallık'
    },
    {
      id: 'gizem',
      name: 'Gizem',
      description: 'Gizemli olaylar, ipuçları ve heyecan verici keşifler',
      icon: '🔍',
      color: '#3B82F6',
      characters: 'Dedektif, Gizemli Yabancı, Şüpheli Karakterler',
      plotHints: 'Kayıp bir hazine haritası, gizli geçitler, şifreli mesajlar'
    },
    {
      id: 'bilim-kurgu',
      name: 'Bilim Kurgu',
      description: 'Gelecekteki teknolojiler, uzay yolculukları ve robotlar',
      icon: '🚀',
      color: '#06B6D4',
      characters: 'Astronot, Robot, Uzaylı, Bilim İnsanı',
      plotHints: 'Yeni bir gezegen keşfi, zaman makinesi, yapay zeka'
    },
    {
      id: 'macera',
      name: 'Macera',
      description: 'Tehlikeli yolculuklar, cesur kahramanlar ve büyük zorluklar',
      icon: '🗺️',
      color: '#10B981',
      characters: 'Kaşif, Savaşçı, Rehber, Yerli Halk',
      plotHints: 'Bilinmeyen bir ada, antik tapınak, tehlikeli orman'
    },
    {
      id: 'sifir-atik',
      name: 'Sıfır Atık',
      description: 'Çevre dostu yaşam, geri dönüşüm ve doğa sevgisi',
      icon: '♻️',
      color: '#059669',
      characters: 'Çevreci Çocuk, Geri Dönüşüm Ustası, Doğa Koruyucusu',
      plotHints: 'Çöplerden yapılan sanat, organik bahçe, temiz enerji'
    },
    {
      id: 'iklim-degisikligi',
      name: 'İklim Değişikliği',
      description: 'İklim sorunları, çözümler ve gelecek için umut',
      icon: '🌍',
      color: '#0D9488',
      characters: 'İklim Aktivisti, Bilim İnsanı, Gelecek Çocuğu',
      plotHints: 'Yenilenebilir enerji, karbon ayak izi, yeşil teknoloji'
    }
  ];

  const theme = themes.find(t => t.id === req.params.id);
  if (!theme) {
    return res.status(404).json({ message: 'Tema bulunamadı' });
  }
  
  res.json(theme);
});

// Get available stories to continue (not completed, not by current user)
app.get('/api/stories/available', (req, res) => {
  const { authorId } = req.query;
  
  // Filter stories that are not completed and not written by current user
  const availableStories = stories.filter(story => 
    !story.isCompleted && 
    !story.segments.some(segment => segment.authorId === authorId)
  );
  
  res.json(availableStories);
});

// Get random story to continue
app.get('/api/stories/random', (req, res) => {
  const { authorId } = req.query;
  
  // Filter stories that are not completed and not written by current user
  const availableStories = stories.filter(story => 
    !story.isCompleted && 
    !story.segments.some(segment => segment.authorId === authorId)
  );
  
  if (availableStories.length === 0) {
    return res.status(404).json({ message: 'Devam edilecek hikaye bulunamadı' });
  }
  
  // Get random story
  const randomStory = availableStories[Math.floor(Math.random() * availableStories.length)];
  
  // Get only the last segment for the user to continue
  const lastSegment = randomStory.segments[randomStory.segments.length - 1];
  
  res.json({
    story: {
      id: randomStory.id,
      title: randomStory.title,
      theme: randomStory.theme,
      lastSegment: lastSegment,
      currentAuthorNumber: randomStory.segments.length + 1,
      totalAuthors: 5
    }
  });
});

// Create new story
app.post('/api/stories', (req, res) => {
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
      id: storyIdCounter++,
      title: title.trim(),
      theme: theme,
      segments: [
        {
          id: `${storyIdCounter-1}-1`,
          author: authorNickname,
          authorId: authorId,
          content: content.trim(),
          order: 1,
          createdAt: new Date().toISOString()
        }
      ],
      isCompleted: false,
      likeCount: 0,
      createdAt: new Date().toISOString()
    };
    
    stories.push(newStory);
    
    res.status(201).json({
      message: 'Hikaye başarıyla oluşturuldu! Diğer yazarların katkılarını bekleyin.',
      story: newStory
    });
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Continue existing story
app.post('/api/stories/:id/continue', (req, res) => {
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
    
    const story = stories.find(s => s.id === storyId);
    if (!story) {
      return res.status(404).json({ message: 'Hikaye bulunamadı' });
    }
    
    if (story.isCompleted) {
      return res.status(400).json({ message: 'Bu hikaye zaten tamamlanmış' });
    }
    
    // Check if user already contributed to this story
    const hasContributed = story.segments.some(segment => segment.authorId === authorId);
    if (hasContributed) {
      return res.status(400).json({ message: 'Bu hikayeye zaten katkıda bulundunuz' });
    }
    
    const newSegment = {
      id: `${storyId}-${story.segments.length + 1}`,
      author: authorNickname,
      authorId: authorId,
      content: content.trim(),
      order: story.segments.length + 1,
      createdAt: new Date().toISOString()
    };
    
    story.segments.push(newSegment);
    
    // Check if story is completed (5 authors)
    if (story.segments.length >= 5) {
      story.isCompleted = true;
    }
    
    res.json({
      message: story.isCompleted 
        ? 'Hikaye başarıyla tamamlandı! Tebrikler!' 
        : 'Hikaye başarıyla devam ettirildi!',
      story: story,
      isCompleted: story.isCompleted
    });
  } catch (error) {
    console.error('Continue story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin endpoints
app.get('/api/admin/stories', (req, res) => {
  try {
    // In a real app, you'd verify admin token here
    res.json({
      stories: stories.map(story => ({
        ...story,
        segmentCount: story.segments.length,
        lastActivity: story.segments[story.segments.length - 1]?.createdAt || story.createdAt
      }))
    });
  } catch (error) {
    console.error('Admin stories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/users', (req, res) => {
  try {
    res.json({
      users: users.map(user => ({
        ...user,
        storyCount: stories.filter(s => s.segments.some(seg => seg.authorId === user.id)).length
      }))
    });
  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/admin/stories/:id', (req, res) => {
  try {
    const storyId = req.params.id;
    const storyIndex = stories.findIndex(s => s.id == storyId);
    
    if (storyIndex === -1) {
      return res.status(404).json({ message: 'Hikaye bulunamadı' });
    }
    
    const deletedStory = stories.splice(storyIndex, 1)[0];
    
    res.json({
      message: 'Hikaye başarıyla silindi',
      deletedStory
    });
  } catch (error) {
    console.error('Delete story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/admin/stories/:id/approve', (req, res) => {
  try {
    const storyId = req.params.id;
    const story = stories.find(s => s.id == storyId);
    
    if (!story) {
      return res.status(404).json({ message: 'Hikaye bulunamadı' });
    }
    
    story.isApproved = true;
    
    res.json({
      message: 'Hikaye onaylandı',
      story
    });
  } catch (error) {
    console.error('Approve story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/stats', (req, res) => {
  try {
    const totalStories = stories.length;
    const completedStories = stories.filter(s => s.isCompleted).length;
    const totalUsers = users.length;
    const totalSegments = stories.reduce((sum, story) => sum + story.segments.length, 0);
    
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

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
