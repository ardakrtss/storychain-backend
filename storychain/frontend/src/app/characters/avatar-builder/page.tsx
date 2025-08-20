'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, RotateCcw, Check, Star } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  profession: string;
  image: string;
  description: string;
}

const availableCharacters: Character[] = [
  {
    id: 'artist',
    name: 'Sanatçı',
    profession: 'Artist',
    image: '/characters/custom/parts/Artist colorful style icon.png',
    description: 'Yaratıcı ve hayal gücü yüksek sanatçı karakteri'
  },
  {
    id: 'chef',
    name: 'Şef',
    profession: 'Chef',
    image: '/characters/custom/parts/Chef avatar colorful style icon.png',
    description: 'Lezzetli hikayeler yaratan şef karakteri'
  },
  {
    id: 'firefighter',
    name: 'İtfaiyeci',
    profession: 'Firefighter',
    image: '/characters/custom/parts/Firefighter colorful style icon.png',
    description: 'Cesur ve kahraman itfaiyeci karakteri'
  },
  {
    id: 'flight-attendant',
    name: 'Hostes',
    profession: 'Flight Attendant',
    image: '/characters/custom/parts/Flight Attendance colorful style icon.png',
    description: 'Seyahat tutkunu hostes karakteri'
  },
  {
    id: 'bus-driver',
    name: 'Otobüs Şoförü',
    profession: 'Bus Driver',
    image: '/characters/custom/parts/Bus Driver colorful style icon.png',
    description: 'Yolculuk hikayeleri anlatan şoför karakteri'
  },
  {
    id: 'customer-service',
    name: 'Müşteri Hizmetleri',
    profession: 'Customer Service',
    image: '/characters/custom/parts/Customer service colorful style icon.png',
    description: 'Yardımsever müşteri hizmetleri karakteri'
  },
  {
    id: 'gardener',
    name: 'Bahçıvan',
    profession: 'Gardener',
    image: '/characters/custom/parts/Gardener colorful style icon.png',
    description: 'Doğa ve büyüme hikayeleri anlatan bahçıvan'
  }
];

export default function CharacterSelectionPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [customName, setCustomName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setCustomName(character.name);
  };

  const resetSelection = () => {
    setSelectedCharacter(null);
    setCustomName('');
  };

  const saveCharacter = () => {
    if (!selectedCharacter || !customName.trim()) {
      alert('Lütfen bir karakter seçin ve isim verin!');
      return;
    }
    
    const characterData = {
      id: `${selectedCharacter.id}-${Date.now()}`, // Unique ID
      originalId: selectedCharacter.id,
      name: customName,
      profession: selectedCharacter.profession,
      image: selectedCharacter.image,
      description: selectedCharacter.description,
      createdAt: new Date().toISOString(),
    };
    
    // LocalStorage'a kaydet
    const savedCharacters = JSON.parse(localStorage.getItem('storychain-custom-characters') || '[]');
    savedCharacters.push(characterData);
    localStorage.setItem('storychain-custom-characters', JSON.stringify(savedCharacters));
    
    alert('Karakter başarıyla kaydedildi!');
    resetSelection();
  };

  const filteredCharacters = availableCharacters.filter(character => {
    return character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           character.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
           character.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/characters" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span>Karakterler</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Karakter Seç</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Karakterinizi Seçin
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Hikayelerinizde kullanmak için harika karakterler arasından seçim yapın. 
            Her karakter kendine özgü kişiliği ve özellikleriyle hikayelerinizi canlandıracak.
          </p>
          
          {/* Search */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Karakter ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Character Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mevcut Karakterler</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCharacters.map((character) => (
                  <button
                    key={character.id}
                    onClick={() => handleCharacterSelect(character)}
                    className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                      selectedCharacter?.id === character.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img
                          src={character.image}
                          alt={character.name}
                          className="w-14 h-14 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden text-gray-400">
                          <Star className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">{character.name}</h3>
                          {selectedCharacter?.id === character.id && (
                            <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-blue-600 font-medium mb-1">{character.profession}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{character.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {filteredCharacters.length === 0 && (
                <div className="text-center py-12">
                  <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Karakter bulunamadı
                  </h3>
                  <p className="text-gray-600">
                    Arama kriterlerinize uygun karakter bulunamadı.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Character Preview & Save */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Seçilen Karakter</h3>
              
              {selectedCharacter ? (
                <>
                  {/* Character Preview */}
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <img
                        src={selectedCharacter.image}
                        alt={selectedCharacter.name}
                        className="w-28 h-28 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden text-gray-400">
                        <Star className="h-16 w-16" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">{selectedCharacter.name}</h4>
                    <p className="text-blue-600 font-medium">{selectedCharacter.profession}</p>
                    <p className="text-sm text-gray-600 mt-2">{selectedCharacter.description}</p>
                  </div>

                  {/* Custom Name Input */}
                  <div className="mb-6">
                    <label htmlFor="customName" className="block text-sm font-medium text-gray-700 mb-2">
                      Karakter İsmi
                    </label>
                    <input
                      type="text"
                      id="customName"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Karakteriniz için bir isim girin..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={saveCharacter}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Karakteri Kaydet</span>
                    </button>
                    
                    <button
                      onClick={resetSelection}
                      className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Seçimi Sıfırla</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Karakter seçin</p>
                  <p className="text-sm text-gray-500">Önizleme burada görünecek</p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 İpuçları</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Farklı mesleklerden karakterler seçin</li>
                <li>• Karakterinize özel isim verin</li>
                <li>• Kaydedilen karakteriniz hikayelerde kullanılabilir</li>
                <li>• Karakterler sayfasında tüm kayıtlı karakterlerinizi görebilirsiniz</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

