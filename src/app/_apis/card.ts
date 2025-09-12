import api from './api';
import {
  CardResponse,
  CardShowOpenResponse,
  CardShowResponse,
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
