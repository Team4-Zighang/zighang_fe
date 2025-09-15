import api from './api';
import { MemberResponse } from './schemas/userResponse';

export async function GetUser(): Promise<MemberResponse> {
  const res = await api.get<MemberResponse>('/member/me');
  const data = res.data;

  if (typeof window !== 'undefined') {
    localStorage.setItem('memberInfo', JSON.stringify(data));
  }

  return data;
}
