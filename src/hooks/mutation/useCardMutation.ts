import { Card, CardShow } from '@/app/_apis/card';
import { useMutation } from '@tanstack/react-query';

export function useCardShowMutation() {
  return useMutation({
    mutationFn: (body: { position: string }) => CardShow(body),
    onSuccess: (data) => {
      console.log('성공', data);
    },
    onError: (error) => {
      console.error('카드 오픈 실패:', error);
    },
  });
}

export function useCardMutation() {
  return useMutation({
    mutationFn: () => Card(),
    onSuccess: (data) => {
      console.log('성공', data);
    },
    onError: (error) => {
      console.error('카드 불러오기 실패:', error);
    },
  });
}
