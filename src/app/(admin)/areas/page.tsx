import React from 'react'
import Area from '@/components/area'
import { routes } from '@/lib/utils/routes';
import { apiRequest } from '@/lib/utils/api-request';

const Page = async () => {
  const data = await apiRequest({
    endpoint: routes.api.getAreas,
    isProtected: true,
    method: "GET",
  });

  return <Area data={data} />
}

export default Page