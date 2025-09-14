import api from './api';
import {
  RecruitmentCommonResponse,
  RecruitmentEval,
  RecruitmentEvalList,
  RecruitmentEvalPost,
  RecruitmentItem,
} from './schemas/recruitmentResponse';

export async function GetRecruitmentDetail(postingId: number) {
  const { data } = await api.get<RecruitmentCommonResponse<RecruitmentItem>>(
    `posting/${postingId}`
  );

  return data;
}

export async function PostRecruitmentEval({
  postingId,
  evalScore,
  evalText,
  recruitmentStep,
}: RecruitmentEvalPost): Promise<RecruitmentCommonResponse<RecruitmentEval>> {
  const { data } = await api.post('posting/eval', {
    postingId,
    evalScore,
    evalText,
    recruitmentStep,
  });

  return data;
}

export async function GetRecruitmentEvalList(postingId: number) {
  const { data } = await api.get<
    RecruitmentCommonResponse<RecruitmentEvalList>
  >(`posting/eval/${postingId}`);

  return data;
}
