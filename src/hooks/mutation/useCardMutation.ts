import { Card, CardReplace, CardScrap, CardShow } from '@/app/_apis/card';
import { CardShowOpenResponse } from '@/app/_apis/schemas/cardResponse';
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
    onSuccess: (_, variables) => {
      const { jobPostingId } = variables;

      queryClient.invalidateQueries({ queryKey: ['OpenedCard'] });
      queryClient.invalidateQueries({ queryKey: ['CardScrap'] });
      queryClient.invalidateQueries({ queryKey: ['AlumniScrap'] });
      queryClient.invalidateQueries({ queryKey: ['DetailInfo'] });
      queryClient.invalidateQueries({ queryKey: ['Hotposting'] });

      queryClient.setQueryData<CardShowOpenResponse[]>(
        ['OpenedCard'],
        (old) => {
          if (!old) return old;

          return old.map((card) =>
            card.cardJobPosting.jobPostingId === jobPostingId
              ? {
                  ...card,
                  cardJobPosting: {
                    ...card.cardJobPosting,
                    isScrap: !card.cardJobPosting.isScrap,
                  },
                }
              : card
          );
        }
      );
    },
    onError: (error) => {
      console.error('스크랩 실패:', error);
    },
  });
}
