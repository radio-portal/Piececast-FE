  import { useState, useEffect } from 'react';
  import { get } from '@/api/base';
  import type { Card } from '@/types/cards';

  export const usePieces = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [mainCards, setMainCards] = useState<Card[][]>(Array.from({ length: 3 }, () => []));

    useEffect(() => {
      const fetchCards = async () => {
        try {
          const response = await get('/programs/latest');
          setCards(response.data);
          
          const newMainCards: Card[][] = Array.from({ length: 3 }, () => []);
          response.data.forEach((card: Card, idx: number) => {
            newMainCards[idx % 3].push(card);
          });
          setMainCards(newMainCards);
        } catch (e) {
          console.error('API Error:', e);
        }
      }
      fetchCards();
    }, []);

    return {
      cards,
      mainCards,
    }
  }