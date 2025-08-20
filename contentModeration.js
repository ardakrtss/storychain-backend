// Content moderation for Turkish language
// Basit Türkçe içerik moderasyonu

const inappropriateWords = [
  // Küfürler ve argo kelimeler
  'küfür', 'argo', 'pislik', 'bok', 'siktir', 'amk', 'aq', 'orospu', 'pezevenk',
  'piç', 'göt', 'sik', 'amına', 'siktir', 'siktir git', 'siktir ol', 'siktir et',
  'amına koyayım', 'amına koyim', 'amına koyum', 'amına koyayım', 'amına koyim',
  'götüne', 'götünü', 'götün', 'götü', 'göt', 'götlük', 'götlü', 'götsüz',
  'sikik', 'sikti', 'siktin', 'siktiğim', 'siktiğin', 'siktiğiniz', 'siktiğimiz',
  'orospu', 'orospu çocuğu', 'orospu evladı', 'orospu çocuğu', 'orospu evladı',
  'pezevenk', 'pezevenk çocuğu', 'pezevenk evladı', 'pezevenk çocuğu',
  'piç', 'piç kurusu', 'piç kurusu çocuğu', 'piç kurusu evladı',
  'yavşak', 'yavşak çocuğu', 'yavşak evladı', 'yavşak çocuğu',
  'ibne', 'ibne çocuğu', 'ibne evladı', 'ibne çocuğu',
  'gavat', 'gavat çocuğu', 'gavat evladı', 'gavat çocuğu',
  'kaltak', 'kaltak çocuğu', 'kaltak evladı', 'kaltak çocuğu',
  'sürtük', 'sürtük çocuğu', 'sürtük evladı', 'sürtük çocuğu',
  'fahişe', 'fahişe çocuğu', 'fahişe evladı', 'fahişe çocuğu',
  'hayat kadını', 'hayat kadını çocuğu', 'hayat kadını evladı',
  'kancık', 'kancık çocuğu', 'kancık evladı', 'kancık çocuğu',
  'kaltak', 'kaltak çocuğu', 'kaltak evladı', 'kaltak çocuğu',
  'sürtük', 'sürtük çocuğu', 'sürtük evladı', 'sürtük çocuğu',
  'fahişe', 'fahişe çocuğu', 'fahişe evladı', 'fahişe çocuğu',
  'hayat kadını', 'hayat kadını çocuğu', 'hayat kadını evladı',
  'kancık', 'kancık çocuğu', 'kancık evladı', 'kancık çocuğu',
  
  // Şiddet içeren kelimeler
  'öldür', 'öldürme', 'öldürür', 'öldürürüm', 'öldürürsün', 'öldürürüz',
  'katlet', 'katletme', 'katleder', 'katlederim', 'katledersin',
  'vur', 'vurma', 'vurur', 'vururum', 'vurursun', 'vururuz',
  'döv', 'dövme', 'döver', 'döverim', 'döversin', 'döveriz',
  'patlat', 'patlatma', 'patlatır', 'patlatırım', 'patlatırsın',
  'bomba', 'bomba patlat', 'bomba patlatma', 'bomba patlatır',
  'terör', 'terörist', 'teröristlik', 'teröristlik yap',
  
  // Nefret söylemi
  'nefret', 'nefret et', 'nefret eder', 'nefret ederim', 'nefret edersin',
  'düşman', 'düşmanlık', 'düşmanlık et', 'düşmanlık eder',
  'ırkçı', 'ırkçılık', 'ırkçılık yap', 'ırkçılık eder',
  'ayrımcı', 'ayrımcılık', 'ayrımcılık yap', 'ayrımcılık eder',
  
  // Uygunsuz içerik
  'porno', 'pornografik', 'pornografik içerik', 'pornografik video',
  'seks', 'seksüel', 'seksüel içerik', 'seksüel video',
  'çıplak', 'çıplaklık', 'çıplaklık içerik', 'çıplaklık video',
  'mastürbasyon', 'mastürbasyon yap', 'mastürbasyon eder',
  'orgazm', 'orgazm ol', 'orgazm olur', 'orgazm olurum',
  
  // Spam ve reklam
  'reklam', 'reklam ver', 'reklam verir', 'reklam veririm',
  'satış', 'satış yap', 'satış yapar', 'satış yaparım',
  'alışveriş', 'alışveriş yap', 'alışveriş yapar',
  'indirim', 'indirim var', 'indirim yap', 'indirim yapar',
  'bedava', 'bedava ver', 'bedava verir', 'bedava veririm',
  'ücretsiz', 'ücretsiz ver', 'ücretsiz verir', 'ücretsiz veririm',
  
  // Kişisel bilgi
  'telefon', 'telefon numarası', 'telefon numarası ver',
  'adres', 'adres ver', 'adres verir', 'adres veririm',
  'email', 'e-mail', 'email ver', 'e-mail ver', 'email verir',
  'tc', 'tc kimlik', 'tc kimlik no', 'tc kimlik numarası',
  'kimlik', 'kimlik no', 'kimlik numarası', 'kimlik ver',
  
  // Zararlı linkler
  'http://', 'https://', 'www.', '.com', '.net', '.org',
  'link', 'link ver', 'link verir', 'link veririm',
  'site', 'site ver', 'site verir', 'site veririm',
  'url', 'url ver', 'url verir', 'url veririm'
];

