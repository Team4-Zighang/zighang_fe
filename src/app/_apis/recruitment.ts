import api from './api';
import {
  RecruitmentCommonResponse,
  RecruitmentItem,
} from './schemas/recruitmentResponse';

export async function GetRecruitmentDetail(postingId: number) {
  const { data } = await api.get<RecruitmentCommonResponse<RecruitmentItem>>(
    `posting/${postingId}`
  );

  return data;
}
