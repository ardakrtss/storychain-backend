'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, BookOpen, User, Calendar, Tag, Sparkles } from 'lucide-react';
import { useCharacter } from '../../../../hooks/useCharacter';

interface StorySegment {
  id: string;
  content: string;
  authorNickname: string;
  createdAt: string;
  likeCount: number;
}

interface Story {
  id: string;
  title: string;
  theme: string;
  content: string;
  authorNickname: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  isCompleted: boolean;
  segments: StorySegment[];
}

const mockStory: Story = {
  id: '1',
  title: 'Sihirli Ormanın Gizemi',
  theme: 'Fantastik',
  content: 'Bir zamanlar, kimsenin gitmeye cesaret edemediği bir orman vardı. Bu ormanın içinde yaşayan insanlar, ormanın derinliklerinde gizli bir güç olduğuna inanıyorlardı.',
  authorNickname: 'Hikayeci_Ali',
  createdAt: '2024-01-15',
  likeCount: 24,
  commentCount: 8,
  viewCount: 156,
  isCompleted: false,
  segments: [
    {
      id: '1',
      content: 'Küçük Ayşe, her gün penceresinden bu gizemli ormanı izlerdi. Annesi ona ormana gitmemesini söylerdi, ama Ayşe\'nin içinde bir merak vardı. Bir gün, cesaretini toplayıp ormanın kenarına kadar gitti.',
      authorNickname: 'Hikayeci_Ali',
      createdAt: '2024-01-15',
      likeCount: 12
    },
    {
      id: '2',
      content: 'Ormanın girişinde, yaşlı bir ağaç gördü. Ağaç sanki ona bakıyordu. Ayşe yaklaştığında, ağacın gövdesinde parlayan bir kapı fark etti. Kapı küçüktü, sadece bir çocuk geçebilirdi.',
      authorNickname: 'Orman_Yolcusu',
      createdAt: '2024-01-16',
      likeCount: 8
    },
    {
      id: '3',
      content: 'Ayşe kapıyı açtı ve içeri girdi. Karşısında muhteşem bir dünya vardı. Parlayan mantarlar, konuşan hayvanlar ve uçan çiçekler. Bu, hayal ettiğinden çok daha güzeldi.',
      authorNickname: 'Sihirli_Kalem',
      createdAt: '2024-01-17',
      likeCount: 15
    }
  ]
};

const writingPrompts = [
  'Hikayenin devamında ne olabilir?',
  'Karakterin karşılaştığı yeni bir durum nedir?',
  'Hikayenin atmosferini nasıl değiştirebilirsin?',
  'Yeni bir karakter ekleyebilir misin?',
  'Hikayenin sonunu nasıl şekillendirebilirsin?'
];

export default function StoryContinuePage() {
  const params = useParams();
  const router = useRouter();
  const { selectedCharacter } = useCharacter();
  const [story, setStory] = useState<Story>(mockStory);
  const [newSegment, setNewSegment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSegment.trim()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newSegmentData: StorySegment = {
        id: (story.segments.length + 1).toString(),
        content: newSegment,
        authorNickname: selectedCharacter?.name || 'Anonim Yazar',
        createdAt: new Date().toISOString(),
        likeCount: 0
      };

      setStory(prev => ({
        ...prev,
        segments: [...prev.segments, newSegmentData]
      }));

      setNewSegment('');
      setSelectedPrompt('');
      
      // Show success message
      alert('Hikayenin devamı başarıyla eklendi!');
      
    } catch (error) {
      console.error('Error adding segment:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setNewSegment(prompt + ' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href={`/stories/${story.id}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Hikayeye Dön</span>
              </Link>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Hikayeye Devam Et</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Story Context */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Hikaye Özeti</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{story.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{story.theme}</p>
                </div>

                <div className="text-sm text-gray-600">
                  <p className="mb-3">{story.content}</p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Mevcut Bölümler:</h4>
                  <div className="space-y-2">
                    {story.segments.map((segment, index) => (
                      <div key={segment.id} className="text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          <span className="text-gray-900">@{segment.authorNickname}</span>
                        </div>
                        <p className="text-gray-600 ml-8 mt-1 line-clamp-2">
                          {segment.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedCharacter && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Senin Karakterin:</h4>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">🎭</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedCharacter.name}</p>
                        <p className="text-sm text-gray-600">{selectedCharacter.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Writing Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Hikayeye Devam Et
                </h2>
                <p className="text-gray-600">
                  Hikayenin devamını yazarak diğer okuyucularla birlikte bu macerayı sürdür.
                </p>
              </div>

              {/* Writing Prompts */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Yazma İpuçları</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {writingPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePromptSelect(prompt)}
                      className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                        selectedPrompt === prompt
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{prompt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Writing Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="story-content" className="block text-sm font-medium text-gray-700 mb-2">
                    Hikayenin Devamı
                  </label>
                  <textarea
                    id="story-content"
                    value={newSegment}
                    onChange={(e) => setNewSegment(e.target.value)}
                    placeholder="Hikayenin devamını buraya yazın..."
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    required
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      {newSegment.length} karakter
                    </span>
                    <span className="text-sm text-gray-500">
                      Minimum 50 karakter gerekli
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setNewSegment('')}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Temizle
                    </button>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || newSegment.length < 50}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Gönderiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Hikayeye Ekle</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Writing Tips */}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                <h4 className="font-semibold text-blue-900 mb-2">Yazma İpuçları:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Hikayenin mevcut atmosferini korumaya çalışın</li>
                  <li>• Karakterlerin kişiliklerini tutarlı tutun</li>
                  <li>• Yaratıcı ve ilgi çekici olun</li>
                  <li>• Diğer yazarların katkılarını dikkate alın</li>
                  <li>• Hikayeyi ilginç bir şekilde sürdürün</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
