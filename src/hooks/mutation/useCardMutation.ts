import { Card, CardReplace, CardScrap, CardShow } from '@/app/_apis/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCardShowMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { position: string }) => CardShow(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['OpenedCard'] });
    },
    onError: (error) => {
      console.error('카드 오픈 실패:', error);
    },
  });
}

export function useCardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => Card(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['OpenedCard'] });
      queryClient.invalidateQueries({ queryKey: ['CardScrap'] });
    },
    onError: (error) => {
      console.error('카드 불러오기 실패:', error);
    },
  });
}

export function useCardReplaceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { position: string }) => CardReplace(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['OpenedCard'] });
    },
    onError: (error) => {
      console.error('카드 교체 실패:', error);
    },
  });
}

export function useCardScrapMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { scrapId: null; jobPostingId: number }) =>
      CardScrap(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['OpenedCard'] });
      queryClient.invalidateQueries({ queryKey: ['CardScrap'] });
      queryClient.invalidateQueries({ queryKey: ['AlumniScrap'] });
    },
    onError: (error) => {
      console.error('카드 스크랩 실패:', error);
    },
  });
}
