const express = require('express');
const router = express.Router();

// Sample themes data
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

// Get all themes
router.get('/', (req, res) => {
  res.json(themes);
});

// Get theme by ID
router.get('/:id', (req, res) => {
  const theme = themes.find(t => t.id === req.params.id);
  if (!theme) {
    return res.status(404).json({ message: 'Tema bulunamadı' });
  }
  res.json(theme);
});

module.exports = router;
