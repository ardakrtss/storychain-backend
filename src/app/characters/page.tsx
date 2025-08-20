'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Character {
  id: string;
  name: string;
  image: string;
  category: 'game' | 'tomodachi' | 'custom';
  description: string;
}

const characters: Character[] = [
  // Game Characters (Fantasy)
  {
    id: 'game-1',
    name: 'Fantasy Warrior',
    image: '/characters/game/PNG/2048/88.png',
    category: 'game',
    description: 'Güçlü savaşçı karakteri'
  },
  {
    id: 'game-2',
    name: 'Magic Wizard',
    image: '/characters/game/PNG/2048/77.png',
    category: 'game',
    description: 'Sihirli büyücü'
  },
  {
    id: 'game-3',
    name: 'Brave Knight',
    image: '/characters/game/PNG/2048/63.png',
    category: 'game',
    description: 'Cesur şövalye'
  },
  {
    id: 'game-4',
    name: 'Mystic Archer',
    image: '/characters/game/PNG/2048/62.png',
    category: 'game',
    description: 'Gizemli okçu'
  },
  {
    id: 'game-5',
    name: 'Dragon Rider',
    image: '/characters/game/PNG/2048/76.png',
    category: 'game',
    description: 'Ejderha sürücüsü'
  },
  {
    id: 'game-6',
    name: 'Forest Guardian',
    image: '/characters/game/PNG/2048/89.png',
    category: 'game',
    description: 'Orman koruyucusu'
  },
  // TOMODACHI 3D Avatars
  {
    id: 'tomodachi-1',
    name: 'Happy Boy',
    image: '/characters/tomodachi/PNG/Ordinary Character/1 - Ordinary Male - Happy - White.png',
    category: 'tomodachi',
    description: 'Mutlu erkek karakter'
  },
  {
    id: 'tomodachi-2',
    name: 'Neutral Girl',
    image: '/characters/tomodachi/PNG/Ordinary Character/2 - Ordinary Female - Neutral - White.png',
    category: 'tomodachi',
    description: 'Sakin kız karakter'
  },
  {
    id: 'tomodachi-3',
    name: 'Happy Girl',
    image: '/characters/tomodachi/PNG/Ordinary Character/1 - Ordinary Female - Neutral - White.png',
    category: 'tomodachi',
    description: 'Mutlu kız karakter'
  },
  {
    id: 'tomodachi-4',
    name: 'Dark Boy',
    image: '/characters/tomodachi/PNG/Ordinary Character/3 - Ordinary Male - Happy - Black.png',
    category: 'tomodachi',
    description: 'Koyu tenli erkek'
  },
  // Custom Avatar Builder
  {
    id: 'custom-avatar',
    name: 'Kendi Karakterim',
    image: '/characters/custom/Examples.png',
    category: 'custom',
    description: 'Özelleştirilebilir avatar'
  }
];

const categories = [
  { id: 'all', name: 'Tümü', icon: '🌟' },
  { id: 'game', name: 'Oyun Karakterleri', icon: '⚔️' },
  { id: 'tomodachi', name: '3D Karakterler', icon: '🎨' },
  { id: 'custom', name: 'Özel Karakter', icon: '🛠️' }
];

export default function CharactersPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const filteredCharacters = selectedCategory === 'all' 
    ? characters 
    : characters.filter(char => char.category === selectedCategory);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    localStorage.setItem('selectedCharacter', JSON.stringify(character));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Karakter Seçimi</h1>
            </div>
            <div className="text-sm text-gray-500">
              Hikaye yolculuğuna başlamak için karakterini seç!
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kategori Seç</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((character) => (
            <motion.div
              key={character.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {character.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {character.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCharacterSelect(character)}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Bu Karakteri Seç
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Character Info */}
        {selectedCharacter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-purple-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎭</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedCharacter.name} seçildi!
                </h3>
                <p className="text-gray-600">
                  Artık bu karakterle hikaye yazabilirsin.
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">

              <Link
                href="/stories/create"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Hikaye Yazmaya Başla
              </Link>
              <Link
                href="/"
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
