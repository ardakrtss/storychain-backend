'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Plus, Heart, Star } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  image: string;
  category: 'game' | 'tomodachi' | 'custom';
  isFavorite?: boolean;
  rating?: number;
  profession?: string;
  description?: string;
}

const mockCharacters: Character[] = [
  // Professional Avatar Characters
  { 
    id: 'artist', 
    name: 'Sanatçı', 
    image: '/characters/custom/parts/Artist colorful style icon.png', 
    category: 'custom',
    profession: 'Artist',
    description: 'Yaratıcı ve hayal gücü yüksek sanatçı karakteri'
  },
  { 
    id: 'chef', 
    name: 'Şef', 
    image: '/characters/custom/parts/Chef avatar colorful style icon.png', 
    category: 'custom',
    profession: 'Chef',
    description: 'Lezzetli hikayeler yaratan şef karakteri'
  },
  { 
    id: 'firefighter', 
    name: 'İtfaiyeci', 
    image: '/characters/custom/parts/Firefighter colorful style icon.png', 
    category: 'custom',
    profession: 'Firefighter',
    description: 'Cesur ve kahraman itfaiyeci karakteri'
  },
  { 
    id: 'flight-attendant', 
    name: 'Hostes', 
    image: '/characters/custom/parts/Flight Attendance colorful style icon.png', 
    category: 'custom',
    profession: 'Flight Attendant',
    description: 'Seyahat tutkunu hostes karakteri'
  },
  { 
    id: 'bus-driver', 
    name: 'Otobüs Şoförü', 
    image: '/characters/custom/parts/Bus Driver colorful style icon.png', 
    category: 'custom',
    profession: 'Bus Driver',
    description: 'Yolculuk hikayeleri anlatan şoför karakteri'
  },
  { 
    id: 'customer-service', 
    name: 'Müşteri Hizmetleri', 
    image: '/characters/custom/parts/Customer service colorful style icon.png', 
    category: 'custom',
    profession: 'Customer Service',
    description: 'Yardımsever müşteri hizmetleri karakteri'
  },
  { 
    id: 'gardener', 
    name: 'Bahçıvan', 
    image: '/characters/custom/parts/Gardener colorful style icon.png', 
    category: 'custom',
    profession: 'Gardener',
    description: 'Doğa ve büyüme hikayeleri anlatan bahçıvan'
  }
];

export default function CharactersPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'custom'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [allCharacters, setAllCharacters] = useState<Character[]>(mockCharacters);

  useEffect(() => {
    setIsClient(true);
    
    // Load custom characters from localStorage
    const savedCharacters = JSON.parse(localStorage.getItem('storychain-custom-characters') || '[]');
    const customCharacters = savedCharacters.map((char: any) => ({
      ...char,
      category: 'custom' as const,
      rating: 4.5
    }));
    
    setAllCharacters([...mockCharacters, ...customCharacters]);
  }, []);

  const filteredCharacters = allCharacters.filter(character => {
    const matchesCategory = selectedCategory === 'all' || character.category === selectedCategory;
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (character.profession && character.profession.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (characterId: string) => {
    setFavorites(prev => 
      prev.includes(characterId) 
        ? prev.filter(id => id !== characterId)
        : [...prev, characterId]
    );
  };

  const categories = [
    { id: 'all', name: 'Tümü', count: allCharacters.length },
    { id: 'custom', name: 'Avatar Karakterleri', count: allCharacters.filter(c => c.category === 'custom').length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span>Ana Sayfa</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Karakterler</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Karakterlerinizi Seçin
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Hikayelerinizde kullanmak için harika karakterler arasından seçim yapın. 
            Her karakter kendine özgü kişiliği ve özellikleriyle hikayelerinizi canlandıracak.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Karakter ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
              <Sparkles className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <Link
              href="/characters/avatar-builder"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Karakter Seç</span>
            </Link>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Characters Grid */}
        {isClient && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredCharacters.map((character) => (
              <div
                key={character.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="relative p-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/characters/game/PNG/512/1.png';
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">
                      {character.name}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(character.id);
                      }}
                      className={`p-1 rounded-full transition-colors ${
                        favorites.includes(character.id)
                          ? 'text-red-500'
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(character.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">
                        {character.rating || 4.5}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                      Avatar
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {isClient && filteredCharacters.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Karakter bulunamadı
            </h3>
            <p className="text-gray-600 mb-4">
              Arama kriterlerinize uygun karakter bulunamadı.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Tüm karakterleri göster
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
