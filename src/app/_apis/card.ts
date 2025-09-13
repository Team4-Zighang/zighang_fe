import api from './api';
import {
  CardReplaceResponse,
  CardResponse,
  CardScrapResponse,
  CardShowOpenResponse,
  CardShowResponse,
  ScrapResponse,
} from './schemas/cardResponse';

interface CardShowBody {
  position: string;
}

export async function CardShow(body: CardShowBody): Promise<CardShowResponse> {
  const res = await api.post<CardShowResponse>(`/card/show`, body);

  return res.data;
}

export async function Card(): Promise<CardResponse> {
  const res = await api.post<CardResponse>('/card');

  return res.data;
}

export async function GetShowOpen(): Promise<CardShowOpenResponse[]> {
  const res = await api.get<{ data: CardShowOpenResponse[] }>(
    '/card/show/open'
  );

  return res.data.data;
}

export async function CardReplace(
  body: CardShowBody
): Promise<CardReplaceResponse> {
  const res = await api.post<CardReplaceResponse>(`/card/replace`, body);

  return res.data;
}

export async function GetScrap(): Promise<CardScrapResponse> {
  const res = await api.get<{ data: CardScrapResponse }>('/card/remain-scrap');

  return res.data.data;
}

interface ScrapBody {
  scrapId: null;
  jobPostingId: number;
}
export async function CardScrap(body: ScrapBody): Promise<ScrapResponse> {
  const res = await api.post<ScrapResponse>(`/scrap`, body);

  return res.data;
}
