import { GetSchoolList } from '@/app/_apis/onboarding';
import { useQuery } from '@tanstack/react-query';

export function useSchoolList() {
  return useQuery({
    queryKey: ['SchoolLst'],
    queryFn: GetSchoolList,
  });
}
