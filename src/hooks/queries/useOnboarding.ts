import { GetMajorList, GetSchoolList } from '@/app/_apis/onboarding';
import { useQuery } from '@tanstack/react-query';

export function useSchoolList() {
  return useQuery({
    queryKey: ['SchoolLst'],
    queryFn: GetSchoolList,
  });
}

export function useMajorList(school: string) {
  return useQuery({
    queryKey: ['MajorList', school],
    queryFn: () => GetMajorList(school),
    enabled: !!school,
  });
}
