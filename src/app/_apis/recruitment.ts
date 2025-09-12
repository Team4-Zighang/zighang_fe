import api from './api';
import {
  RecruitmentCommonResponse,
  RecruitmentEvalList,
  RecruitmentItem,
} from './schemas/recruitmentResponse';

export async function GetRecruitmentDetail(postingId: number) {
  const { data } = await api.get<RecruitmentCommonResponse<RecruitmentItem>>(
    `posting/${postingId}`
  );

  return data;
}

export async function GetRecruitmentEvalList(postingId: number) {
  const { data } = await api.get<
    RecruitmentCommonResponse<RecruitmentEvalList>
  >(`posting/eval/${postingId}`);

  return data;
}
