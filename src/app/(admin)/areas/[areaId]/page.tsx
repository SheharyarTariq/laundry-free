import React from 'react'
import AreaDetailPage from '@/components/area/area-detail-page';
import { apiRequest } from '@/lib/utils/api-request';
import { routes } from '@/lib/utils/routes';

type Params = Promise<{ areaId: string }>
type SearchParams = Promise<{ [key: string]: string | undefined }>

export default async function Page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params =await props.params;
  const areaId = params.areaId;
  const searchParams =await props.searchParams;
  const page = searchParams.page || '1';

  const data = await apiRequest({
    endpoint: routes.api.getPostcodes(areaId, page),
    isProtected: true,
    method: "GET",
  });

  console.log("data", data);
  
  return (
    <AreaDetailPage data={data} areaId={areaId} currentPage={page}/>
  )
}
