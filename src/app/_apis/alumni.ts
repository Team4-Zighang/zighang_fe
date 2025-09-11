import api from './api';
import {
  AlumniInfoResponse,
  AlumniScrapResponse,
  companiesTop3Response,
  jobPostingTop3Response,
} from './schemas/alumniResponse';

export async function GetHotPosting(): Promise<jobPostingTop3Response[]> {
  const res = await api.get<{ data: jobPostingTop3Response[] }>(
    '/alumni/similar/job-postings/top3'
  );

  return res.data.data;
}

export async function GetCompany(): Promise<companiesTop3Response[]> {
  const res = await api.get<{ data: companiesTop3Response[] }>(
    '/alumni/similar/companies/top3'
  );

  return res.data.data;
}

export async function GetAlumniScrap(
  page: number,
  isMobile: boolean
): Promise<AlumniScrapResponse> {
  const res = await api.get<{ data: AlumniScrapResponse }>(
    `/alumni/similar/scraps`,
    {
      params: {
        page: page - 1,
        isMobile,
      },
    }
  );

  return res.data.data;
}

export async function GetInfo(): Promise<AlumniInfoResponse[]> {
  const res = await api.get<{ data: AlumniInfoResponse[] }>(
    '/alumni/similar/info'
  );

  return res.data.data;
}
