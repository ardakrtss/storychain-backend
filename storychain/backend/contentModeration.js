// Content Moderation Module for StoryChain
// Bu modül, kullanıcıların yazdığı içerikleri kontrol eder

// Yasaklı kelimeler listesi (çocuklar için uygun olmayan içerikler)
const forbiddenWords = [
  // Küfür ve hakaret içeren kelimeler
  'kötü', 'aptal', 'salak', 'gerizekalı', 'ahmak',
  
  // Şiddet içeren kelimeler
  'öldür', 'katlet', 'vur', 'saldır', 'döv',
  
  // Uygunsuz içerik
  'kötü', 'tehlikeli', 'yasak', 'gizli',
  
  // Spam ve reklam
  'satın al', 'indir', 'ücretsiz', 'kazan',
  
  // Kişisel bilgi istekleri
  'telefon', 'adres', 'okul', 'ev', 'anne', 'baba'
];

// Yasaklı kelime grupları (daha karmaşık kontroller için)
const forbiddenPhrases = [
  'kişisel bilgi',
  'iletişim bilgisi',
  'adres bilgisi',
  'telefon numarası',
  'e-posta adresi'
];

/**
 * İçerik moderasyonu yapar
 * @param {string} content - Kontrol edilecek içerik
 * @returns {object} - Moderasyon sonucu
 */
function moderateContent(content) {
  if (!content || typeof content !== 'string') {
    return {
      isAppropriate: false,
      reason: 'İçerik boş olamaz'
    };
  }

  const lowerContent = content.toLowerCase().trim();
  
  // Minimum uzunluk kontrolü
  if (lowerContent.length < 10) {
    return {
      isAppropriate: false,
      reason: 'İçerik çok kısa. En az 10 karakter olmalıdır.'
    };
  }

  // Maksimum uzunluk kontrolü
  if (lowerContent.length > 1000) {
    return {
      isAppropriate: false,
      reason: 'İçerik çok uzun. En fazla 1000 karakter olabilir.'
    };
  }

  // Yasaklı kelime kontrolü
  for (const word of forbiddenWords) {
    if (lowerContent.includes(word)) {
      return {
        isAppropriate: false,
        reason: `İçerikte uygun olmayan kelime bulundu: "${word}"`
      };
    }
  }

  // Yasaklı kelime grubu kontrolü
  for (const phrase of forbiddenPhrases) {
    if (lowerContent.includes(phrase)) {
      return {
        isAppropriate: false,
        reason: `İçerikte uygun olmayan ifade bulundu: "${phrase}"`
      };
    }
  }

  // Sadece büyük harf kontrolü (bağırmak gibi)
  const upperCaseCount = (content.match(/[A-ZĞÜŞİÖÇ]/g) || []).length;
  const totalLetters = (content.match(/[A-Za-zĞÜŞİÖÇğüşıöç]/g) || []).length;
  
  if (totalLetters > 0 && (upperCaseCount / totalLetters) > 0.7) {
    return {
      isAppropriate: false,
      reason: 'Çok fazla büyük harf kullanılmış. Lütfen normal yazım kurallarına uyun.'
    };
  }

  // Tekrarlayan karakter kontrolü
  const repeatedChars = content.match(/(.)\1{4,}/g);
  if (repeatedChars) {
    return {
      isAppropriate: false,
      reason: 'Çok fazla tekrarlayan karakter var. Lütfen normal yazım kurallarına uyun.'
    };
  }

  // Sadece sayı kontrolü
  if (/^\d+$/.test(lowerContent.replace(/\s/g, ''))) {
    return {
      isAppropriate: false,
      reason: 'İçerik sadece sayılardan oluşamaz.'
    };
  }

  // Sadece özel karakter kontrolü
  if (/^[^\w\sğüşıöçĞÜŞİÖÇ]+$/.test(lowerContent.replace(/\s/g, ''))) {
    return {
      isAppropriate: false,
      reason: 'İçerik sadece özel karakterlerden oluşamaz.'
    };
  }

  // Başarılı moderasyon
  return {
    isAppropriate: true,
    reason: 'İçerik uygun'
  };
}

/**
 * Başlık moderasyonu yapar
 * @param {string} title - Kontrol edilecek başlık
 * @returns {object} - Moderasyon sonucu
 */
function moderateTitle(title) {
  if (!title || typeof title !== 'string') {
    return {
      isAppropriate: false,
      reason: 'Başlık boş olamaz'
    };
  }

  const lowerTitle = title.toLowerCase().trim();
  
  // Minimum uzunluk kontrolü
  if (lowerTitle.length < 3) {
    return {
      isAppropriate: false,
      reason: 'Başlık çok kısa. En az 3 karakter olmalıdır.'
    };
  }

  // Maksimum uzunluk kontrolü
  if (lowerTitle.length > 100) {
    return {
      isAppropriate: false,
      reason: 'Başlık çok uzun. En fazla 100 karakter olabilir.'
    };
  }

  // Yasaklı kelime kontrolü
  for (const word of forbiddenWords) {
    if (lowerTitle.includes(word)) {
      return {
        isAppropriate: false,
        reason: `Başlıkta uygun olmayan kelime bulundu: "${word}"`
      };
    }
  }

  // Yasaklı kelime grubu kontrolü
  for (const phrase of forbiddenPhrases) {
    if (lowerTitle.includes(phrase)) {
      return {
        isAppropriate: false,
        reason: `Başlıkta uygun olmayan ifade bulundu: "${phrase}"`
      };
    }
  }

  // Sadece sayı kontrolü
  if (/^\d+$/.test(lowerTitle.replace(/\s/g, ''))) {
    return {
      isAppropriate: false,
      reason: 'Başlık sadece sayılardan oluşamaz.'
    };
  }

  // Başarılı moderasyon
  return {
    isAppropriate: true,
    reason: 'Başlık uygun'
  };
}

/**
 * Kullanıcı adı moderasyonu yapar
 * @param {string} nickname - Kontrol edilecek kullanıcı adı
 * @returns {object} - Moderasyon sonucu
 */
function moderateNickname(nickname) {
  if (!nickname || typeof nickname !== 'string') {
    return {
      isAppropriate: false,
      reason: 'Kullanıcı adı boş olamaz'
    };
  }

  const lowerNickname = nickname.toLowerCase().trim();
  
  // Minimum uzunluk kontrolü
  if (lowerNickname.length < 2) {
    return {
      isAppropriate: false,
      reason: 'Kullanıcı adı çok kısa. En az 2 karakter olmalıdır.'
    };
  }

  // Maksimum uzunluk kontrolü
  if (lowerNickname.length > 20) {
    return {
      isAppropriate: false,
      reason: 'Kullanıcı adı çok uzun. En fazla 20 karakter olabilir.'
    };
  }

  // Yasaklı kelime kontrolü
  for (const word of forbiddenWords) {
    if (lowerNickname.includes(word)) {
      return {
        isAppropriate: false,
        reason: `Kullanıcı adında uygun olmayan kelime bulundu: "${word}"`
      };
    }
  }

  // Özel karakter kontrolü (sadece harf, sayı ve alt çizgi)
  if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ0-9_]+$/.test(nickname)) {
    return {
      isAppropriate: false,
      reason: 'Kullanıcı adında sadece harf, sayı ve alt çizgi kullanabilirsiniz.'
    };
  }

  // Başarılı moderasyon
  return {
    isAppropriate: true,
    reason: 'Kullanıcı adı uygun'
  };
}

module.exports = {
  moderateContent,
  moderateTitle,
  moderateNickname
};
