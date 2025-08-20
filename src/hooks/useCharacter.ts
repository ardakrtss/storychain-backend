import { useState, useEffect } from 'react';

export interface Character {
  id: string;
  name: string;
  image: string;
  category: 'game' | 'tomodachi' | 'custom';
  isFavorite?: boolean;
  rating?: number;
  profession?: string;
  description?: string;
}

export function useCharacter() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('storychain-selected-character');
    if (saved) {
      try {
        setSelectedCharacter(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading selected character:', error);
      }
    }
  }, []);

  const selectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    localStorage.setItem('storychain-selected-character', JSON.stringify(character));
  };

  const clearCharacter = () => {
    setSelectedCharacter(null);
    localStorage.removeItem('storychain-selected-character');
  };

  return {
    selectedCharacter,
    selectCharacter,
    clearCharacter,
  };
}