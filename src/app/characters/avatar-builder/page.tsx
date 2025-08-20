'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, RotateCcw, Check } from 'lucide-react';
import { useCharacter } from '@/hooks/useCharacter';

interface AvatarPart {
  id: string;
  name: string;
  options: {
    id: string;
    name: string;
    image: string;
  }[];
}

const avatarParts: AvatarPart[] = [
  {
    id: 'hair',
    name: 'Saç Stili',
    options: [
      { id: 'hair-1', name: 'Kısa Saç', image: '/characters/custom/hair-1.png' },
      { id: 'hair-2', name: 'Uzun Saç', image: '/characters/custom/hair-2.png' },
      { id: 'hair-3', name: 'Kıvırcık Saç', image: '/characters/custom/hair-3.png' },
      { id: 'hair-4', name: 'Düz Saç', image: '/characters/custom/hair-4.png' },
    ]
  },
  {
    id: 'eyes',
    name: 'Göz Rengi',
    options: [
      { id: 'eyes-1', name: 'Kahverengi', image: '/characters/custom/eyes-1.png' },
      { id: 'eyes-2', name: 'Mavi', image: '/characters/custom/eyes-2.png' },
      { id: 'eyes-3', name: 'Yeşil', image: '/characters/custom/eyes-3.png' },
      { id: 'eyes-4', name: 'Gri', image: '/characters/custom/eyes-4.png' },
    ]
  },
  {
    id: 'clothes',
    name: 'Kıyafet',
    options: [
      { id: 'clothes-1', name: 'Casual', image: '/characters/custom/clothes-1.png' },
      { id: 'clothes-2', name: 'Formal', image: '/characters/custom/clothes-2.png' },
      { id: 'clothes-3', name: 'Spor', image: '/characters/custom/clothes-3.png' },
      { id: 'clothes-4', name: 'Fantastik', image: '/characters/custom/clothes-4.png' },
    ]
  },
  {
    id: 'accessories',
    name: 'Aksesuar',
    options: [
      { id: 'accessories-1', name: 'Gözlük', image: '/characters/custom/accessories-1.png' },
      { id: 'accessories-2', name: 'Şapka', image: '/characters/custom/accessories-2.png' },
      { id: 'accessories-3', name: 'Kolye', image: '/characters/custom/accessories-3.png' },
      { id: 'accessories-4', name: 'Yok', image: '/characters/custom/accessories-4.png' },
    ]
  }
];

export default function AvatarBuilderPage() {
  const { selectCharacter } = useCharacter();
  const [selectedParts, setSelectedParts] = useState<Record<string, string>>({
    hair: 'hair-1',
    eyes: 'eyes-1',
    clothes: 'clothes-1',
    accessories: 'accessories-4'
  });

  const handlePartSelect = (partId: string, optionId: string) => {
    setSelectedParts(prev => ({
      ...prev,
      [partId]: optionId
    }));
  };

  const handleSaveAvatar = () => {
    const customCharacter = {
      id: 'custom-avatar',
      name: 'Kendi Karakterim',
      image: '/characters/custom/Examples.png', // Placeholder
      category: 'custom',
      description: 'Özelleştirilmiş avatar',
      customParts: selectedParts
    };
    
    selectCharacter(customCharacter);
  };

  const handleReset = () => {
    setSelectedParts({
      hair: 'hair-1',
      eyes: 'eyes-1',
      clothes: 'clothes-1',
      accessories: 'accessories-4'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/characters"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Geri Dön</span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Avatar Builder</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Sıfırla</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Preview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Önizleme</h2>
              
              {/* Avatar Display */}
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎭</div>
                  <p className="text-gray-600 text-sm">Avatar önizlemesi</p>
                  <p className="text-gray-500 text-xs">(Gerçek görsel entegrasyonu için)</p>
                </div>
              </div>

              {/* Selected Parts Summary */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Seçilen Özellikler:</h3>
                {avatarParts.map(part => {
                  const selectedOption = part.options.find(opt => opt.id === selectedParts[part.id]);
                  return (
                    <div key={part.id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{part.name}:</span>
                      <span className="font-medium text-gray-900">{selectedOption?.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleSaveAvatar}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Check className="w-5 h-5" />
                  <span>Karakteri Kaydet</span>
                </button>
                
                <button className="w-full border-2 border-purple-600 text-purple-600 py-3 px-4 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>İndir</span>
                </button>
              </div>
            </div>
          </div>

          {/* Customization Options */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {avatarParts.map((part, index) => (
                <motion.div
                  key={part.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{part.name}</h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {part.options.map(option => (
                      <button
                        key={option.id}
                        onClick={() => handlePartSelect(part.id, option.id)}
                        className={`aspect-square rounded-lg border-2 transition-all duration-200 ${
                          selectedParts[part.id] === option.id
                            ? 'border-purple-600 bg-purple-50 shadow-md'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                        }`}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-3xl">🎨</div>
                        </div>
                        <div className="p-2">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {option.name}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
