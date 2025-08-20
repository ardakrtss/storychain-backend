import { useState, useEffect } from 'react';

export interface Character {
  id: string;
  name: string;
  image: string;
  category: 'game' | 'tomodachi' | 'custom';
  description: string;
}

export function useCharacter() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load character from localStorage on mount
    const savedCharacter = localStorage.getItem('selectedCharacter');
    if (savedCharacter) {
      try {
        setSelectedCharacter(JSON.parse(savedCharacter));
      } catch (error) {
        console.error('Error parsing saved character:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const selectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    localStorage.setItem('selectedCharacter', JSON.stringify(character));
  };

  const clearCharacter = () => {
    setSelectedCharacter(null);
    localStorage.removeItem('selectedCharacter');
  };

  return {
    selectedCharacter,
    selectCharacter,
    clearCharacter,
    isLoading
  };
}