// İçerik moderasyonu fonksiyonu
function moderateContent(content) {
  if (!content || typeof content !== 'string') {
    return {
      isAppropriate: false,
      reason: 'İçerik boş veya geçersiz'
    };
  }

  const lowerContent = content.toLowerCase();
  const words = lowerContent.split(/\s+/);
  
  // Uygunsuz kelimeleri kontrol et
  const foundInappropriateWords = [];
  
  for (const word of inappropriateWords) {
    if (lowerContent.includes(word.toLowerCase())) {
      foundInappropriateWords.push(word);
    }
  }
  
  // Çok fazla büyük harf kontrolü (bağırmak gibi)
  const upperCaseCount = (content.match(/[A-ZĞÜŞİÖÇ]/g) || []).length;
  const totalLetters = (content.match(/[A-ZĞÜŞİÖÇa-zğüşıöç]/g) || []).length;
  const upperCaseRatio = totalLetters > 0 ? upperCaseCount / totalLetters : 0;
  
  // Çok fazla ünlem kontrolü
  const exclamationCount = (content.match(/!/g) || []).length;
  const exclamationRatio = content.length > 0 ? exclamationCount / content.length : 0;
  
  // Çok fazla soru işareti kontrolü
  const questionCount = (content.match(/\?/g) || []).length;
  const questionRatio = content.length > 0 ? questionCount / content.length : 0;
  
  // Çok kısa içerik kontrolü
  if (content.trim().length < 10) {
    return {
      isAppropriate: false,
      reason: 'İçerik çok kısa (en az 10 karakter olmalı)'
    };
  }
  
  // Uygunsuz kelime bulundu
  if (foundInappropriateWords.length > 0) {
    return {
      isAppropriate: false,
      reason: `Uygunsuz kelimeler tespit edildi: ${foundInappropriateWords.slice(0, 3).join(', ')}`
    };
  }
  
  // Çok fazla büyük harf
  if (upperCaseRatio > 0.7) {
    return {
      isAppropriate: false,
      reason: 'Çok fazla büyük harf kullanımı (bağırmak gibi)'
    };
  }
  
  // Çok fazla ünlem
  if (exclamationRatio > 0.1) {
    return {
      isAppropriate: false,
      reason: 'Çok fazla ünlem işareti kullanımı'
    };
  }
  
  // Çok fazla soru işareti
  if (questionRatio > 0.1) {
    return {
      isAppropriate: false,
      reason: 'Çok fazla soru işareti kullanımı'
    };
  }
  
  // Spam kontrolü - aynı kelimenin çok tekrarı
  const wordCounts = {};
  for (const word of words) {
    if (word.length > 2) { // 2 karakterden uzun kelimeleri say
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  }
  
  for (const [word, count] of Object.entries(wordCounts)) {
    if (count > 5) { // Aynı kelime 5'ten fazla tekrarlanıyorsa
      return {
        isAppropriate: false,
        reason: `Aynı kelime çok fazla tekrarlanıyor: "${word}"`
      };
    }
  }
  
  return {
    isAppropriate: true,
    reason: 'İçerik uygun'
  };
}

// Başlık moderasyonu (daha sıkı kurallar)
function moderateTitle(title) {
  if (!title || typeof title !== 'string') {
    return {
      isAppropriate: false,
      reason: 'Başlık boş veya geçersiz'
    };
  }

  const lowerTitle = title.toLowerCase();
  
  // Uygunsuz kelimeleri kontrol et
  for (const word of inappropriateWords) {
    if (lowerTitle.includes(word.toLowerCase())) {
      return {
        isAppropriate: false,
        reason: `Başlıkta uygunsuz kelime tespit edildi: ${word}`
      };
    }
  }
  
  // Çok kısa başlık
  if (title.trim().length < 3) {
    return {
      isAppropriate: false,
      reason: 'Başlık çok kısa (en az 3 karakter olmalı)'
    };
  }
  
  // Çok uzun başlık
  if (title.trim().length > 100) {
    return {
      isAppropriate: false,
      reason: 'Başlık çok uzun (maksimum 100 karakter)'
    };
  }
  
  // Sadece sayı veya özel karakter
  if (/^[0-9\s\W]+$/.test(title.trim())) {
    return {
      isAppropriate: false,
      reason: 'Başlık sadece sayı veya özel karakterlerden oluşamaz'
    };
  }
  
  return {
    isAppropriate: true,
    reason: 'Başlık uygun'
  };
}

module.exports = {
  moderateContent,
  moderateTitle
};
