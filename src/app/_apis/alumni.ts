import api from './api';
import {
  companiesTop3Response,
  jobPostingTop3Response,
} from './schemas/alumniResponse';

export async function GetHotPosting(): Promise<jobPostingTop3Response[]> {
  const res = await api.get<{ data: jobPostingTop3Response[] }>(
    '/alumni/similar/job-postings/top3'
  );

  console.log(res.data);
  return res.data.data;
}

export async function GetCompany(): Promise<companiesTop3Response[]> {
  const res = await api.get<{ data: companiesTop3Response[] }>(
    '/alumni/similar/companies/top3'
  );

  console.log('인기있는기업', res.data);
  return res.data.data;
}
