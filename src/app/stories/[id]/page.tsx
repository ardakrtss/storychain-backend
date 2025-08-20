'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, Eye, Share2, BookOpen, User, Calendar, Tag } from 'lucide-react';

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

export default function StoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [story, setStory] = useState<Story>(mockStory);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setStory(prev => ({
      ...prev,
      likeCount: isLiked ? prev.likeCount - 1 : prev.likeCount + 1
    }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link kopyalandı!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Geri Dön</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Paylaş</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Story Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {story.title}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-purple-500`}>
                  {story.theme}
                </span>
                {story.isCompleted && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Tamamlandı
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Story Stats */}
          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>@{story.authorNickname}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(story.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>{story.segments.length} bölüm</span>
            </div>
          </div>

          {/* Story Introduction */}
          <div className="prose max-w-none mb-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {story.content}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isLiked
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{story.likeCount}</span>
              </button>
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-blue-100 hover:text-blue-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{story.commentCount}</span>
              </button>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
                <Eye className="w-4 h-4" />
                <span>{story.viewCount}</span>
              </div>
            </div>

            {!story.isCompleted && (
              <Link
                href={`/stories/${story.id}/continue`}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Hikayeye Devam Et
              </Link>
            )}
          </div>
        </motion.div>

        {/* Story Segments */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Hikaye Bölümleri</h2>
          
          {story.segments.map((segment, index) => (
            <motion.div
              key={segment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-purple-600">
                    {index + 1}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">@{segment.authorNickname}</span>
                    <span className="text-sm text-gray-500 ml-2">{formatDate(segment.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Heart className="w-4 h-4" />
                  <span>{segment.likeCount}</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {segment.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comments Section */}
        {showComments && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Yorumlar</h3>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Henüz yorum yapılmamış. İlk yorumu sen yap!</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
